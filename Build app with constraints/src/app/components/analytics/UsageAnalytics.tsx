import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Activity, Video, MessageSquare, FileText, Users, Award } from 'lucide-react';

interface UsageData {
  name: string;
  value: number;
  color: string;
  icon: JSX.Element;
}

export function UsageAnalytics() {
  const usageData: UsageData[] = [
    { 
      name: 'Video Calls', 
      value: 35, 
      color: '#6366f1', // Indigo
      icon: <Video className="w-4 h-4" />
    },
    { 
      name: 'Skill Browsing', 
      value: 25, 
      color: '#8b5cf6', // Purple
      icon: <Activity className="w-4 h-4" />
    },
    { 
      name: 'Chat Messages', 
      value: 20, 
      color: '#3b82f6', // Blue
      icon: <MessageSquare className="w-4 h-4" />
    },
    { 
      name: 'Partner Discovery', 
      value: 12, 
      color: '#06b6d4', // Cyan
      icon: <Users className="w-4 h-4" />
    },
    { 
      name: 'Resume Building', 
      value: 5, 
      color: '#10b981', // Green
      icon: <FileText className="w-4 h-4" />
    },
    { 
      name: 'Certifications', 
      value: 3, 
      color: '#f59e0b', // Amber
      icon: <Award className="w-4 h-4" />
    },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{payload[0].name}</p>
          <p className="text-sm text-gray-600">{payload[0].value}% of total usage</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = (entry: any) => {
    return `${entry.value}%`;
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-semibold">Platform Usage Analytics</h2>
        </div>
        <p className="text-sm text-gray-600">Priority access insights for active users</p>
      </div>

      {/* Pie Chart */}
      <div className="mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={usageData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {usageData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend with Icons */}
      <div className="grid grid-cols-2 gap-3">
        {usageData.map((item, index) => (
          <div key={index} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div 
              className="w-4 h-4 rounded-full flex-shrink-0" 
              style={{ backgroundColor: item.color }}
            />
            <div className="flex items-center gap-1 flex-1 min-w-0">
              <span className="text-gray-700" style={{ color: item.color }}>
                {item.icon}
              </span>
              <span className="text-sm text-gray-700 truncate">{item.name}</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
          </div>
        ))}
      </div>

      {/* Priority User Badge */}
      <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-semibold text-indigo-900">Priority User Status: Active</span>
        </div>
        <p className="text-xs text-indigo-700">
          You have priority access to all features including video calls, AI matching, and instant support
        </p>
      </div>
    </div>
  );
}
