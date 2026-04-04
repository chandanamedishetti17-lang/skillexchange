import { useState } from 'react';
import { X, Send, Bot, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '../ui/button';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your Skill Exchange assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(input.toLowerCase());
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  const generateBotResponse = (input: string): string => {
    if (input.includes('skill') || input.includes('learn')) {
      return 'You can browse available skills on the Skills page. Would you like me to help you find a specific skill or recommend a learning partner?';
    }
    if (input.includes('credit') || input.includes('point')) {
      return 'Credits are earned by teaching skills and can be used to learn from others. You currently have credits in your account. Check your profile to see your balance!';
    }
    if (input.includes('partner') || input.includes('match')) {
      return 'I can help you find the perfect learning partner! Visit the Partners page to see AI-recommended matches based on your skills and learning goals.';
    }
    if (input.includes('certif')) {
      return 'You can upload certificates from trusted institutions in your Profile settings. Our admin team will verify them within 24-48 hours.';
    }
    if (input.includes('chat') || input.includes('message')) {
      return 'You can chat with your learning partners in real-time using our Chat feature. Just navigate to the Chat page to start a conversation!';
    }
    if (input.includes('video') || input.includes('call')) {
      return 'Start video calls directly from the Chat page or Partners page! Our video call feature includes camera controls, screen sharing, in-call chat, and more. Perfect for live skill exchange sessions!';
    }
    if (input.includes('resume') || input.includes('cv')) {
      return 'Our AI Resume Builder can create a professional resume based on your skills and achievements! Just select the skills you want to highlight, and our AI will generate a customized resume. Visit the Resume Builder from your dashboard!';
    }
    if (input.includes('help') || input.includes('how')) {
      return 'I can help you with:\n• Finding skills to learn\n• Matching with partners\n• Understanding credits\n• Certificate verification\n• Starting video calls\n• Building your AI resume\n• Using the platform features\n\nWhat would you like to know more about?';
    }
    return 'I\'m here to help! You can ask me about skills, partners, credits, certifications, video calls, resume building, or any platform features. What would you like to know?';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 hover:scale-110"
      >
        <Bot className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 transition-all duration-300 ${
        isMinimized ? 'w-80 h-14' : 'w-96 h-[600px]'
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold">AI Assistant</div>
            <div className="text-xs text-indigo-100">Online</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:bg-white/10 p-1 rounded transition-colors"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/10 p-1 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-[calc(100%-8rem)] overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-indigo-100' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <Button
                onClick={handleSend}
                size="sm"
                className="rounded-full w-10 h-10 p-0"
                disabled={!input.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}