import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface CreatePollModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (pollData: { question: string; options: string[]; maxTime: number }) => void;
}

export const CreatePollModal: React.FC<CreatePollModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [maxTime, setMaxTime] = useState(60);

  const handleAddOption = () => {
    if (options.length < 6) {
      setOptions([...options, '']);
    } else {
      toast.error('Maximum 6 options allowed');
    }
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    } else {
      toast.error('Minimum 2 options required');
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim()) {
      toast.error('Please enter a question');
      return;
    }

    const validOptions = options.filter(opt => opt.trim());
    if (validOptions.length < 2) {
      toast.error('Please provide at least 2 options');
      return;
    }

    if (maxTime < 10 || maxTime > 300) {
      toast.error('Time limit must be between 10 and 300 seconds');
      return;
    }

    onSubmit({
      question: question.trim(),
      options: validOptions,
      maxTime,
    });

    // Reset form
    setQuestion('');
    setOptions(['', '']);
    setMaxTime(60);
  };

  const handleClose = () => {
    setQuestion('');
    setOptions(['', '']);
    setMaxTime(60);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create New Poll</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question */}
          <div className="space-y-2">
            <Label htmlFor="question" className="text-base font-medium">
              Poll Question *
            </Label>
            <Input
              id="question"
              type="text"
              placeholder="Enter your poll question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="h-12 text-lg"
            />
          </div>

          {/* Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Answer Options *</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddOption}
                disabled={options.length >= 6}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Option
              </Button>
            </div>

            <div className="space-y-3">
              {options.map((option, index) => (
                <Card key={index} className="border-2 border-dashed border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium">{String.fromCharCode(65 + index)}</span>
                      </div>
                      <Input
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        className="flex-1"
                      />
                      {options.length > 2 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveOption(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Time Limit */}
          <div className="space-y-2">
            <Label htmlFor="maxTime" className="text-base font-medium">
              Time Limit (seconds)
            </Label>
            <Input
              id="maxTime"
              type="number"
              min="10"
              max="300"
              value={maxTime}
              onChange={(e) => setMaxTime(parseInt(e.target.value) || 60)}
              className="h-12"
            />
            <p className="text-sm text-gray-600">
              Students will have {maxTime} seconds to answer (10-300 seconds)
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Create Poll
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};