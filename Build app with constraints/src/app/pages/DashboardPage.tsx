import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Award, 
  Star, 
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Sparkles,
  FileText
} from 'lucide-react';
import { getMockData } from '../lib/mockData';
import { UsageAnalytics } from '../components/analytics/UsageAnalytics';

export function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const mockData = getMockData();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const stats = [
    { label: 'Credits', value: user.credits, icon: <Award className="w-5 h-5" />, color: 'bg-yellow-500' },
    { label: 'Rating', value: `${user.rating}/5`, icon: <Star className="w-5 h-5" />, color: 'bg-purple-500' },
    { label: 'Active Exchanges', value: mockData.activeExchanges.length, icon: <Users className="w-5 h-5" />, color: 'bg-blue-500' },
    { label: 'Completed', value: mockData.completedExchanges, icon: <CheckCircle className="w-5 h-5" />, color: 'bg-green-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
          <p className="text-gray-600">Here's what's happening with your skill exchanges</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600 text-sm">{stat.label}</span>
                <div className={`${stat.color} p-2 rounded-lg text-white`}>
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* AI Recommendations */}
            <section className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-semibold">AI-Recommended Partners</h2>
                </div>
                <Link to="/partners">
                  <Button variant="ghost" size="sm">
                    View All
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {mockData.recommendedPartners.slice(0, 3).map((partner) => (
                  <div key={partner.id} className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-blue-600 transition-colors">
                    <img 
                      src={partner.profilePicture} 
                      alt={partner.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold">{partner.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{partner.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{partner.bio}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {partner.skills.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-green-600 font-medium">
                        {partner.matchScore}% Match
                      </div>
                    </div>
                    <Link to={`/profile/${partner.id}`}>
                      <Button size="sm">View Profile</Button>
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            {/* Active Exchanges */}
            <section className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Active Exchanges</h2>
                <Link to="/chat">
                  <Button variant="ghost" size="sm">
                    View All
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {mockData.activeExchanges.map((exchange) => (
                  <div key={exchange.id} className="flex items-center gap-4 p-4 rounded-lg border border-gray-200">
                    <img 
                      src={exchange.partnerAvatar} 
                      alt={exchange.partnerName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{exchange.partnerName}</h3>
                      <p className="text-sm text-gray-600">
                        {exchange.yourSkill} ↔ {exchange.theirSkill}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>Next session: {exchange.nextSession}</span>
                      </div>
                    </div>
                    <Link to={`/chat/${exchange.partnerId}`}>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Chat
                      </Button>
                    </Link>
                  </div>
                ))}
                {mockData.activeExchanges.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No active exchanges yet</p>
                    <Link to="/partners">
                      <Button className="mt-4" size="sm">Find Partners</Button>
                    </Link>
                  </div>
                )}
              </div>
            </section>

            {/* Pending Requests */}
            <section className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-6">Pending Requests</h2>
              
              <div className="space-y-4">
                {mockData.pendingRequests.map((request) => (
                  <div key={request.id} className="flex items-center gap-4 p-4 rounded-lg border border-gray-200">
                    <img 
                      src={request.avatar} 
                      alt={request.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{request.name}</h3>
                      <p className="text-sm text-gray-600">{request.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{request.skill}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Decline</Button>
                      <Button size="sm">Accept</Button>
                    </div>
                  </div>
                ))}
                {mockData.pendingRequests.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No pending requests</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Badges */}
            <section className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Your Badges</h2>
              <div className="grid grid-cols-2 gap-4">
                {user.badges.map((badge) => (
                  <div key={badge.id} className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200">
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <div className="text-sm font-medium">{badge.name}</div>
                  </div>
                ))}
                {user.badges.length === 0 && (
                  <div className="col-span-2 text-center py-4 text-gray-500 text-sm">
                    Complete activities to earn badges
                  </div>
                )}
              </div>
              <Link to={`/portfolio/${user.id}`}>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  View Portfolio
                </Button>
              </Link>
            </section>

            {/* Quick Actions */}
            <section className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Link to="/resume">
                  <Button className="w-full justify-start bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                    <FileText className="w-4 h-4 mr-2" />
                    Build AI Resume
                  </Button>
                </Link>
                <Link to={`/profile/${user.id}`}>
                  <Button variant="outline" className="w-full justify-start">
                    Edit Profile
                  </Button>
                </Link>
                <Link to="/skills">
                  <Button variant="outline" className="w-full justify-start">
                    Browse Skills
                  </Button>
                </Link>
                <Link to="/partners">
                  <Button variant="outline" className="w-full justify-start">
                    Find Partners
                  </Button>
                </Link>
              </div>
            </section>

            {/* Progress */}
            <section className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <h2 className="text-xl font-semibold mb-4">Level Progress</h2>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Level 3</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <p className="text-sm text-blue-100">
                Complete 5 more sessions to reach Level 4 and unlock priority matching!
              </p>
            </section>

            {/* Usage Analytics */}
            <UsageAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
}