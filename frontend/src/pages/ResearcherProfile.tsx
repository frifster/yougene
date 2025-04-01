import React from 'react';

interface UserStats {
  totalMonsters: number;
  uniqueTypes: number;
  averageLevel: number;
  battlesWon: number;
  battlesLost: number;
  totalCredits: number;
  fusionSuccessRate: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  progress: number;
  maxProgress: number;
  completed: boolean;
}

const ResearcherProfile: React.FC = () => {
  // This will be replaced with actual Redux state
  const userStats: UserStats = {
    totalMonsters: 12,
    uniqueTypes: 4,
    averageLevel: 7.5,
    battlesWon: 45,
    battlesLost: 12,
    totalCredits: 15000,
    fusionSuccessRate: 75,
  };

  const achievements: Achievement[] = [
    {
      id: '1',
      name: 'Monster Collector',
      description: 'Collect 10 unique monsters',
      progress: 8,
      maxProgress: 10,
      completed: false,
    },
    {
      id: '2',
      name: 'Master Geneticist',
      description: 'Successfully fuse 5 monsters',
      progress: 3,
      maxProgress: 5,
      completed: false,
    },
    {
      id: '3',
      name: 'Battle Champion',
      description: 'Win 50 battles',
      progress: 45,
      maxProgress: 50,
      completed: false,
    },
    {
      id: '4',
      name: 'Type Explorer',
      description: 'Discover monsters of all types',
      progress: 4,
      maxProgress: 5,
      completed: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-text p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Researcher Profile</h1>

        {/* Profile Header */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">👤</span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Dr. Researcher</h2>
              <p className="text-gray-400">Level 15 Geneticist</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Collection Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Monsters:</span>
                <span>{userStats.totalMonsters}</span>
              </div>
              <div className="flex justify-between">
                <span>Unique Types:</span>
                <span>{userStats.uniqueTypes}</span>
              </div>
              <div className="flex justify-between">
                <span>Average Level:</span>
                <span>{userStats.averageLevel}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Battle Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Battles Won:</span>
                <span>{userStats.battlesWon}</span>
              </div>
              <div className="flex justify-between">
                <span>Battles Lost:</span>
                <span>{userStats.battlesLost}</span>
              </div>
              <div className="flex justify-between">
                <span>Win Rate:</span>
                <span>
                  {Math.round(
                    (userStats.battlesWon / (userStats.battlesWon + userStats.battlesLost)) * 100
                  )}
                  %
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Progress Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Credits:</span>
                <span className="text-accent">{userStats.totalCredits}</span>
              </div>
              <div className="flex justify-between">
                <span>Fusion Success Rate:</span>
                <span>{userStats.fusionSuccessRate}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map(achievement => (
              <div key={achievement.id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{achievement.name}</h3>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      achievement.completed
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gray-600 text-gray-400'
                    }`}
                  >
                    {achievement.completed ? 'Completed' : 'In Progress'}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-3">{achievement.description}</p>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{
                      width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>{achievement.progress}</span>
                  <span>{achievement.maxProgress}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearcherProfile;
