import { motion } from 'framer-motion';
import React from 'react';
import { Monster } from '../../store/slices/monsterSlice';

interface MonsterViewerProps {
  monster: Monster;
  onClose?: () => void;
  className?: string;
}

const MonsterViewer: React.FC<MonsterViewerProps> = ({
  monster,
  onClose,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`bg-gray-800 rounded-lg p-6 ${className}`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">{monster.name}</h2>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-primary/20 rounded-full text-sm font-medium">
              {monster.type}
            </span>
            <span className="text-text/60">Level {monster.level}</span>
            <span className="text-text/60">•</span>
            <span className="text-text/60">Genetic Stability: {monster.geneticStability}%</span>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg
              className="w-6 h-6 text-text/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - 3D Model & Basic Info */}
        <div className="space-y-6">
          {/* 3D Model Preview */}
          <div className="aspect-square bg-gray-700 rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-text/40">3D Model Preview Coming Soon</span>
            </div>
          </div>

          {/* Abilities */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Abilities</h3>
            <div className="flex flex-wrap gap-2">
              {monster.abilities.map(ability => (
                <span
                  key={ability}
                  className="px-3 py-1 bg-secondary/20 rounded-full text-sm"
                >
                  {ability}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Stats & Genetics */}
        <div className="space-y-6">
          {/* Stats */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Stats</h3>
            <div className="space-y-4">
              {Object.entries(monster.stats).map(([stat, value]) => (
                <div key={stat} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm capitalize text-text/80">{stat}</span>
                    <span className="text-sm font-medium">{value}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${(value / 100) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Genetic Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Genetic Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <div className="text-sm text-text/60 mb-1">Dominant Genes</div>
                  <div className="font-medium">{monster.dominantGenes.join(', ')}</div>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <div className="text-sm text-text/60 mb-1">Recessive Genes</div>
                  <div className="font-medium">{monster.recessiveGenes.join(', ')}</div>
                </div>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <div className="text-sm text-text/60 mb-1">Mutation Rate</div>
                <div className="font-medium">{monster.mutationRate}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MonsterViewer; 