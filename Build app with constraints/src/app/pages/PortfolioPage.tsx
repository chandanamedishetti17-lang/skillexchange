import { useParams } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Award, Star, Calendar, TrendingUp, Download, Share2, ExternalLink, Linkedin, Github, Save } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

export function PortfolioPage() {
  const { userId } = useParams();
  const { user, updateUser } = useAuth();
  const [linkedinUrl, setLinkedinUrl] = useState(user?.linkedinUrl || '');
  const [githubUrl, setGithubUrl] = useState(user?.githubUrl || '');
  const [isEditing, setIsEditing] = useState(false);

  if (!user) return null;

  const portfolioProjects = [
    {
      id: 1,
      title: 'E-commerce Website Redesign',
      description: 'Collaborated with Rishwanth to redesign an e-commerce platform with modern UI/UX principles',
      skills: ['React', 'UI/UX Design'],
      date: '2026-02-15',
      partner: 'Rishwanth',
    },
    {
      id: 2,
      title: 'Python Data Analysis Dashboard',
      description: 'Built an interactive data visualization dashboard while learning Python from Lalasa',
      skills: ['Python', 'Data Visualization'],
      date: '2026-01-28',
      partner: 'Lalasa',
    },
    {
      id: 3,
      title: 'Mobile App Prototype',
      description: 'Created a mobile app prototype using Figma during skill exchange with Taqib Aza',
      skills: ['Figma', 'Mobile Design'],
      date: '2026-01-15',
      partner: 'Taqib Aza',
    },
  ];

  const achievements = [
    { month: 'January', sessions: 8, creditsEarned: 24 },
    { month: 'February', sessions: 12, creditsEarned: 36 },
    { month: 'March', sessions: 6, creditsEarned: 18 },
  ];

  const handleShare = () => {
    toast.success('Portfolio link copied to clipboard!');
  };

  const handleDownload = () => {
    toast.success('Resume downloaded successfully!');
  };

  const handleSave = () => {
    if (!linkedinUrl || !githubUrl) {
      toast.error('Please fill in both LinkedIn and GitHub URLs.');
      return;
    }
    updateUser({
      linkedinUrl,
      githubUrl,
    });
    toast.success('Links saved successfully!');
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 mb-8 text-white">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{user.name}'s Portfolio</h1>
              <p className="text-blue-100">Professional skill exchange journey & achievements</p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleShare}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleDownload}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold mb-1">{user.credits}</div>
              <div className="text-sm text-blue-100">Total Credits</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold mb-1">26</div>
              <div className="text-sm text-blue-100">Sessions Completed</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold mb-1">{user.rating}</div>
              <div className="text-sm text-blue-100">Average Rating</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold mb-1">{user.badges.length}</div>
              <div className="text-sm text-blue-100">Badges Earned</div>
            </div>
          </div>
        </div>

        {/* Skills Overview */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Skills Mastered
            </h2>
            <div className="space-y-3">
              {user.skillsToTeach.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{skill.name}</div>
                    <div className="text-sm text-gray-600">{skill.proficiency}</div>
                  </div>
                  <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    Verified
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              Badges & Achievements
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {user.badges.map((badge) => (
                <div key={badge.id} className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200">
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <div className="text-sm font-medium">{badge.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Projects & Collaborations</h2>
          <div className="space-y-6">
            {portfolioProjects.map((project) => (
              <div key={project.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-700 mb-3">{project.description}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(project.date).toLocaleDateString()}</span>
                  </div>
                  <span>•</span>
                  <span>Partner: {project.partner}</span>
                  <span>•</span>
                  <div className="flex gap-2">
                    {project.skills.map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Timeline */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-6">Learning Progress</h2>
          <div className="space-y-4">
            {achievements.map((achievement, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-24 text-gray-700 font-medium">{achievement.month}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      {achievement.sessions} sessions completed
                    </span>
                    <span className="text-sm font-medium text-blue-600">
                      +{achievement.creditsEarned} credits
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(achievement.sessions / 12) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Links */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Professional Integration</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2"
              onClick={() => setIsEditing(true)}
            >
              <Linkedin className="w-5 h-5" />
              Connect LinkedIn
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2"
              onClick={() => setIsEditing(true)}
            >
              <Github className="w-5 h-5" />
              Connect GitHub
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Export Resume
            </Button>
          </div>
          {isEditing && (
            <div className="mt-4">
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
                <input
                  type="text"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">GitHub URL</label>
                <input
                  type="text"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={handleSave}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}