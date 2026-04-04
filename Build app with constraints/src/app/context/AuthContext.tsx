import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
  profilePicture?: string;
  skillsToTeach: Skill[];
  skillsToLearn: Skill[];
  certifications: Certification[];
  credits: number;
  rating: number;
  reviewCount: number;
  isAdmin: boolean;
  badges: Badge[];
  joinedDate: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  verified: boolean;
}

export interface Certification {
  id: string;
  skillId: string;
  skillName: string;
  documentUrl: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadedDate: string;
  institution?: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedDate: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate login - in real app, this would call an API
    const mockUsers = getMockUsers();
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate registration
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      bio: '',
      skillsToTeach: [],
      skillsToLearn: [],
      certifications: [],
      credits: 10, // Starting credits
      rating: 0,
      reviewCount: 0,
      isAdmin: false,
      badges: [],
      joinedDate: new Date().toISOString(),
    };
    
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Mock data helper
function getMockUsers(): User[] {
  return [
    {
      id: 'user-1',
      name: 'Lalasa',
      email: 'lalasa@example.com',
      bio: 'Full-stack developer passionate about teaching web development and learning design.',
      profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      skillsToTeach: [
        { id: 's1', name: 'React', category: 'Programming', proficiency: 'Expert', verified: true },
        { id: 's2', name: 'Node.js', category: 'Programming', proficiency: 'Advanced', verified: true },
        { id: 's3', name: 'Python', category: 'Programming', proficiency: 'Advanced', verified: true },
      ],
      skillsToLearn: [
        { id: 's4', name: 'UI/UX Design', category: 'Design', proficiency: 'Beginner', verified: false },
        { id: 's5', name: 'Figma', category: 'Design', proficiency: 'Beginner', verified: false },
      ],
      certifications: [
        {
          id: 'cert1',
          skillId: 's1',
          skillName: 'React',
          documentUrl: '#',
          status: 'verified',
          uploadedDate: '2026-01-15',
        },
      ],
      credits: 45,
      rating: 4.8,
      reviewCount: 23,
      isAdmin: false,
      badges: [
        { id: 'b1', name: 'Early Adopter', icon: '🌟', description: 'Joined in the first month', earnedDate: '2026-01-10' },
        { id: 'b2', name: 'Master Teacher', icon: '🎓', description: 'Completed 20 teaching sessions', earnedDate: '2026-02-15' },
      ],
      joinedDate: '2026-01-10',
    },
    {
      id: 'user-2',
      name: 'Admin User',
      email: 'admin@example.com',
      bio: 'Platform administrator',
      credits: 100,
      rating: 5.0,
      reviewCount: 50,
      isAdmin: true,
      skillsToTeach: [],
      skillsToLearn: [],
      certifications: [],
      badges: [],
      joinedDate: '2026-01-01',
    },
  ];
}