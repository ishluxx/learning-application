'use client';

import { useState } from 'react';
import { Bot, X } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export default function AIChatIcon() {
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

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content || 'No response received';
      setAnswer(aiResponse);
    } catch (error) {
      console.error(error);
      setAnswer('Sorry, there was an error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700"
          aria-label="Open AI Chat"
        >
          <Bot />
        </button>
      ) : (
        <Card className="w-[340px] h-[450px] flex flex-col shadow-xl rounded-xl overflow-hidden border border-gray-300">
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <div className="flex items-center gap-2 font-semibold text-sm">
              <Bot className="w-4 h-4" />
              Chat with us!
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setQuestion('');
                setAnswer('');
              }}
              className="hover:text-gray-300"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto text-sm space-y-3 bg-white">
            <div className="text-gray-600 bg-gray-100 p-3 rounded-md">
              Hi! How can I assist you today?
            </div>
            {answer && (
              <div className="text-gray-800 bg-blue-50 p-3 rounded-md whitespace-pre-wrap">
                {answer}
              </div>
            )}
          </div>

          {/* Input area */}
          <form onSubmit={handleSubmit} className="p-3 border-t bg-white flex gap-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading || !question.trim()}
            >
              {isLoading ? 'Processing...' : 'Send'}
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
}
