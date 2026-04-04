import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams, Link } from 'react-router';
import { Button } from '../components/ui/button';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Monitor,
  MonitorOff,
  MessageSquare,
  Settings,
  Users,
  Maximize2,
  Camera,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { toast } from 'sonner';
import { getMockData } from '../lib/mockData';

interface CallParticipant {
  id: string;
  name: string;
  profilePicture?: string;
  isVideoOn: boolean;
  isAudioOn: boolean;
}

export function VideoCallPage() {
  const { user, isAuthenticated } = useAuth();
  const { partnerId } = useParams();
  const navigate = useNavigate();
  const mockData = getMockData();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; sender: string; text: string; timestamp: Date }>>([]);
  const [chatInput, setChatInput] = useState('');

  // Find the partner
  const partner = mockData.allUsers.find((u) => u.id === partnerId);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }

    if (!partner) {
      toast.error('Partner not found');
      navigate('/partners');
      return;
    }

    // Simulate connection
    const connectTimer = setTimeout(() => {
      setConnectionStatus('connected');
      toast.success(`Connected with ${partner.name}`);
    }, 2000);

    return () => clearTimeout(connectTimer);
  }, [isAuthenticated, user, partner, navigate]);

  // Call duration timer
  useEffect(() => {
    if (connectionStatus !== 'connected') return;

    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [connectionStatus]);

  // Simulate video stream
  useEffect(() => {
    if (isVideoOn && localVideoRef.current) {
      // In a real app, this would use navigator.mediaDevices.getUserMedia()
      // For demo purposes, we'll just show a placeholder
    }
  }, [isVideoOn]);

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    toast.success(isVideoOn ? 'Camera turned off' : 'Camera turned on');
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    toast.success(isAudioOn ? 'Microphone muted' : 'Microphone unmuted');
  };

  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
    toast.success(isSpeakerOn ? 'Speaker muted' : 'Speaker unmuted');
  };

  const toggleScreenShare = () => {
    if (!isScreenSharing) {
      // In a real app, this would use navigator.mediaDevices.getDisplayMedia()
      setIsScreenSharing(true);
      toast.success('Screen sharing started');
    } else {
      setIsScreenSharing(false);
      toast.success('Screen sharing stopped');
    }
  };

  const endCall = () => {
    toast.success('Call ended');
    navigate('/chat/' + partnerId);
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: user!.name,
      text: chatInput,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, newMessage]);
    setChatInput('');
  };

  if (!partner || !user) return null;

  const remoteParticipant: CallParticipant = {
    id: partner.id,
    name: partner.name,
    profilePicture: partner.profilePicture,
    isVideoOn: true, // Simulate remote video
    isAudioOn: true,
  };

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500' : connectionStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'}`} />
              <span className="text-white font-medium">
                {connectionStatus === 'connected' ? 'Connected' : connectionStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
              </span>
            </div>
            {connectionStatus === 'connected' && (
              <span className="text-gray-400 text-sm">{formatDuration(callDuration)}</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white font-medium">Video Call with {partner.name}</span>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="flex-1 relative overflow-hidden">
        <div className="h-full w-full grid grid-cols-1 lg:grid-cols-2 gap-2 p-4">
          {/* Remote Video */}
          <div className="relative bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
            {remoteParticipant.isVideoOn ? (
              <div className="relative w-full h-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                {/* Placeholder for demo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={remoteParticipant.profilePicture}
                    alt={remoteParticipant.name}
                    className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-2xl"
                  />
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gray-600 rounded-full flex items-center justify-center">
                    <VideoOff className="w-16 h-16 text-gray-400" />
                  </div>
                  <p className="text-white text-lg">{remoteParticipant.name}</p>
                  <p className="text-gray-400 text-sm">Camera is off</p>
                </div>
              </div>
            )}

            {/* Remote participant info */}
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">{remoteParticipant.name}</span>
                {!remoteParticipant.isAudioOn && <MicOff className="w-4 h-4 text-red-400" />}
              </div>
            </div>

            {isScreenSharing && (
              <div className="absolute top-4 left-4 bg-red-600 px-3 py-1 rounded-full">
                <span className="text-white text-sm font-medium flex items-center gap-2">
                  <Monitor className="w-4 h-4" />
                  Sharing Screen
                </span>
              </div>
            )}
          </div>

          {/* Local Video */}
          <div className="relative bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
            {isVideoOn ? (
              <div className="relative w-full h-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                {/* Placeholder for demo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.name}
                      className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-2xl"
                    />
                  ) : (
                    <div className="w-48 h-48 rounded-full bg-indigo-600 flex items-center justify-center border-4 border-white shadow-2xl">
                      <span className="text-6xl text-white font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gray-600 rounded-full flex items-center justify-center">
                    <VideoOff className="w-16 h-16 text-gray-400" />
                  </div>
                  <p className="text-white text-lg">{user.name} (You)</p>
                  <p className="text-gray-400 text-sm">Your camera is off</p>
                </div>
              </div>
            )}

            {/* Local user info */}
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">{user.name} (You)</span>
                {!isAudioOn && <MicOff className="w-4 h-4 text-red-400" />}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        {showChat && (
          <div className="absolute right-4 top-4 bottom-24 w-80 bg-white rounded-xl shadow-2xl flex flex-col">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-t-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                <span className="font-semibold">Chat</span>
              </div>
              <button onClick={() => setShowChat(false)} className="hover:bg-white/20 p-1 rounded">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === user.name ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg px-3 py-2 ${msg.sender === user.name ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                    <p className="text-sm font-medium mb-1">{msg.sender}</p>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Button onClick={sendChatMessage} size="sm">
                  Send
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Control Bar */}
      <div className="bg-gray-800 border-t border-gray-700 px-6 py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-4">
          {/* Audio Control */}
          <Button
            onClick={toggleAudio}
            size="lg"
            className={`rounded-full w-14 h-14 ${isAudioOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'}`}
          >
            {isAudioOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
          </Button>

          {/* Video Control */}
          <Button
            onClick={toggleVideo}
            size="lg"
            className={`rounded-full w-14 h-14 ${isVideoOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'}`}
          >
            {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
          </Button>

          {/* Screen Share */}
          <Button
            onClick={toggleScreenShare}
            size="lg"
            className={`rounded-full w-14 h-14 ${isScreenSharing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            {isScreenSharing ? <MonitorOff className="w-6 h-6" /> : <Monitor className="w-6 h-6" />}
          </Button>

          {/* Speaker Control */}
          <Button
            onClick={toggleSpeaker}
            size="lg"
            className={`rounded-full w-14 h-14 ${isSpeakerOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'}`}
          >
            {isSpeakerOn ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
          </Button>

          {/* Chat Toggle */}
          <Button
            onClick={() => setShowChat(!showChat)}
            size="lg"
            className={`rounded-full w-14 h-14 ${showChat ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            <MessageSquare className="w-6 h-6" />
          </Button>

          {/* End Call */}
          <Button
            onClick={endCall}
            size="lg"
            className="rounded-full w-14 h-14 bg-red-600 hover:bg-red-700"
          >
            <PhoneOff className="w-6 h-6" />
          </Button>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-4">
          <p className="text-gray-400 text-sm">
            Session with {partner.name} • Skill Exchange in Progress
          </p>
        </div>
      </div>
    </div>
  );
}