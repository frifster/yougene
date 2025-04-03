import { IAbility } from '../models/Ability.js';
import { BattleState, Character } from '../models/battle.js';

interface AIDecision {
  action: 'move' | 'ability' | 'basic_attack';
  targetId?: string;
  abilityId?: string;
  position?: { x: number; y: number };
}

export class AIService {
  private readonly MAX_DECISION_TIME = 1000; // 1 second max for AI decision
  private readonly SAFE_DISTANCE = 3; // Minimum distance to maintain from opponent
  private readonly AGGRESSION_THRESHOLD = 0.7; // Health percentage below which AI becomes more aggressive

  makeDecision(battle: BattleState, aiCharacter: Character): AIDecision {
    const startTime = Date.now();
    const opponent = aiCharacter.id === battle.player1.id ? battle.player2 : battle.player1;
    
    // Basic state evaluation
    const aiHealthPercent = aiCharacter.health / aiCharacter.maxHealth;
    const opponentHealthPercent = opponent.health / opponent.maxHealth;
    const distance = this.calculateDistance(aiCharacter.position, opponent.position);
    
    // Emergency healing if health is low
    if (aiHealthPercent < 0.3) {
      const healAbility = this.findBestHealingAbility(aiCharacter);
      if (healAbility && aiCharacter.energy >= healAbility.energyCost) {
        return {
          action: 'ability',
          abilityId: healAbility.id,
          targetId: aiCharacter.id
        };
      }
    }

    // Aggressive behavior when opponent is weak
    if (opponentHealthPercent < this.AGGRESSION_THRESHOLD) {
      const bestDamageAbility = this.findBestDamageAbility(aiCharacter);
      if (bestDamageAbility && aiCharacter.energy >= bestDamageAbility.energyCost) {
        return {
          action: 'ability',
          abilityId: bestDamageAbility.id,
          targetId: opponent.id
        };
      }
    }

    // Position management
    if (distance < this.SAFE_DISTANCE) {
      const safePosition = this.calculateSafePosition(aiCharacter, opponent, battle.battlefield);
      if (safePosition) {
        return {
          action: 'move',
          position: safePosition
        };
      }
    }

    // Check if we're approaching the time limit
    if (Date.now() - startTime >= this.MAX_DECISION_TIME) {
      // If we're running out of time, default to basic attack
      return {
        action: 'basic_attack',
        targetId: opponent.id
      };
    }

    // Default to basic attack if no better options
    return {
      action: 'basic_attack',
      targetId: opponent.id
    };
  }

  private calculateDistance(pos1: { x: number; y: number }, pos2: { x: number; y: number }): number {
    return Math.sqrt(
      Math.pow(pos1.x - pos2.x, 2) +
      Math.pow(pos1.y - pos2.y, 2)
    );
  }

  private findBestHealingAbility(character: Character): IAbility | undefined {
    return character.abilities
      .filter(ability => ability.type === 'heal')
      .sort((a, b) => b.power - a.power)[0];
  }

  private findBestDamageAbility(character: Character): IAbility | undefined {
    return character.abilities
      .filter(ability => ability.type === 'damage')
      .sort((a, b) => b.power - a.power)[0];
  }

  private calculateSafePosition(
    character: Character,
    opponent: Character,
    battlefield: { width: number; height: number; obstacles: Array<{ x: number; y: number; width: number; height: number }> }
  ): { x: number; y: number } | null {
    const currentDistance = this.calculateDistance(character.position, opponent.position);
    const desiredDistance = Math.max(this.SAFE_DISTANCE, currentDistance + 1);
    
    // Calculate potential positions in a circle around the current position
    const positions = this.generatePositions(character.position, desiredDistance);
    
    // Filter out positions that are outside battlefield bounds
    const validPositions = positions.filter(pos => 
      pos.x >= 0 && pos.x <= battlefield.width &&
      pos.y >= 0 && pos.y <= battlefield.height &&
      !this.isPositionOccupied(pos, battlefield.obstacles)
    );

    if (validPositions.length === 0) return null;

    // Choose the position that maximizes distance from opponent
    return validPositions.reduce((best, current) => {
      const bestDistance = this.calculateDistance(best, opponent.position);
      const currentDistance = this.calculateDistance(current, opponent.position);
      return currentDistance > bestDistance ? current : best;
    });
  }

  private generatePositions(center: { x: number; y: number }, radius: number): Array<{ x: number; y: number }> {
    const positions: Array<{ x: number; y: number }> = [];
    const steps = 8; // Number of positions to generate in the circle
    
    for (let i = 0; i < steps; i++) {
      const angle = (i / steps) * 2 * Math.PI;
      positions.push({
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle)
      });
    }
    
    return positions;
  }

  private isPositionOccupied(
    position: { x: number; y: number },
    obstacles: Array<{ x: number; y: number; width: number; height: number }>
  ): boolean {
    return obstacles.some(obstacle => {
      // Check if position is within the rectangle obstacle
      return position.x >= obstacle.x &&
             position.x <= obstacle.x + obstacle.width &&
             position.y >= obstacle.y &&
             position.y <= obstacle.y + obstacle.height;
    });
  }
} 