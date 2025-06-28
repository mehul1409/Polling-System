import mongoose from 'mongoose';

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: [{
    text: String,
    votes: { type: Number, default: 0 }
  }],
  maxTime: {
    type: Number,
    default: 60
  },
  status: {
    type: String,
    enum: ['active', 'ended'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  endedAt: Date,
  answers: [{
    studentId: String,
    studentName: String,
    optionIndex: Number,
    answeredAt: { type: Date, default: Date.now }
  }]
});

export default mongoose.model('Poll', pollSchema);