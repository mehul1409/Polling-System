import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Poll from './models/Poll.js';
import ChatMessage from './models/ChatMessage.js';
import Student from './models/Student.js';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/live-polling')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Store active connections
const activeStudents = new Map();
let teacherSocket = null;
let currentPoll = null;

// API Routes
app.get('/api/polls/current', async (req, res) => {
  try {
    const poll = await Poll.findOne({ status: 'active' }).sort({ createdAt: -1 });
    res.json(poll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/polls/history', async (req, res) => {
  try {
    const polls = await Poll.find({ status: 'ended' }).sort({ createdAt: -1 });
    res.json(polls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/chat/history', async (req, res) => {
  try {
    const messages = await ChatMessage.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find({ isActive: true });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Teacher connection
  socket.on('teacher-join', () => {
    teacherSocket = socket;
    socket.join('teacher');
    console.log('Teacher connected');
    
    // Send current active students count
    socket.emit('students-count', activeStudents.size);
  });

  // Student connection
  socket.on('student-join', async (studentName) => {
    try {
      // Create or update student record
      const student = await Student.findOneAndUpdate(
        { name: studentName },
        { 
          socketId: socket.id,
          name: studentName,
          isActive: true,
          joinedAt: new Date()
        },
        { upsert: true, new: true }
      );

      activeStudents.set(socket.id, { name: studentName, id: student._id });
      socket.join('students');
      
      console.log(`Student ${studentName} joined`);
      
      // Notify teacher about new student
      if (teacherSocket) {
        teacherSocket.emit('student-joined', { name: studentName, id: student._id });
        teacherSocket.emit('students-count', activeStudents.size);
      }

      // Send current poll if active
      if (currentPoll) {
        socket.emit('poll-started', currentPoll);
      }
    } catch (error) {
      console.error('Error handling student join:', error);
    }
  });

  // Create new poll (teacher only)
  socket.on('create-poll', async (pollData) => {
    try {
      // End any existing active poll
      await Poll.updateMany({ status: 'active' }, { status: 'ended', endedAt: new Date() });

      const poll = new Poll({
        question: pollData.question,
        options: pollData.options.map(opt => ({ text: opt, votes: 0 })),
        maxTime: pollData.maxTime || 60
      });

      await poll.save();
      currentPoll = poll;

      // Broadcast to all students
      io.to('students').emit('poll-started', poll);
      
      // Start timer
      setTimeout(async () => {
        if (currentPoll && currentPoll._id.toString() === poll._id.toString()) {
          await endPoll(poll._id);
        }
      }, poll.maxTime * 1000);

      console.log('Poll created:', poll.question);
    } catch (error) {
      console.error('Error creating poll:', error);
    }
  });

  // Submit poll answer (student only)
  socket.on('submit-answer', async (data) => {
    try {
      const student = activeStudents.get(socket.id);
      if (!student || !currentPoll) return;

      // Check if student already answered
      const existingAnswer = currentPoll.answers.find(
        answer => answer.studentId === student.id.toString()
      );

      if (existingAnswer) {
        socket.emit('error', 'You have already answered this poll');
        return;
      }

      // Add answer to poll
      await Poll.findByIdAndUpdate(currentPoll._id, {
        $push: {
          answers: {
            studentId: student.id,
            studentName: student.name,
            optionIndex: data.optionIndex,
            answeredAt: new Date()
          }
        },
        $inc: {
          [`options.${data.optionIndex}.votes`]: 1
        }
      });

      // Update current poll data
      const updatedPoll = await Poll.findById(currentPoll._id);
      currentPoll = updatedPoll;

      // Send updated results to teacher
      if (teacherSocket) {
        teacherSocket.emit('poll-results-updated', updatedPoll);
      }

      // Send confirmation to student
      socket.emit('answer-submitted', { success: true });

      console.log(`${student.name} answered poll`);
    } catch (error) {
      console.error('Error submitting answer:', error);
      socket.emit('error', 'Failed to submit answer');
    }
  });

  // End poll manually (teacher only)
  socket.on('end-poll', async () => {
    if (currentPoll) {
      await endPoll(currentPoll._id);
    }
  });

  // Chat message
  socket.on('send-message', async (data) => {
    try {
      const student = activeStudents.get(socket.id);
      const isTeacher = socket.id === teacherSocket?.id;
      
      const sender = isTeacher ? 'Teacher' : student?.name || 'Unknown';
      const role = isTeacher ? 'teacher' : 'student';

      const message = new ChatMessage({
        sender,
        role,
        message: data.message
      });

      await message.save();

      // Broadcast to all users
      io.emit('new-message', {
        sender,
        role,
        message: data.message,
        timestamp: message.timestamp
      });

      console.log(`${sender} sent message: ${data.message}`);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });

  // Kick student (teacher only)
  socket.on('kick-student', async (studentId) => {
    try {
      // Find student socket
      let studentSocket = null;
      for (const [socketId, student] of activeStudents.entries()) {
        if (student.id.toString() === studentId) {
          studentSocket = io.sockets.sockets.get(socketId);
          break;
        }
      }

      if (studentSocket) {
        studentSocket.emit('kicked');
        studentSocket.disconnect();
      }

      // Update database
      await Student.findByIdAndUpdate(studentId, { isActive: false });

      console.log(`Student ${studentId} was kicked`);
    } catch (error) {
      console.error('Error kicking student:', error);
    }
  });

  // Handle disconnection
  socket.on('disconnect', async () => {
    console.log('User disconnected:', socket.id);

    if (socket.id === teacherSocket?.id) {
      teacherSocket = null;
      console.log('Teacher disconnected');
    } else if (activeStudents.has(socket.id)) {
      const student = activeStudents.get(socket.id);
      activeStudents.delete(socket.id);
      
      // Update database
      await Student.findByIdAndUpdate(student.id, { isActive: false });
      
      // Notify teacher
      if (teacherSocket) {
        teacherSocket.emit('student-left', student);
        teacherSocket.emit('students-count', activeStudents.size);
      }
      
      console.log(`Student ${student.name} left`);
    }
  });
});

// Helper function to end poll
async function endPoll(pollId) {
  try {
    const poll = await Poll.findByIdAndUpdate(
      pollId,
      { status: 'ended', endedAt: new Date() },
      { new: true }
    );

    if (poll) {
      currentPoll = null;
      
      // Broadcast results to all users
      io.emit('poll-ended', poll);
      
      console.log('Poll ended:', poll.question);
    }
  } catch (error) {
    console.error('Error ending poll:', error);
  }
}

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});