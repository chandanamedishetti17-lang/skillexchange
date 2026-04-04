import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Download, Sparkles, Eye, Edit2, Save, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    portfolio: string;
    linkedin: string;
    github: string;
  };
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
}

export function ResumeBuilderPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const resumeRef = useRef<HTMLDivElement>(null);

  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      location: '',
      portfolio: '',
      linkedin: user?.linkedinUrl || '',
      github: user?.githubUrl || '',
    },
    summary: '',
    experience: [],
    education: [],
  });

  if (!isAuthenticated || !user) {
    navigate('/login');
    return null;
  }

  const toggleSkill = (skillName: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skillName)
        ? prev.filter((s) => s !== skillName)
        : [...prev, skillName]
    );
  };

  const generateAIResume = () => {
    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const selectedSkillsList = selectedSkills.length > 0 ? selectedSkills : user.skillsToTeach.map(s => s.name);
      
      // Generate AI-powered professional summary
      const summary = `Experienced professional with ${user.skillsToTeach.length}+ verified skills and a ${user.rating.toFixed(1)}-star rating on the Skill Exchange platform. Proven track record of successfully completing ${user.reviewCount} skill exchange sessions, demonstrating strong collaborative and teaching abilities. Specializing in ${selectedSkillsList.slice(0, 3).join(', ')}, with a passion for continuous learning and knowledge sharing. Currently expanding expertise in ${user.skillsToLearn.slice(0, 2).map(s => s.name).join(' and ')}.`;

      // Generate experience based on skill exchanges
      const experience = [
        {
          title: 'Skill Exchange Instructor',
          company: 'SkillExchange Platform',
          duration: `${new Date(user.joinedDate).toLocaleDateString()} - Present`,
          description: `• Successfully taught ${selectedSkillsList.slice(0, 3).join(', ')} to ${user.reviewCount} learners\n• Maintained a ${user.rating.toFixed(1)}/5.0 rating through high-quality instruction and mentorship\n• Earned ${user.credits} credits through peer-to-peer skill sharing\n• Achieved ${user.badges.length} platform badges for exceptional performance`,
        },
      ];

      // Add skill-specific experience
      user.skillsToTeach.filter(skill => selectedSkillsList.includes(skill.name)).forEach((skill, index) => {
        if (index < 2) {
          experience.push({
            title: `${skill.proficiency} ${skill.name} Specialist`,
            company: 'Freelance / Skill Exchange',
            duration: 'Recent Projects',
            description: `• Applied ${skill.name} expertise at ${skill.proficiency.toLowerCase()} level\n• Completed multiple successful skill exchange sessions\n• Mentored learners in ${skill.category} domain\n• Developed practical projects demonstrating proficiency`,
          });
        }
      });

      // Generate education from certifications
      const education = user.certifications
        .filter(cert => cert.status === 'verified')
        .map(cert => ({
          degree: cert.skillName + ' Certification',
          institution: cert.institution || 'Professional Institution',
          year: new Date(cert.uploadedDate).getFullYear().toString(),
        }));

      // Add generic education if no certifications
      if (education.length === 0) {
        education.push({
          degree: 'Continuous Learning & Skill Development',
          institution: 'SkillExchange Platform',
          year: new Date(user.joinedDate).getFullYear().toString(),
        });
      }

      setResumeData({
        personalInfo: {
          ...resumeData.personalInfo,
          name: user.name,
          email: user.email,
          linkedin: user.linkedinUrl || resumeData.personalInfo.linkedin,
          github: user.githubUrl || resumeData.personalInfo.github,
        },
        summary,
        experience,
        education,
      });

      setIsGenerating(false);
      toast.success('Resume generated successfully!');
    }, 2000);
  };

  const handleDownloadResume = () => {
    // In a real app, this would generate a PDF
    toast.success('Resume download started! (Feature in development)');
  };

  const allSkills = [...user.skillsToTeach];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Resume Builder</h1>
              <p className="text-gray-600">
                Generate a professional resume powered by AI based on your skills and achievements
              </p>
            </div>
            <FileText className="w-12 h-12 text-indigo-600" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Skills Selection */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Select Skills to Highlight</h2>
              <p className="text-sm text-gray-600 mb-4">
                Choose the skills you want to emphasize in your resume
              </p>
              
              <div className="space-y-2 mb-6">
                {allSkills.map((skill) => (
                  <label
                    key={skill.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-indigo-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSkills.includes(skill.name)}
                      onChange={() => toggleSkill(skill.name)}
                      className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{skill.name}</div>
                      <div className="text-xs text-gray-500">{skill.proficiency}</div>
                    </div>
                  </label>
                ))}
              </div>

              <Button
                onClick={generateAIResume}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Generating Resume...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate AI Resume
                  </>
                )}
              </Button>
            </div>

            {/* Additional Info */}
            {isEditing && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={resumeData.personalInfo.phone}
                      onChange={(e) =>
                        setResumeData({
                          ...resumeData,
                          personalInfo: { ...resumeData.personalInfo, phone: e.target.value },
                        })
                      }
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={resumeData.personalInfo.location}
                      onChange={(e) =>
                        setResumeData({
                          ...resumeData,
                          personalInfo: { ...resumeData.personalInfo, location: e.target.value },
                        })
                      }
                      placeholder="City, Country"
                    />
                  </div>
                  <div>
                    <Label htmlFor="portfolio">Portfolio URL</Label>
                    <Input
                      id="portfolio"
                      value={resumeData.personalInfo.portfolio}
                      onChange={(e) =>
                        setResumeData({
                          ...resumeData,
                          personalInfo: { ...resumeData.personalInfo, portfolio: e.target.value },
                        })
                      }
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                  <Button
                    onClick={() => {
                      setIsEditing(false);
                      toast.success('Changes saved!');
                    }}
                    size="sm"
                    className="w-full"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Resume Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Resume Preview</h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    {isEditing ? 'View Mode' : 'Edit Mode'}
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleDownloadResume}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>

              {/* Resume Content */}
              <div
                ref={resumeRef}
                className="bg-white border-2 border-gray-200 rounded-lg p-8 space-y-6"
                style={{ minHeight: '1056px' }} // A4 aspect ratio
              >
                {/* Header */}
                <div className="border-b-2 border-indigo-600 pb-4">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {resumeData.personalInfo.name}
                  </h1>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span>{resumeData.personalInfo.email}</span>
                    {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
                    {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-indigo-600 mt-2">
                    {resumeData.personalInfo.linkedin && (
                      <a href={resumeData.personalInfo.linkedin} className="hover:underline">
                        LinkedIn
                      </a>
                    )}
                    {resumeData.personalInfo.github && (
                      <a href={resumeData.personalInfo.github} className="hover:underline">
                        GitHub
                      </a>
                    )}
                    {resumeData.personalInfo.portfolio && (
                      <a href={resumeData.personalInfo.portfolio} className="hover:underline">
                        Portfolio
                      </a>
                    )}
                  </div>
                </div>

                {/* Professional Summary */}
                {resumeData.summary && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
                      Professional Summary
                    </h2>
                    {isEditing ? (
                      <Textarea
                        value={resumeData.summary}
                        onChange={(e) =>
                          setResumeData({ ...resumeData, summary: e.target.value })
                        }
                        rows={4}
                        className="w-full"
                      />
                    ) : (
                      <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
                    )}
                  </div>
                )}

                {/* Skills */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
                    Core Competencies
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {(selectedSkills.length > 0 ? selectedSkills : user.skillsToTeach.map(s => s.name)).map((skillName) => {
                      const skill = user.skillsToTeach.find(s => s.name === skillName);
                      return (
                        <div
                          key={skillName}
                          className="px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium"
                        >
                          {skillName} {skill && `(${skill.proficiency})`}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Experience */}
                {resumeData.experience.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
                      Professional Experience
                    </h2>
                    <div className="space-y-4">
                      {resumeData.experience.map((exp, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                            <span className="text-sm text-gray-600">{exp.duration}</span>
                          </div>
                          <p className="text-indigo-600 font-medium mb-2">{exp.company}</p>
                          {isEditing ? (
                            <Textarea
                              value={exp.description}
                              onChange={(e) => {
                                const newExperience = [...resumeData.experience];
                                newExperience[index].description = e.target.value;
                                setResumeData({ ...resumeData, experience: newExperience });
                              }}
                              rows={3}
                              className="w-full"
                            />
                          ) : (
                            <p className="text-gray-700 whitespace-pre-line text-sm">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications */}
                {user.certifications.filter(cert => cert.status === 'verified').length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
                      Certifications
                    </h2>
                    <div className="space-y-2">
                      {user.certifications
                        .filter(cert => cert.status === 'verified')
                        .map((cert) => (
                          <div key={cert.id} className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-gray-900">{cert.skillName}</h3>
                              <p className="text-sm text-gray-600">{cert.institution}</p>
                            </div>
                            <span className="text-sm text-gray-600">
                              {new Date(cert.uploadedDate).getFullYear()}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {resumeData.education.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
                      Education & Training
                    </h2>
                    <div className="space-y-3">
                      {resumeData.education.map((edu, index) => (
                        <div key={index} className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                            <p className="text-sm text-gray-600">{edu.institution}</p>
                          </div>
                          <span className="text-sm text-gray-600">{edu.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {user.badges.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
                      Achievements & Recognition
                    </h2>
                    <div className="space-y-2">
                      {user.badges.map((badge) => (
                        <div key={badge.id} className="flex items-start gap-3">
                          <span className="text-2xl">{badge.icon}</span>
                          <div>
                            <h3 className="font-semibold text-gray-900">{badge.name}</h3>
                            <p className="text-sm text-gray-600">{badge.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
