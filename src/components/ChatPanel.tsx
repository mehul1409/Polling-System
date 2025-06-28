import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useSocket } from '../contexts/SocketContext';
import { Send, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

interface ChatMessage {
  sender: string;
  role: 'teacher' | 'student';
  message: string;
  timestamp: string;
}

export const ChatPanel: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    // Fetch chat history
    fetchChatHistory();

    if (!socket) return;

    // Listen for new messages
    socket.on('new-message', (message: ChatMessage) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      socket.off('new-message');
    };
  }, [socket]);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    scrollToBottom();
  }, [messages]);

  const fetchChatHistory = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/chat/history');
      if (response.ok) {
        const history = await response.json();
        setMessages(history);
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() || !socket || !isConnected) {
      return;
    }

    setIsLoading(true);

    try {
      socket.emit('send-message', { message: newMessage.trim() });
      setNewMessage('');
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center">
          <MessageSquare className="w-5 h-5 mr-2" />
          Live Chat
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'teacher' ? 'justify-start' : 'justify-start'
                }`}
              >
                <div className="max-w-[80%]">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge
                      variant={message.role === 'teacher' ? 'default' : 'secondary'}
                      className={`text-xs ${
                        message.role === 'teacher'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {message.role === 'teacher' ? '👩‍🏫' : '👨‍🎓'} {message.sender}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      message.role === 'teacher'
                        ? 'bg-purple-50 border border-purple-200'
                        : 'bg-blue-50 border border-blue-200'
                    }`}
                  >
                    <p className="text-gray-900 whitespace-pre-wrap">{message.message}</p>
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="flex-shrink-0 border-t p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={isLoading || !isConnected}
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={!newMessage.trim() || isLoading || !isConnected}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
          
          {!isConnected && (
            <p className="text-xs text-red-500 mt-2">
              Disconnected from server. Reconnecting...
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};