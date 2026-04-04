import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Shield, Users, FileCheck, TrendingUp, CheckCircle, XCircle, AlertCircle, Activity } from 'lucide-react';
import { getMockData } from '../lib/mockData';
import { toast } from 'sonner';
import { UsageAnalytics } from '../components/analytics/UsageAnalytics';

export function AdminPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const mockData = getMockData();
  const [pendingCerts, setPendingCerts] = useState(mockData.certifications);

  useEffect(() => {
    if (!isAuthenticated || !user?.isAdmin) {
      navigate('/');
      toast.error('Access denied. Admin only.');
    }
  }, [isAuthenticated, user, navigate]);

  if (!user?.isAdmin) return null;

  const handleVerify = (certId: string) => {
    setPendingCerts(pendingCerts.map(cert => 
      cert.id === certId ? { ...cert, status: 'verified' as const } : cert
    ));
    toast.success('Certification verified!');
  };

  const handleReject = (certId: string) => {
    setPendingCerts(pendingCerts.map(cert => 
      cert.id === certId ? { ...cert, status: 'rejected' as const } : cert
    ));
    toast.error('Certification rejected');
  };

  const stats = [
    { label: 'Total Users', value: '2,547', icon: <Users className="w-5 h-5" />, color: 'bg-blue-500' },
    { label: 'Active Exchanges', value: '456', icon: <TrendingUp className="w-5 h-5" />, color: 'bg-green-500' },
    { label: 'Pending Certifications', value: pendingCerts.filter(c => c.status === 'pending').length, icon: <FileCheck className="w-5 h-5" />, color: 'bg-yellow-500' },
    { label: 'Verified Skills', value: '1,234', icon: <CheckCircle className="w-5 h-5" />, color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">Manage users, certifications, and platform settings</p>
          </div>
        </div>

        {/* Stats */}
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

        {/* Pending Certifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Pending Certifications</h2>
          
          <div className="space-y-4">
            {pendingCerts.filter(cert => cert.status === 'pending').map((cert) => (
              <div key={cert.id} className="flex items-center gap-4 p-4 rounded-lg border border-gray-200">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <FileCheck className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{cert.userName}</div>
                  <div className="text-sm text-gray-600">
                    Skill: {cert.skillName}
                  </div>
                  <div className="text-xs text-gray-500">
                    Uploaded: {new Date(cert.uploadedDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(cert.documentUrl, '_blank')}
                  >
                    View Document
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReject(cert.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleVerify(cert.id)}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Verify
                  </Button>
                </div>
              </div>
            ))}
            {pendingCerts.filter(cert => cert.status === 'pending').length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No pending certifications</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Verifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Recent Verifications</h2>
          
          <div className="space-y-3">
            {pendingCerts.filter(cert => cert.status !== 'pending').map((cert) => (
              <div key={cert.id} className="flex items-center gap-4 p-3 rounded-lg border border-gray-200">
                <div className={`w-10 h-10 ${cert.status === 'verified' ? 'bg-green-100' : 'bg-red-100'} rounded-lg flex items-center justify-center`}>
                  {cert.status === 'verified' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{cert.userName}</div>
                  <div className="text-sm text-gray-600">{cert.skillName}</div>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    cert.status === 'verified' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {cert.status === 'verified' ? 'Verified' : 'Rejected'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Management */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">User Management</h2>
          
          <div className="space-y-3">
            {mockData.allUsers.slice(0, 5).map((u) => (
              <div key={u.id} className="flex items-center gap-4 p-4 rounded-lg border border-gray-200">
                <img 
                  src={u.profilePicture} 
                  alt={u.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="font-semibold">{u.name}</div>
                  <div className="text-sm text-gray-600">
                    {u.reviewCount} reviews • {u.credits} credits
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">View Profile</Button>
                  <Button size="sm" variant="outline">Suspend</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Usage Analytics */}
        <UsageAnalytics />
      </div>
    </div>
  );
}