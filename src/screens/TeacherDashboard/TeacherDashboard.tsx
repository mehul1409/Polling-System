import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { useSocket } from '../../contexts/SocketContext';
import { CreatePollModal } from '../../components/CreatePollModal';
import { PollResults } from '../../components/PollResults';
import { ChatPanel } from '../../components/ChatPanel';
import { StudentsList } from '../../components/StudentsList';
import { PollHistory } from '../../components/PollHistory';
import toast from 'react-hot-toast';
import { Users, MessageSquare, BarChart3, History, Plus, LogOut } from 'lucide-react';
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

export const TeacherDashboard: React.FC = () => {
  const [currentPoll, setCurrentPoll] = useState<Poll | null>(null);
  const [studentsCount, setStudentsCount] = useState(0);
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [activeTab, setActiveTab] = useState<'poll' | 'students' | 'chat' | 'history'>('poll');
  const { socket, isConnected } = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket) return;

    // Join as teacher
    socket.emit('teacher-join');

    // Listen for socket events
    socket.on('students-count', (count: number) => {
      setStudentsCount(count);
    });

    socket.on('student-joined', (student: { name: string; id: string }) => {
      toast.success(`${student.name} joined the session`);
    });

    socket.on('student-left', (student: { name: string }) => {
      toast(`${student.name} left the session`, { icon: '👋' });
    });

    socket.on('poll-results-updated', (poll: Poll) => {
      setCurrentPoll(poll);
    });

    socket.on('poll-ended', (poll: Poll) => {
      setCurrentPoll(null);
      toast.success('Poll ended successfully');
    });

    // Fetch current poll
    fetchCurrentPoll();

    return () => {
      socket.off('students-count');
      socket.off('student-joined');
      socket.off('student-left');
      socket.off('poll-results-updated');
      socket.off('poll-ended');
    };
  }, [socket]);

  const fetchCurrentPoll = async () => {
    try {
      const response = await fetch('https://polling-system-ofzk.onrender.com/api/polls/current');
      if (response.ok) {
        const poll = await response.json();
        setCurrentPoll(poll);
      }
    } catch (error) {
      console.error('Error fetching current poll:', error);
    }
  };

  const handleCreatePoll = (pollData: { question: string; options: string[]; maxTime: number }) => {
    if (!socket) return;

    socket.emit('create-poll', pollData);
    setShowCreatePoll(false);
    toast.success('Poll created successfully!');
  };

  const handleEndPoll = () => {
    if (!socket || !currentPoll) return;

    socket.emit('end-poll');
    toast.success('Poll ended manually');
  };

  const canCreateNewPoll = () => {
    return !currentPoll || currentPoll.status === 'ended';
  };

  const tabs = [
    { id: 'poll', label: 'Live Poll', icon: BarChart3 },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'history', label: 'History', icon: History },
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
              <h1 className="text-xl font-semibold text-gray-900">Teacher Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className={isConnected ? 'text-green-600' : 'text-red-600'}>
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              
              <Badge variant="secondary" className="px-3 py-1">
                <Users className="w-4 h-4 mr-1" />
                {studentsCount} Students
              </Badge>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-800"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Exit
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Navigation</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-none transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-3" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => setShowCreatePoll(true)}
                  disabled={!canCreateNewPoll() || !isConnected}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Poll
                </Button>
                
                {currentPoll && currentPoll.status === 'active' && (
                  <Button
                    onClick={handleEndPoll}
                    variant="destructive"
                    className="w-full"
                  >
                    End Current Poll
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'poll' && (
              <div className="space-y-6">
                {currentPoll ? (
                  <PollResults poll={currentPoll} />
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <BarChart3 className="w-16 h-16 text-gray-400 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Poll</h3>
                      <p className="text-gray-600 text-center mb-6">
                        Create a new poll to start engaging with your students
                      </p>
                      <Button
                        onClick={() => setShowCreatePoll(true)}
                        disabled={!isConnected}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Your First Poll
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {activeTab === 'students' && <StudentsList />}
            {activeTab === 'chat' && <ChatPanel />}
            {activeTab === 'history' && <PollHistory />}
          </div>
        </div>
      </div>

      {/* Create Poll Modal */}
      <CreatePollModal
        isOpen={showCreatePoll}
        onClose={() => setShowCreatePoll(false)}
        onSubmit={handleCreatePoll}
      />
    </div>
  );
};