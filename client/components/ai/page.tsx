"use client";

import { useState, useEffect, useRef } from "react";
import { Bot, X, Mic, MicOff } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

export default function AIChatIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognition = useRef<SpeechRecognition | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when answer updates
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [answer]);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      console.warn("Speech Recognition not supported in this browser.");
      return;
    }
    const SpeechRecognition =
      // @ts-ignore
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition.current = new SpeechRecognition();
    recognition.current.lang = "en-US";
    recognition.current.interimResults = false;
    recognition.current.continuous = false;

    recognition.current.onstart = () => setIsListening(true);
    recognition.current.onend = () => setIsListening(false);

    recognition.current.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setQuestion((q) => (q ? q + " " + transcript : transcript));
    };
  }, []);

  const toggleListening = () => {
    if (!recognition.current) return alert("Speech Recognition not supported");
    if (isListening) {
      recognition.current.stop();
    } else {
      recognition.current.start();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setAnswer("");
    try {
      // Replace with your API endpoint or mock response
      const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_API_KEY_HERE`,
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1-0528:free",
          messages: [{ role: "user", content: question }],
          stream: false,
        }),
      });

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content || "No response received";
      setAnswer(aiResponse);
    } catch (error) {
      console.error(error);
      setAnswer("❌ Sorry, there was an error processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          aria-label="Open AI Chat"
          title="Chat with AI Assistant 🤖"
        >
          <Bot size={28} />
        </button>
      ) : (
        <Card className="w-[360px] h-[500px] flex flex-col shadow-2xl rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] relative">
          {/* Close Button */}
          <button
            onClick={() => {
              setIsOpen(false);
              setQuestion("");
              setAnswer("");
              setIsListening(false);
            }}
            aria-label="Close chat"
            title="Close chat"
            className="absolute top-3 right-3 text-white bg-blue-700 hover:bg-blue-800 rounded-full p-1 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex flex-col justify-center items-center space-y-1">
            <Bot className="w-6 h-6" />
            <h2 className="font-semibold text-lg">Quick Assistant Bot 🤖</h2>
            <p className="text-xs text-blue-200 max-w-[280px] text-center select-none">
              Your smart AI assistant — ask questions, get instant answers with emojis, images, and voice input support!
            </p>
          </div>

          {/* Bot avatar image */}
          <div className="flex justify-center mt-3">
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=96&q=80"
              alt="AI assistant avatar"
              className="rounded-full w-20 h-20 shadow-md"
              draggable={false}
            />
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto text-sm space-y-3 bg-gray-50 dark:bg-[#121212] rounded-md mt-3">
            <div className="text-gray-700 dark:text-gray-300 bg-white dark:bg-[#222222] p-3 rounded-md select-text">
              👋 Hi there! How can I assist you today?
            </div>
            {answer && (
              <div className="text-gray-900 dark:text-gray-100 bg-blue-50 dark:bg-blue-900 p-3 rounded-md whitespace-pre-wrap select-text">
                {answer}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] flex items-center gap-2"
          >
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your message... (or use 🎤)"
              disabled={isLoading}
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
              spellCheck={false}
              autoComplete="off"
            />

            {/* Voice input button */}
            <button
              type="button"
              onClick={toggleListening}
              title={isListening ? "Stop voice input" : "Start voice input"}
              className={`p-2 rounded-md transition-colors ${
                isListening
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>

            {/* Send button */}
            <Button
              type="submit"
              disabled={isLoading || !question.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {isLoading ? "Processing..." : "Send"}
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
}
