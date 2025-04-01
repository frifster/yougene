import React, { useState } from 'react';
import { Monster } from '../../store/slices/monsterSlice';
import MonsterCard from './MonsterCard';

interface MonsterGridProps {
  monsters: Monster[];
  onMonsterClick?: (monster: Monster) => void;
  showStats?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const MonsterGrid: React.FC<MonsterGridProps> = ({
  monsters,
  onMonsterClick,
  showStats = true,
  size = 'md',
  className = '',
}) => {
  const [sortBy, setSortBy] = useState<'level' | 'name' | 'type'>('level');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique monster types for filter
  const monsterTypes = Array.from(new Set(monsters.map(m => m.type)));

  // Filter and sort monsters
  const filteredMonsters = monsters
    .filter(monster => {
      const matchesType = filterType === 'all' || monster.type === filterType;
      const matchesSearch =
        monster.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        monster.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'level':
          return b.level - a.level;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'type':
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search */}
        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Search monsters..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="px-4 py-2 pr-8 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.5em_1.5em] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%239CA3AF%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M10%203a1%201%200%2001.707.293l3%203a1%201%200%2001-1.414%201.414L10%205.414%207.707%207.707a1%201%200%2001-1.414-1.414l3-3A1%201%200%200110%203zm-3.707%209.293a1%201%200%20011.414%200L10%2014.586l2.293-2.293a1%201%200%20011.414%201.414l-3%203a1%201%200%2001-1.414%200l-3-3a1%201%200%20010-1.414z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')]"
          >
            <option value="all">All Types</option>
            {monsterTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'level' | 'name' | 'type')}
            className="px-4 py-2 pr-8 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.5em_1.5em] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%239CA3AF%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M10%203a1%201%200%2001.707.293l3%203a1%201%200%2001-1.414%201.414L10%205.414%207.707%207.707a1%201%200%2001-1.414-1.414l3-3A1%201%200%200110%203zm-3.707%209.293a1%201%200%20011.414%200L10%2014.586l2.293-2.293a1%201%200%20011.414%201.414l-3%203a1%201%200%2001-1.414%200l-3-3a1%201%200%20010-1.414z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')]"
          >
            <option value="level">Sort by Level</option>
            <option value="name">Sort by Name</option>
            <option value="type">Sort by Type</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMonsters.map(monster => (
          <MonsterCard
            key={monster.id}
            monster={monster}
            onClick={onMonsterClick}
            showStats={showStats}
            size={size}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredMonsters.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text/60 text-lg">No monsters found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default MonsterGrid;
