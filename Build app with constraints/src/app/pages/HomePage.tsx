import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { ArrowRight, Users, Award, TrendingUp, Shield, Sparkles, Globe } from 'lucide-react';

export function HomePage() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'AI-Powered Matching',
      description: 'Our intelligent algorithm connects you with perfect skill exchange partners based on your interests and expertise.',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Verified Skills',
      description: 'All teachers must submit certifications to ensure quality and credibility in knowledge sharing.',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Credit System',
      description: 'Fair exchange system where teaching earns credits to learn new skills from the community.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Trust & Ratings',
      description: 'Transparent rating system helps maintain quality and build trust within the community.',
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Badges & Achievements',
      description: 'Earn recognition through digital badges, certificates, and showcase your learning journey.',
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Build Your Brand',
      description: 'Create a professional portfolio and showcase your skills with shareable profile links.',
    },
  ];

  const categories = [
    'Programming',
    'Design',
    'Languages',
    'Marketing',
    'Music',
    'Photography',
    'Business',
    'Data Science',
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Exchange Skills, Build Community
            </h1>
            <p className="text-xl mb-8 text-blue-50">
              Join a peer-to-peer learning platform powered by AI. Teach what you know, learn what you want, and grow together without financial barriers.
            </p>
            <div className="flex flex-wrap gap-4">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                      Get Started Free
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/skills">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      Browse Skills
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">2,500+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">150+</div>
              <div className="text-gray-600">Skills Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">5,000+</div>
              <div className="text-gray-600">Exchanges Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">4.8</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Skill Exchange?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A comprehensive platform designed to make skill sharing easy, trustworthy, and rewarding.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Explore Skill Categories</h2>
            <p className="text-xl text-gray-600">
              Discover skills across diverse fields and find your perfect learning match.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Link
                key={index}
                to="/skills"
                className="bg-white p-6 rounded-lg border border-gray-200 text-center hover:border-blue-600 hover:shadow-md transition-all"
              >
                <div className="font-semibold text-gray-900">{category}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">
              Start your skill exchange journey in four simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Create Profile</h3>
              <p className="text-gray-600">Sign up and add your skills, interests, and certifications.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Get Matched</h3>
              <p className="text-gray-600">Our AI finds perfect partners based on your profile.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Exchange Skills</h3>
              <p className="text-gray-600">Connect, schedule sessions, and start learning together.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-semibold mb-2">Earn Recognition</h3>
              <p className="text-gray-600">Collect badges, build portfolio, and grow your network.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 text-blue-50">
            Join thousands of learners and teachers exchanging skills every day.
          </p>
          {!isAuthenticated && (
            <Link to="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Join Now - It's Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
