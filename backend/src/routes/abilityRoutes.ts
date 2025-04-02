 
import { Router } from 'express';
import { AbilityController } from '../controllers/abilityController.js';

const router = Router();
const abilityController = new AbilityController();

// Get all available abilities for a monster
router.get(
  '/monster/:monsterId/abilities',
  abilityController.getAvailableAbilities.bind(abilityController)
);

// Use an ability
router.post(
  '/monster/:monsterId/ability/:abilityId/use',
  abilityController.useAbility.bind(abilityController)
);

// Get cooldown remaining for an ability
router.get(
  '/monster/:monsterId/ability/:abilityId/cooldown',
  abilityController.getAbilityCooldown.bind(abilityController)
);

// Regenerate energy for a monster
router.post(
  '/monster/:monsterId/energy/regenerate',
  abilityController.regenerateEnergy.bind(abilityController)
);

// Get active status effects for a monster
router.get(
  '/monster/:monsterId/status-effects',
  abilityController.getActiveStatusEffects.bind(abilityController)
);

export default router;