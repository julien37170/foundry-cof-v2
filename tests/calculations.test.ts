import { describe, it, expect } from 'vitest';
import { computeDefense, computeInitiative, computeMeleeDamage, computeRangedDamage } from '../systems/cof-v2/src/module/core/calculations';

describe('COF V2 calculation functions', () => {
  it('computes defence correctly', () => {
    expect(computeDefense(10, 2, 1, 3)).toBe(16);
  });
  it('returns initiative bonus equal to perception modifier', () => {
    expect(computeInitiative(4)).toBe(4);
  });
  it('adds strength mod for melee damage', () => {
    expect(computeMeleeDamage(2)).toBe(2);
  });
  it('adds agility mod for ranged damage', () => {
    expect(computeRangedDamage(3)).toBe(3);
  });
});
