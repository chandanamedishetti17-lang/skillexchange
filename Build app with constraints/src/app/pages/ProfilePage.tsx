import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Star, Award, MapPin, Calendar, Edit2, Upload, CheckCircle, XCircle, X, Linkedin, Github, Save, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export function ProfilePage() {
  const { userId } = useParams();
  const { user, updateUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    email: user?.email || '',
  });
  
  // Social links state
  const [linkedinUrl, setLinkedinUrl] = useState(user?.linkedinUrl || '');
  const [githubUrl, setGithubUrl] = useState(user?.githubUrl || '');
  const [editingSocialLinks, setEditingSocialLinks] = useState(false);
  
  // Skill dialog states
  const [isAddTeachSkillOpen, setIsAddTeachSkillOpen] = useState(false);
  const [isAddLearnSkillOpen, setIsAddLearnSkillOpen] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: '',
    proficiency: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert',
  });

  // Certificate dialog state
  const [isUploadCertOpen, setIsUploadCertOpen] = useState(false);
  const [newCertificate, setNewCertificate] = useState({
    skillName: '',
    documentUrl: '',
    institution: '',
  });

  // Trusted institutions list
  const trustedInstitutions = [
    'Coursera',
    'edX',
    'Udemy',
    'LinkedIn Learning',
    'Google',
    'Microsoft',
    'Amazon Web Services (AWS)',
    'Meta',
    'IBM',
    'Harvard University',
    'MIT',
    'Stanford University',
    'University of Cambridge',
    'University of Oxford',
    'FreeCodeCamp',
    'Codecademy',
    'Udacity',
    'Pluralsight',
    'DataCamp',
    'Oracle',
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (user) {
      setLinkedinUrl(user.linkedinUrl || '');
      setGithubUrl(user.githubUrl || '');
    }
  }, [user]);

  if (!user) return null;

  const isOwnProfile = !userId || userId === user.id;

  const handleSave = () => {
    updateUser(formData);
    setEditing(false);
    toast.success('Profile updated successfully!');
  };

  const resetSkillForm = () => {
    setNewSkill({
      name: '',
      category: '',
      proficiency: 'Beginner',
    });
  };

  const handleAddTeachSkill = () => {
    if (!newSkill.name || !newSkill.category) {
      toast.error('Please fill in all fields');
      return;
    }

    const updatedUser = {
      ...user,
      skillsToTeach: [
        ...user.skillsToTeach,
        {
          id: Date.now().toString(),
          name: newSkill.name,
          category: newSkill.category,
          proficiency: newSkill.proficiency,
          verified: false,
        },
      ],
    };
    updateUser(updatedUser);
    setIsAddTeachSkillOpen(false);
    resetSkillForm();
    toast.success('Skill added successfully!');
  };

  const handleAddLearnSkill = () => {
    if (!newSkill.name || !newSkill.category) {
      toast.error('Please fill in all fields');
      return;
    }

    const updatedUser = {
      ...user,
      skillsToLearn: [
        ...user.skillsToLearn,
        {
          id: Date.now().toString(),
          name: newSkill.name,
          category: newSkill.category,
          proficiency: newSkill.proficiency,
          verified: false,
        },
      ],
    };
    updateUser(updatedUser);
    setIsAddLearnSkillOpen(false);
    resetSkillForm();
    toast.success('Skill added successfully!');
  };

  const handleRemoveTeachSkill = (skillId: string) => {
    const updatedUser = {
      ...user,
      skillsToTeach: user.skillsToTeach.filter(skill => skill.id !== skillId),
    };
    updateUser(updatedUser);
    toast.success('Skill removed successfully!');
  };

  const handleRemoveLearnSkill = (skillId: string) => {
    const updatedUser = {
      ...user,
      skillsToLearn: user.skillsToLearn.filter(skill => skill.id !== skillId),
    };
    updateUser(updatedUser);
    toast.success('Skill removed successfully!');
  };

  const handleUploadCertificate = () => {
    if (!newCertificate.skillName || !newCertificate.documentUrl || !newCertificate.institution) {
      toast.error('Please fill in all fields');
      return;
    }

    // Check if institution is trusted
    if (!trustedInstitutions.includes(newCertificate.institution)) {
      toast.error('Please select a trusted institution from the list');
      return;
    }

    const updatedUser = {
      ...user,
      certifications: [
        ...user.certifications,
        {
          id: Date.now().toString(),
          skillId: Date.now().toString(),
          skillName: newCertificate.skillName,
          documentUrl: newCertificate.documentUrl,
          uploadedDate: new Date().toISOString(),
          status: 'pending' as 'pending' | 'verified' | 'rejected',
          institution: newCertificate.institution,
        },
      ],
    };
    updateUser(updatedUser);
    setIsUploadCertOpen(false);
    setNewCertificate({
      skillName: '',
      documentUrl: '',
      institution: '',
    });
    toast.success(`Certificate from ${newCertificate.institution} uploaded successfully! Pending admin verification.`);
  };

  const handleSaveSocialLinks = () => {
    const updatedUser = {
      ...user,
      linkedinUrl,
      githubUrl,
    };
    updateUser(updatedUser);
    setEditingSocialLinks(false);
    toast.success('Social links saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>
          
          {/* Profile Info */}
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-6">
              <div className="flex items-end gap-4 mb-4 md:mb-0">
                {user.profilePicture ? (
                  <img 
                    src={user.profilePicture} 
                    alt={user.name}
                    className="w-32 h-32 rounded-full border-4 border-white object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full border-4 border-white bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                    {user.name.charAt(0)}
                  </div>
                )}
                <div className="mb-2">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {isOwnProfile && (
                <Button 
                  onClick={() => editing ? handleSave() : setEditing(true)}
                  className="flex items-center gap-2"
                >
                  {editing ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-4 h-4" />
                      Edit Profile
                    </>
                  )}
                </Button>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{user.credits}</div>
                <div className="text-sm text-gray-600">Credits</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{user.rating.toFixed(1)}</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{user.reviewCount}</div>
                <div className="text-sm text-gray-600">Reviews</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{user.badges.length}</div>
                <div className="text-sm text-gray-600">Badges</div>
              </div>
            </div>

            {/* Bio */}
            <div>
              {editing ? (
                <div>
                  <Label>Bio</Label>
                  <Textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                    className="mt-1"
                    rows={4}
                  />
                </div>
              ) : (
                <p className="text-gray-700">
                  {user.bio || 'No bio added yet.'}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Skills to Teach */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Skills I Can Teach</h2>
              {isOwnProfile && (
                <Button size="sm" variant="outline" onClick={() => setIsAddTeachSkillOpen(true)}>
                  <Upload className="w-4 h-4 mr-2" />
                  Add Skill
                </Button>
              )}
            </div>
            <div className="space-y-3">
              {user.skillsToTeach.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{skill.name}</span>
                      {skill.verified && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      {skill.proficiency} • {skill.category}
                    </div>
                  </div>
                  {isOwnProfile && (
                    <Button size="sm" variant="outline" onClick={() => handleRemoveTeachSkill(skill.id)}>
                      <XCircle className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              {user.skillsToTeach.length === 0 && (
                <p className="text-gray-500 text-center py-8">No skills added yet</p>
              )}
            </div>
          </div>

          {/* Skills to Learn */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Skills I Want to Learn</h2>
              {isOwnProfile && (
                <Button size="sm" variant="outline" onClick={() => setIsAddLearnSkillOpen(true)}>
                  Add Skill
                </Button>
              )}
            </div>
            <div className="space-y-3">
              {user.skillsToLearn.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                  <div>
                    <div className="font-medium">{skill.name}</div>
                    <div className="text-sm text-gray-600">
                      {skill.proficiency} • {skill.category}
                    </div>
                  </div>
                  {isOwnProfile && (
                    <Button size="sm" variant="outline" onClick={() => handleRemoveLearnSkill(skill.id)}>
                      <XCircle className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              {user.skillsToLearn.length === 0 && (
                <p className="text-gray-500 text-center py-8">No skills added yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Certifications</h2>
            {isOwnProfile && (
              <Button size="sm" variant="outline" onClick={() => setIsUploadCertOpen(true)}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Certificate
              </Button>
            )}
          </div>
          <div className="space-y-3">
            {user.certifications.map((cert) => (
              <div key={cert.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="font-medium">{cert.skillName}</div>
                    <div className="text-sm text-gray-600">
                      {cert.institution && <span>{cert.institution} • </span>}
                      Uploaded {new Date(cert.uploadedDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div>
                  {cert.status === 'verified' && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      Verified
                    </span>
                  )}
                  {cert.status === 'pending' && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                      Pending
                    </span>
                  )}
                  {cert.status === 'rejected' && (
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                      Rejected
                    </span>
                  )}
                </div>
              </div>
            ))}
            {user.certifications.length === 0 && (
              <p className="text-gray-500 text-center py-8">No certifications uploaded yet</p>
            )}
          </div>
        </div>

        {/* Badges */}
        {user.badges.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">Badges & Achievements</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {user.badges.map((badge) => (
                <div key={badge.id} className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200">
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <div className="font-medium mb-1">{badge.name}</div>
                  <div className="text-xs text-gray-600">{badge.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Professional Links */}
        {isOwnProfile && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Professional Links</h2>
              {!editingSocialLinks && (
                <Button size="sm" variant="outline" onClick={() => setEditingSocialLinks(true)}>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Links
                </Button>
              )}
            </div>
            {editingSocialLinks ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl">
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn URL
                    </div>
                  </Label>
                  <Input
                    id="linkedinUrl"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="githubUrl">
                    <div className="flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      GitHub URL
                    </div>
                  </Label>
                  <Input
                    id="githubUrl"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/yourusername"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveSocialLinks} className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Links
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setEditingSocialLinks(false);
                      setLinkedinUrl(user?.linkedinUrl || '');
                      setGithubUrl(user?.githubUrl || '');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {user.linkedinUrl ? (
                  <a
                    href={user.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium">LinkedIn</div>
                      <div className="text-sm text-gray-600">{user.linkedinUrl}</div>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-gray-50">
                    <Linkedin className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-gray-600">No LinkedIn profile connected</div>
                    </div>
                  </div>
                )}
                {user.githubUrl ? (
                  <a
                    href={user.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <Github className="w-5 h-5 text-gray-800" />
                    <div>
                      <div className="font-medium">GitHub</div>
                      <div className="text-sm text-gray-600">{user.githubUrl}</div>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-gray-50">
                    <Github className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-gray-600">No GitHub profile connected</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Teach Skill Dialog */}
      <Dialog open={isAddTeachSkillOpen} onOpenChange={setIsAddTeachSkillOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Skill to Teach</DialogTitle>
            <DialogDescription>
              Add a new skill that you can teach to others.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Skill Name</Label>
              <Input
                id="name"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                placeholder="e.g. JavaScript"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={newSkill.category}
                onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                placeholder="e.g. Programming"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="proficiency">Proficiency Level</Label>
              <Select
                value={newSkill.proficiency}
                onValueChange={(value) => setNewSkill({ ...newSkill, proficiency: value as 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select proficiency level">{newSkill.proficiency}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddTeachSkillOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAddTeachSkill}
            >
              Add Skill
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Learn Skill Dialog */}
      <Dialog open={isAddLearnSkillOpen} onOpenChange={setIsAddLearnSkillOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Skill to Learn</DialogTitle>
            <DialogDescription>
              Add a new skill that you want to learn.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Skill Name</Label>
              <Input
                id="name"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                placeholder="e.g. JavaScript"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={newSkill.category}
                onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                placeholder="e.g. Programming"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="proficiency">Proficiency Level</Label>
              <Select
                value={newSkill.proficiency}
                onValueChange={(value) => setNewSkill({ ...newSkill, proficiency: value as 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select proficiency level">{newSkill.proficiency}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddLearnSkillOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAddLearnSkill}
            >
              Add Skill
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Certificate Dialog */}
      <Dialog open={isUploadCertOpen} onOpenChange={setIsUploadCertOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload Certificate</DialogTitle>
            <DialogDescription>
              Upload a new certificate to verify your skills.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="skillName">Skill Name</Label>
              <Input
                id="skillName"
                value={newCertificate.skillName}
                onChange={(e) => setNewCertificate({ ...newCertificate, skillName: e.target.value })}
                placeholder="e.g. JavaScript"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="documentUrl">Document URL</Label>
              <Input
                id="documentUrl"
                value={newCertificate.documentUrl}
                onChange={(e) => setNewCertificate({ ...newCertificate, documentUrl: e.target.value })}
                placeholder="e.g. https://example.com/certificate.pdf"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="institution">Institution</Label>
              <Select
                value={newCertificate.institution}
                onValueChange={(value) => setNewCertificate({ ...newCertificate, institution: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select institution">{newCertificate.institution}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {trustedInstitutions.map((institution) => (
                    <SelectItem key={institution} value={institution}>{institution}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsUploadCertOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleUploadCertificate}
            >
              Upload Certificate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}