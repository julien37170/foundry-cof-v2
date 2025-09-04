/**
 * Core calculation functions for COF V2. These pure functions implement
 * mechanics such as defence totals, attack modifiers and resource costs. They
 * are written without references to Foundry API so that they can be easily
 * tested with Vitest.
 */

/**
 * Compute the total defence value.
 *
 * @param base Base defence, typically 10
 * @param armor Bonus from armour
 * @param shield Bonus from shield
 * @param misc Miscellaneous bonuses
 * @returns The summed defence value
 */
export function computeDefense(base: number, armor: number, shield: number, misc: number): number {
  return base + armor + shield + misc;
}

/**
 * Compute initiative formula result. PER modifier is passed in; the roll itself
 * should be performed via Foundry's Roll API.
 *
 * @param perceptionMod The modifier from the PER attribute
 * @returns The initiative bonus (to add to a 1d20 roll)
 */
export function computeInitiative(perceptionMod: number): number {
  return perceptionMod;
}

/**
 * Compute melee damage modifier. COF V2 typically adds the FOR modifier to
 * melee weapon dice.
 *
 * @param strengthMod Modifier from FOR attribute
 * @returns The damage bonus
 */
export function computeMeleeDamage(strengthMod: number): number {
  return strengthMod;
}

/**
 * Compute ranged damage modifier. COF V2 typically adds the AGI modifier to
 * ranged weapon dice.
 *
 * @param agilityMod Modifier from AGI attribute
 * @returns The damage bonus
 */
export function computeRangedDamage(agilityMod: number): number {
  return agilityMod;
}
