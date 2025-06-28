import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useSocket } from '../contexts/SocketContext';
import { Users, UserX, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

interface Student {
  _id: string;
  name: string;
  joinedAt: string;
  isActive: boolean;
}

export const StudentsList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { socket } = useSocket();

  useEffect(() => {
    fetchStudents();

    if (!socket) return;

    // Listen for student updates
    socket.on('student-joined', (student: { name: string; id: string }) => {
      fetchStudents(); // Refresh the list
    });

    socket.on('student-left', (student: { name: string }) => {
      fetchStudents(); // Refresh the list
    });

    return () => {
      socket.off('student-joined');
      socket.off('student-left');
    };
  }, [socket]);

  const fetchStudents = async () => {
    try {
      const response = await fetch('https://polling-system-ofzk.onrender.com/api/students');
      if (response.ok) {
        const studentsData = await response.json();
        setStudents(studentsData);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to load students list');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKickStudent = (studentId: string, studentName: string) => {
    if (!socket) return;

    const confirmed = window.confirm(`Are you sure you want to remove ${studentName} from the session?`);
    if (confirmed) {
      socket.emit('kick-student', studentId);
      toast.success(`${studentName} has been removed from the session`);
      // Remove from local state immediately for better UX
      setStudents(prev => prev.filter(s => s._id !== studentId));
    }
  };

  const formatJoinTime = (timestamp: string) => {
    const joinTime = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - joinTime.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 1) return 'Just joined';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours}h ${diffMins % 60}m ago`;
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading students...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Active Students
          </div>
          <Badge variant="secondary" className="px-3 py-1">
            {students.length} online
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {students.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No students have joined yet</p>
            <p className="text-sm mt-1">Students will appear here when they join the session</p>
          </div>
        ) : (
          <div className="space-y-3">
            {students.map((student) => (
              <div
                key={student._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium text-sm">
                      {student.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{student.name}</h4>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatJoinTime(student.joinedAt)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge
                    variant="outline"
                    className="text-green-600 border-green-600 bg-green-50"
                  >
                    Online
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleKickStudent(student._id, student.name)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <UserX className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};