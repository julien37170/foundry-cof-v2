/**
 * Macro: cast-spell
 *
 * This macro lets the player choose a spell item from their inventory,
 * performs the associated test and deducts mana points (PM). It assumes
 * that spells are items with type "spell" and that their system data
 * includes fields for pmCost and test. No effects are applied beyond
 * messaging and resource deduction.
 */
(async () => {
  const actor = canvas.tokens.controlled[0]?.actor;
  if (!actor) {
    return ui.notifications.warn("Sélectionnez un token pour lancer un sort.");
  }
  const spells = actor.items.filter(i => i.type === 'spell');
  if (!spells.length) {
    return ui.notifications.warn("Aucun sort dans l'inventaire.");
  }
  // Build options list for spells
  const options = spells.map(spell => `<option value="${spell.id}">${spell.name}</option>`).join("");
  const spellId = await new Promise(resolve => {
    new Dialog({
      title: "Lancer un sort",
      content: `<form><div class="form-group"><label>Sort</label><select id="spell">${options}</select></div></form>`,
      buttons: {
        ok: {
          label: "Lancer",
          callback: html => resolve(html.find('#spell').val())
        },
        cancel: {
          label: "Annuler",
          callback: () => resolve(null)
        }
      },
      default: "ok",
      close: () => resolve(null)
    }).render(true);
  });
  if (!spellId) return;
  const spell = spells.find(s => s.id === spellId);
  const pmCost = spell.system.pmCost || 0;
  const pm = actor.system.resources.pm;
  if (pm.value < pmCost) {
    return ui.notifications.warn("Points de mana insuffisants.");
  }
  // Deduct PM
  await actor.update({ 'system.resources.pm.value': pm.value - pmCost });
  // Perform the associated test (if defined) or just roll 1d20
  let testFormula = '1d20';
  if (spell.system.test) {
    // Example: "int" to roll 1d20+INT
    const ability = spell.system.test;
    const mod = actor.system.attributes?.[ability]?.value || 0;
    testFormula = `1d20 + ${mod}`;
  }
  const roll = await new Roll(testFormula).roll({ async: true });
  // Display message
  let content = `<strong>${actor.name}</strong> lance <strong>${spell.name}</strong>.`;
  content += `<br/>Jet: ${roll.result} (Total: ${roll.total}).`;
  content += `<br/>Coût en PM: ${pmCost}. PM restants: ${pm.value - pmCost}.`;
  ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content
  });
})();
