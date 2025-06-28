import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { useSocket } from '../../contexts/SocketContext';
import { PollParticipation } from '../../components/PollParticipation';
import { ChatPanel } from '../../components/ChatPanel';
import toast from 'react-hot-toast';
import { MessageSquare, BarChart3, LogOut, User } from 'lucide-react';
import Image from '../../assests/Vector.png'

interface Poll {
  _id: string;
  question: string;
  options: Array<{ text: string; votes: number }>;
  maxTime: number;
  status: 'active' | 'ended';
  answers: Array<{
    studentId: string;
    studentName: string;
    optionIndex: number;
    answeredAt: string;
  }>;
}

export const StudentDashboard: React.FC = () => {
  const [currentPoll, setCurrentPoll] = useState<Poll | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [activeTab, setActiveTab] = useState<'poll' | 'chat'>('poll');
  const [studentName, setStudentName] = useState('');
  const { socket, isConnected } = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    // Get student name from localStorage
    const name = localStorage.getItem('studentName');
    if (!name) {
      navigate('/student/login');
      return;
    }
    setStudentName(name);

    if (!socket) return;

    // Join as student
    socket.emit('student-join', name);

    // Listen for socket events
    socket.on('poll-started', (poll: Poll) => {
      setCurrentPoll(poll);
      setHasAnswered(false);
      toast.success('New poll started!');
    });

    socket.on('poll-ended', (poll: Poll) => {
      setCurrentPoll(poll);
      toast.success('Poll ended! Here are the results.');
    });

    socket.on('answer-submitted', () => {
      setHasAnswered(true);
      toast.success('Your answer has been submitted!');
    });

    socket.on('kicked', () => {
      toast.error('You have been removed from the session');
      localStorage.removeItem('studentName');
      navigate('/');
    });

    socket.on('error', (message: string) => {
      toast.error(message);
    });

    // Fetch current poll
    fetchCurrentPoll();

    return () => {
      socket.off('poll-started');
      socket.off('poll-ended');
      socket.off('answer-submitted');
      socket.off('kicked');
      socket.off('error');
    };
  }, [socket, navigate]);

  const fetchCurrentPoll = async () => {
    try {
      const response = await fetch('https://polling-system-ofzk.onrender.com/api/polls/current');
      if (response.ok) {
        const poll = await response.json();
        if (poll) {
          setCurrentPoll(poll);
          // Check if student has already answered
          const studentAnswer = poll.answers?.find(
            (answer: any) => answer.studentName === studentName
          );
          setHasAnswered(!!studentAnswer);
        }
      }
    } catch (error) {
      console.error('Error fetching current poll:', error);
    }
  };

  const handleSubmitAnswer = (optionIndex: number) => {
    if (!socket || !currentPoll || hasAnswered) return;

    socket.emit('submit-answer', { optionIndex });
  };

  const handleLeaveSession = () => {
    localStorage.removeItem('studentName');
    navigate('/');
  };

  const tabs = [
    { id: 'poll', label: 'Live Poll', icon: BarChart3 },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2">
                <img className="w-4 h-4 mr-2" alt="Vector" src={Image} />
                Intervue Poll
              </Badge>
              <h1 className="text-xl font-semibold text-gray-900">Student Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className={isConnected ? 'text-green-600' : 'text-red-600'}>
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              
              <Badge variant="secondary" className="px-3 py-1">
                <User className="w-4 h-4 mr-1" />
                {studentName}
              </Badge>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleLeaveSession}
                className="text-gray-600 hover:text-gray-800"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Leave
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        {activeTab === 'poll' && (
          <div className="space-y-6">
            {currentPoll ? (
              <PollParticipation
                poll={currentPoll}
                hasAnswered={hasAnswered}
                onSubmitAnswer={handleSubmitAnswer}
              />
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BarChart3 className="w-16 h-16 text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Poll</h3>
                  <p className="text-gray-600 text-center">
                    Wait for your teacher to start a new poll
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'chat' && <ChatPanel />}
      </div>
    </div>
  );
};