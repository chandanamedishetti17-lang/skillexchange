import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Star, Sparkles, Search, Award, MessageSquare, Video } from 'lucide-react';
import { getMockData } from '../lib/mockData';
import { toast } from 'sonner';

export function PartnerDiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const mockData = getMockData();

  const handleSendRequest = (partnerName: string) => {
    toast.success(`Request sent to ${partnerName}!`);
  };

  const filteredUsers = mockData.allUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.skillsToTeach.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Discover Partners</h1>
          <p className="text-gray-600">Find the perfect match for skill exchange</p>
        </div>

        {/* AI Recommendations Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6" />
            <h2 className="text-2xl font-semibold">AI-Recommended Matches</h2>
          </div>
          <p className="mb-6 text-blue-50">
            Based on your skills and learning goals, we've found these perfect matches for you
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockData.recommendedPartners.slice(0, 3).map((partner) => (
              <div key={partner.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <img 
                    src={partner.profilePicture} 
                    alt={partner.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">{partner.name}</div>
                    <div className="text-sm text-blue-100">{partner.matchScore}% Match</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {partner.skills.slice(0, 2).map((skill, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-white/20 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
                <Link to={`/profile/${partner.id}`}>
                  <Button variant="outline" size="sm" className="w-full bg-white text-blue-600 hover:bg-blue-50 border-0">
                    View Profile
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* All Users */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold">All Members ({filteredUsers.length})</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredUsers.map((partner) => (
            <div key={partner.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src={partner.profilePicture} 
                  alt={partner.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-semibold">{partner.name}</h3>
                    {partner.verified && (
                      <Award className="w-5 h-5 text-blue-600" title="Verified" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{partner.rating}</span>
                      <span className="text-gray-400">({partner.reviewCount})</span>
                    </div>
                    <span>•</span>
                    <span>{partner.credits} credits</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{partner.bio}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Can Teach:</div>
                <div className="flex flex-wrap gap-2">
                  {partner.skillsToTeach.slice(0, 4).map((skill, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                      {skill}
                    </span>
                  ))}
                  {partner.skillsToTeach.length > 4 && (
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      +{partner.skillsToTeach.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Wants to Learn:</div>
                <div className="flex flex-wrap gap-2">
                  {partner.skillsToLearn.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Link to={`/profile/${partner.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    View Profile
                  </Button>
                </Link>
                <Link to={`/video-call/${partner.id}`}>
                  <Button size="sm" variant="outline" className="aspect-square p-0 w-10">
                    <Video className="w-4 h-4" />
                  </Button>
                </Link>
                <Button 
                  className="flex-1"
                  onClick={() => handleSendRequest(partner.name)}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Request
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No partners found</h3>
            <p className="text-gray-600">Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  );
}