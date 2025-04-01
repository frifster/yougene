import React from 'react';
import { Monster } from '../../store/slices/monsterSlice';

interface MonsterCardProps {
  monster: Monster;
  onClick?: (monster: Monster) => void;
  showStats?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'p-4 text-sm',
  md: 'p-6 text-base',
  lg: 'p-8 text-lg',
};

const MonsterCard: React.FC<MonsterCardProps> = ({
  monster,
  onClick,
  showStats = true,
  size = 'md',
  className = '',
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(monster);
    }
  };

  return (
    <div
      className={`
        bg-gray-800 rounded-lg transition-all duration-300
        ${onClick ? 'cursor-pointer hover:bg-gray-700 hover:shadow-lg hover:shadow-primary/20' : ''}
        ${sizeClasses[size]}
        ${className}
      `}
      onClick={handleClick}
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick ? 0 : -1}
      onKeyDown={e => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="font-semibold text-xl mb-1">{monster.name}</h2>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-primary/20 rounded text-sm">{monster.type}</span>
            <span className="text-text/60">Lvl {monster.level}</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-sm text-text/60">Stability</div>
          <div className="text-lg font-semibold">{monster.geneticStability}%</div>
        </div>
      </div>

      {/* Abilities */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-text/60 mb-2">Abilities</h3>
        <div className="flex flex-wrap gap-2">
          {monster.abilities.map(ability => (
            <span key={ability} className="px-2 py-1 bg-secondary/20 rounded text-sm">
              {ability}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      {showStats && (
        <div>
          <h3 className="text-sm font-medium text-text/60 mb-3">Stats</h3>
          <div className="space-y-3">
            {Object.entries(monster.stats).map(([stat, value]) => (
              <div key={stat} className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm capitalize text-text/80">{stat}</span>
                  <span className="text-sm font-medium">{value}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${(value / 100) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MonsterCard;
