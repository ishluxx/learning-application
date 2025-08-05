'use client';

import { useState } from 'react';
import { Bot, MessageCircle, X } from 'lucide-react';
import { Card } from '../ui/card';

interface AIChatIconProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  iconSize?: number;
  iconColor?: string;
}

export default function AIChatIcon({
  iconSize = 40,
  iconColor = 'currentColor',
}: AIChatIconProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`,
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1-0528:free',
          messages: [{ role: 'user', content: question }],
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || 'No response received';
      setAnswer(aiResponse);
    } catch (error) {
      console.error('Error getting DeepSeek response:', error);
      setAnswer('Sorry, there was an error processing your question.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-2 right-4 z-50`}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Open AI chat"
        >
          <Bot size={iconSize} color={iconColor} />
        </button>
      ) : (
        <Card className="w-80">
          <div className="bg-blue-600 p-3 text-white flex justify-between items-center">
            <h3 className="font-medium">AI Assistant</h3>
            <button
              onClick={() => {
                setIsOpen(false);
                setQuestion('');
                setAnswer('');
              }}
              aria-label="Close chat"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-4 max-h-96 overflow-y-auto">
            {answer && (
              <div className="mb-4 p-3 bg-gray-50 rounded-md">
                <p className="text-gray-800">{answer}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="ai-question" className="block text-sm font-medium text-gray-700 mb-1">
                  Ask a question
                </label>
                <textarea
                  id="ai-question"
                  rows={3}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="How can I help you today?"
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !question.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : 'Ask AI'}
              </button>
            </form>
          </div>
        </Card>
      )}
    </div>
  );
}
