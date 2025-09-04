/**
 * Entry point for the COF V2 system. This file registers the custom actor and
 * item sheets and sets up any system‑level hooks. It is built with Vite and
 * compiled into `dist/cofv2.js` which is referenced by the system manifest.
 */

import { Cofv2CharacterSheet } from './actor/character-sheet';
import { Cofv2NpcSheet } from './actor/npc-sheet';
import { Cofv2ItemSheet } from './item/item-sheet';

/**
 * Initialise the system. Register custom sheets and perform any
 * configuration required before Foundry boots the UI.
 */
Hooks.once('init', async () => {
  console.log('COF V2 | Initialising system');

  // Register actor sheets. Unregister the core sheets to avoid conflicts.
  Actors.unregisterSheet('core', ActorSheet as any);
  Actors.registerSheet('cof-v2', Cofv2CharacterSheet, {
    types: ['character'],
    makeDefault: true,
    label: 'COF V2 Personnage'
  });
  Actors.registerSheet('cof-v2', Cofv2NpcSheet, {
    types: ['npc'],
    makeDefault: true,
    label: 'COF V2 PNJ'
  });

  // Register item sheet.
  Items.unregisterSheet('core', ItemSheet as any);
  Items.registerSheet('cof-v2', Cofv2ItemSheet, {
    makeDefault: true,
    label: 'COF V2 Objet'
  });
});

/**
 * Ready hook. Called once the game is ready and canvas has loaded. Use this to
 * perform post‑initialisation tasks such as setting up socket listeners.
 */
Hooks.once('ready', () => {
  console.log('COF V2 | System ready');
});
