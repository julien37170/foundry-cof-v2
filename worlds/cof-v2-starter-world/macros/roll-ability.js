/**
 * Macro: roll-ability
 *
 * This macro prompts the user to choose one of the actor's characteristics and
 * then performs a test by rolling 1d20 plus the selected characteristic
 * modifier. The result is posted to chat.
 */
(async () => {
  const actor = canvas.tokens.controlled[0]?.actor;
  if (!actor) {
    return ui.notifications.warn("Sélectionnez un token pour lancer un test.");
  }
  const abilities = actor.system.attributes;
  // Build a selection list of abilities
  const options = Object.keys(abilities).map(key => `<option value="${key}">${key.toUpperCase()}</option>`).join("");
  const ability = await new Promise(resolve => {
    new Dialog({
      title: "Choisissez une caractéristique",
      content: `<form><div class="form-group"><label>Caractéristique</label><select id="ability">${options}</select></div></form>`,
      buttons: {
        ok: {
          label: "OK",
          callback: html => resolve(html.find('#ability').val())
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
  if (!ability) return;
  const mod = abilities[ability]?.value || 0;
  const roll = await new Roll('1d20 + @mod', { mod }).roll({ async: true });
  roll.toMessage({
    speaker: ChatMessage.getSpeaker({ actor }),
    flavor: `Test ${ability.toUpperCase()}`
  });
})();
