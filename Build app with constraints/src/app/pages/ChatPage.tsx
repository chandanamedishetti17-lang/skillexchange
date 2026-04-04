import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Send, Calendar, Video, Phone, MoreVertical } from 'lucide-react';
import { getMockData } from '../lib/mockData';

export function ChatPage() {
  const { partnerId } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'partner', text: 'Hey! Ready for our React session tomorrow?', time: '10:30 AM' },
    { id: 2, sender: 'me', text: 'Yes! Looking forward to it. What should I prepare?', time: '10:32 AM' },
    { id: 3, sender: 'partner', text: 'Just have a basic understanding of JavaScript. We\'ll start with hooks.', time: '10:35 AM' },
    { id: 4, sender: 'me', text: 'Perfect! I\'ve been studying the documentation.', time: '10:37 AM' },
  ]);

  const mockData = getMockData();
  const conversations = mockData.activeExchanges;
  const selectedPartner = partnerId 
    ? conversations.find(c => c.partnerId === partnerId) 
    : conversations[0];

  const handleSend = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: 'me',
          text: message,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setMessage('');
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] bg-gray-50 flex">
      {/* Conversations List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Messages</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                selectedPartner?.id === conv.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={conv.partnerAvatar}
                  alt={conv.partnerName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{conv.partnerName}</div>
                  <div className="text-sm text-gray-600 truncate">
                    {conv.yourSkill} ↔ {conv.theirSkill}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedPartner ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={selectedPartner.partnerAvatar}
                alt={selectedPartner.partnerName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold">{selectedPartner.partnerName}</div>
                <div className="text-sm text-gray-600">
                  {selectedPartner.yourSkill} ↔ {selectedPartner.theirSkill}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                <Phone className="w-4 h-4" />
              </Button>
              <Link to={`/video-call/${selectedPartner.partnerId}`}>
                <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                  <Video className="w-4 h-4 mr-2" />
                  Start Video Call
                </Button>
              </Link>
              <Button size="sm" variant="outline">
                <Calendar className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex items-end gap-2 max-w-md">
                  {msg.sender === 'partner' && (
                    <img
                      src={selectedPartner.partnerAvatar}
                      alt={selectedPartner.partnerName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        msg.sender === 'me'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 px-2">{msg.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button onClick={handleSend}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <Send className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Select a conversation to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
}