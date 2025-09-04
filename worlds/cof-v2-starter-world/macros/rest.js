/**
 * Macro: rest
 *
 * This macro offers the choice between a court repos (short rest) and a long repos (long rest).
 * For demonstration purposes, a short rest recovers one die of recovery (DR) and a portion of
 * points de chance (PC) and points de mana (PM), while a long rest restores all resources to max.
 */
(async () => {
  const actor = canvas.tokens.controlled[0]?.actor;
  if (!actor) {
    return ui.notifications.warn("Sélectionnez un token pour prendre un repos.");
  }
  const choice = await new Promise(resolve => {
    new Dialog({
      title: "Repos",
      content: `<p>Choisissez le type de repos :</p>`,
      buttons: {
        short: {
          label: "Court repos",
          callback: () => resolve('short')
        },
        long: {
          label: "Long repos",
          callback: () => resolve('long')
        }
      },
      default: "short",
      close: () => resolve(null)
    }).render(true);
  });
  if (!choice) return;
  const resources = actor.system.resources;
  if (choice === 'short') {
    // Short rest: recover one DR, half PC and PM (rounded up)
    const newDr = (resources.dr.value || 0) + 1;
    const newPc = Math.min(resources.pc.max, Math.ceil(resources.pc.value + resources.pc.max / 2));
    const newPm = Math.min(resources.pm.max, Math.ceil(resources.pm.value + resources.pm.max / 2));
    await actor.update({
      'system.resources.dr.value': newDr,
      'system.resources.pc.value': newPc,
      'system.resources.pm.value': newPm
    });
    ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content: `${actor.name} prend un court repos. DR: ${newDr}, PC: ${newPc}/${resources.pc.max}, PM: ${newPm}/${resources.pm.max}.`
    });
  } else {
    // Long rest: full recovery
    await actor.update({
      'system.resources.pv.value': resources.pv.max,
      'system.resources.pc.value': resources.pc.max,
      'system.resources.pm.value': resources.pm.max
    });
    ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content: `${actor.name} prend un long repos et récupère toutes ses ressources.`
    });
  }
})();
