import { useState } from 'react';
import { Link } from 'react-router';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Search, Filter, Users } from 'lucide-react';
import { getMockData } from '../lib/mockData';

export function SkillBrowsePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const mockData = getMockData();

  const categories = [
    'All',
    'Programming',
    'Design',
    'Languages',
    'Marketing',
    'Music',
    'Photography',
    'Business',
    'Data Science',
  ];

  const filteredSkills = mockData.skills.filter((skill) => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Browse Skills</h1>
          <p className="text-gray-600">Discover skills you can learn from our community</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          Found {filteredSkills.length} skill{filteredSkills.length !== 1 ? 's' : ''}
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{skill.name}</h3>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {skill.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <Users className="w-4 h-4" />
                <span className="text-sm">{skill.count} teachers available</span>
              </div>

              <Link to="/partners">
                <Button className="w-full">Find Teachers</Button>
              </Link>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No skills found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
