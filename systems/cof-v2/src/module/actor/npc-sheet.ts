/**
 * Simple NPC sheet which reuses the character sheet implementation. NPCs
 * typically have the same fields as characters in COF V2, so we extend
 * Cofv2CharacterSheet and only change the CSS classes and label.
 */
import { Cofv2CharacterSheet } from './character-sheet';

export class Cofv2NpcSheet extends Cofv2CharacterSheet {
  static get defaultOptions() {
    const options = super.defaultOptions;
    options.classes = ['cofv2', 'sheet', 'actor', 'npc'];
    options.template = 'systems/cof-v2/templates/actor/npc-sheet.hbs';
    return options;
  }
}
