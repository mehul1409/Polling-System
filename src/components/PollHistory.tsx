import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { History, BarChart3, Users, Clock } from 'lucide-react';

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
  createdAt: string;
  endedAt?: string;
}

export const PollHistory: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedPoll, setExpandedPoll] = useState<string | null>(null);

  useEffect(() => {
    fetchPollHistory();
  }, []);

  const fetchPollHistory = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/polls/history');
      if (response.ok) {
        const pollsData = await response.json();
        setPolls(pollsData);
      }
    } catch (error) {
      console.error('Error fetching poll history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateDuration = (startTime: string, endTime?: string) => {
    const start = new Date(startTime);
    const end = endTime ? new Date(endTime) : new Date();
    const durationMs = end.getTime() - start.getTime();
    const durationSecs = Math.floor(durationMs / 1000);
    
    const mins = Math.floor(durationSecs / 60);
    const secs = durationSecs % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading poll history...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <History className="w-5 h-5 mr-2" />
          Poll History
        </CardTitle>
      </CardHeader>

      <CardContent>
        {polls.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <History className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No completed polls yet</p>
            <p className="text-sm mt-1">Completed polls will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {polls.map((poll) => {
              const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);
              const isExpanded = expandedPoll === poll._id;

              return (
                <div key={poll._id} className="border rounded-lg overflow-hidden">
                  <div
                    className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => setExpandedPoll(isExpanded ? null : poll._id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-2">{poll.question}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {poll.answers.length} responses
                          </div>
                          <div className="flex items-center">
                            <BarChart3 className="w-4 h-4 mr-1" />
                            {totalVotes} votes
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {calculateDuration(poll.createdAt, poll.endedAt)}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge variant="secondary">Completed</Badge>
                        <span className="text-xs text-gray-500">
                          {formatDate(poll.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-4 border-t bg-white">
                      <div className="space-y-3">
                        {poll.options.map((option, index) => {
                          const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                          const isWinning = option.votes > 0 && option.votes === Math.max(...poll.options.map(o => o.votes));

                          return (
                            <div key={index} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                                    isWinning && totalVotes > 0
                                      ? 'bg-green-500 text-white'
                                      : 'bg-gray-400 text-white'
                                  }`}>
                                    {String.fromCharCode(65 + index)}
                                  </div>
                                  <span className="text-sm font-medium">{option.text}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-gray-600">
                                    {option.votes} votes
                                  </span>
                                  <span className="text-sm font-bold">
                                    {percentage.toFixed(1)}%
                                  </span>
                                </div>
                              </div>
                              <Progress
                                value={percentage}
                                className={`h-2 ${
                                  isWinning && totalVotes > 0 ? 'bg-green-200' : 'bg-gray-200'
                                }`}
                              />
                            </div>
                          );
                        })}
                      </div>

                      {poll.answers.length > 0 && (
                        <div className="mt-4 pt-4 border-t">
                          <h5 className="text-sm font-medium text-gray-900 mb-2">Participants:</h5>
                          <div className="flex flex-wrap gap-2">
                            {poll.answers.map((answer, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {answer.studentName}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};