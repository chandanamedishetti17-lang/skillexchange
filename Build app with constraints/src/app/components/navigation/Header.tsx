import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Home, BookOpen, Users, MessageSquare, Briefcase, LayoutDashboard, Shield, FileText } from 'lucide-react';
import { Button } from '../ui/button';

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">SE</span>
              </div>
              <span className="font-semibold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Skill Exchange</span>
            </Link>
            
            {isAuthenticated && (
              <nav className="hidden md:flex items-center gap-6">
                <Link to="/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/skills" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors">
                  <BookOpen className="w-4 h-4" />
                  <span>Skills</span>
                </Link>
                <Link to="/partners" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors">
                  <Users className="w-4 h-4" />
                  <span>Partners</span>
                </Link>
                <Link to="/chat" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat</span>
                </Link>
                <Link to={`/portfolio/${user?.id}`} className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors">
                  <Briefcase className="w-4 h-4" />
                  <span>Portfolio</span>
                </Link>
                {user?.isAdmin && (
                  <Link to="/admin" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors">
                    <Shield className="w-4 h-4" />
                    <span>Admin</span>
                  </Link>
                )}
              </nav>
            )}
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to={`/profile/${user?.id}`} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-indigo-50 transition-colors">
                  {user?.profilePicture ? (
                    <img src={user.profilePicture} alt={user.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-100" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-sm">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <span className="hidden md:block text-sm font-medium">{user?.name}</span>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden md:inline">Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}