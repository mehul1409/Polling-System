import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Clock, Users, BarChart3 } from 'lucide-react';

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
}

interface PollResultsProps {
  poll: Poll;
}

export const PollResults: React.FC<PollResultsProps> = ({ poll }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (poll.status === 'active') {
      const startTime = new Date(poll.createdAt).getTime();
      const endTime = startTime + poll.maxTime * 1000;

      const timer = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
        setTimeLeft(remaining);

        if (remaining === 0) {
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [poll]);

  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);
  const totalAnswers = poll.answers.length;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Poll Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">{poll.question}</CardTitle>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {totalAnswers} responses
                </div>
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  {totalVotes} total votes
                </div>
                {poll.status === 'active' && (
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatTime(timeLeft)} remaining
                  </div>
                )}
              </div>
            </div>
            <Badge
              variant={poll.status === 'active' ? 'default' : 'secondary'}
              className={poll.status === 'active' ? 'bg-green-500' : ''}
            >
              {poll.status === 'active' ? 'Live' : 'Ended'}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Live Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {poll.options.map((option, index) => {
            const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
            const isWinning = option.votes > 0 && option.votes === Math.max(...poll.options.map(o => o.votes));

            return (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isWinning && totalVotes > 0
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                      isWinning && totalVotes > 0
                        ? 'bg-green-500 text-white'
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="font-medium text-gray-900">{option.text}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-600">
                      {option.votes} votes
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <Progress
                  value={percentage}
                  className={`h-3 ${
                    isWinning && totalVotes > 0 ? 'bg-green-200' : 'bg-gray-200'
                  }`}
                />
              </div>
            );
          })}

          {totalVotes === 0 && (
            <div className="text-center py-8 text-gray-500">
              <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No responses yet. Waiting for students to answer...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Responses */}
      {poll.answers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {poll.answers
                .sort((a, b) => new Date(b.answeredAt).getTime() - new Date(a.answeredAt).getTime())
                .slice(0, 10)
                .map((answer, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
                        {String.fromCharCode(65 + answer.optionIndex)}
                      </div>
                      <span className="font-medium">{answer.studentName}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(answer.answeredAt).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};