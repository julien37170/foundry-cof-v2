/**
 * Macro: attack
 *
 * This macro performs a basic melee or ranged attack. It uses the actor's
 * attack values (va and damage formula) defined in the system data. The
 * target's defence value is taken from the targeted token. Results are
 * displayed in chat but no automatic damage is applied.
 */
(async () => {
  const actor = canvas.tokens.controlled[0]?.actor;
  if (!actor) {
    return ui.notifications.warn("Sélectionnez un token pour attaquer.");
  }
  const targetToken = Array.from(game.user.targets)[0];
  if (!targetToken) {
    return ui.notifications.warn("Ciblez un token à attaquer.");
  }
  const target = targetToken.actor;
  // Choose melee or ranged
  const attackType = await new Promise(resolve => {
    new Dialog({
      title: "Type d'attaque",
      content: `<p>Choisissez le type d'attaque :</p>`,
      buttons: {
        melee: {
          label: "Mêlée",
          callback: () => resolve('melee')
        },
        ranged: {
          label: "Distance",
          callback: () => resolve('ranged')
        }
      },
      default: "melee",
      close: () => resolve(null)
    }).render(true);
  });
  if (!attackType) return;
  const attackData = actor.system.combat.attacks[attackType];
  if (!attackData) {
    return ui.notifications.warn("Aucune donnée d'attaque pour ce type.");
  }
  const va = attackData.va || 0;
  const dmgFormula = attackData.dm || '1d6';
  const roll = await new Roll('1d20 + @va', { va }).roll({ async: true });
  const defense = target.system.combat.def?.total || 10;
  const success = roll.total >= defense;
  let damageRoll = null;
  if (success) {
    damageRoll = await new Roll(dmgFormula).roll({ async: true });
  }
  // Construct chat message
  let content = `<strong>${actor.name}</strong> attaque <strong>${target.name}</strong> en ${attackType}.`;
  content += `<br/>Jet d'attaque: ${roll.result} (Total: ${roll.total}) vs DEF ${defense} ⇒ ${success ? 'Succès' : 'Échec'}.`;
  if (success && damageRoll) {
    content += `<br/>Dégâts: ${damageRoll.result} (Total: ${damageRoll.total}).`;
  }
  ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content
  });
})();
