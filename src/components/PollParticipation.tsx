import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Clock, CheckCircle, BarChart3 } from 'lucide-react';

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

interface PollParticipationProps {
  poll: Poll;
  hasAnswered: boolean;
  onSubmitAnswer: (optionIndex: number) => void;
}

export const PollParticipation: React.FC<PollParticipationProps> = ({
  poll,
  hasAnswered,
  onSubmitAnswer,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (poll.status === 'active' && !hasAnswered) {
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
  }, [poll, hasAnswered]);

  const handleSubmit = () => {
    if (selectedOption !== null && !hasAnswered) {
      onSubmitAnswer(selectedOption);
    }
  };

  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);
  const canAnswer = poll.status === 'active' && !hasAnswered && timeLeft > 0;
  const showResults = hasAnswered || poll.status === 'ended' || timeLeft === 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Poll Question */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">{poll.question}</CardTitle>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                {poll.status === 'active' && !hasAnswered && (
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatTime(timeLeft)} remaining
                  </div>
                )}
                {hasAnswered && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Answer submitted
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

      {/* Answer Options or Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            {showResults ? (
              <>
                <BarChart3 className="w-5 h-5 mr-2" />
                Results
              </>
            ) : (
              'Choose your answer'
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {showResults ? (
            // Show results
            <>
              {poll.options.map((option, index) => {
                const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                const isWinning = option.votes > 0 && option.votes === Math.max(...poll.options.map(o => o.votes));
                const isMyAnswer = hasAnswered && selectedOption === index;

                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isMyAnswer
                        ? 'border-blue-500 bg-blue-50'
                        : isWinning && totalVotes > 0
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                          isMyAnswer
                            ? 'bg-blue-500 text-white'
                            : isWinning && totalVotes > 0
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-400 text-white'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="font-medium text-gray-900">{option.text}</span>
                        {isMyAnswer && (
                          <Badge variant="outline" className="text-blue-600 border-blue-600">
                            Your answer
                          </Badge>
                        )}
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
                        isMyAnswer
                          ? 'bg-blue-200'
                          : isWinning && totalVotes > 0
                          ? 'bg-green-200'
                          : 'bg-gray-200'
                      }`}
                    />
                  </div>
                );
              })}

              {totalVotes === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No responses yet.</p>
                </div>
              )}
            </>
          ) : (
            // Show answer options
            <>
              {poll.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedOption(index)}
                  disabled={!canAnswer}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedOption === index
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                  } ${!canAnswer ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                      selectedOption === index
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="font-medium text-gray-900">{option.text}</span>
                  </div>
                </button>
              ))}

              {canAnswer && (
                <div className="pt-4 border-t">
                  <Button
                    onClick={handleSubmit}
                    disabled={selectedOption === null}
                    className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Submit Answer
                  </Button>
                </div>
              )}

              {!canAnswer && timeLeft === 0 && (
                <div className="text-center py-4 text-red-600 font-medium">
                  Time's up! Poll has ended.
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};