/**
 * Custom actor sheet for COF V2 characters. Extends the base ActorSheet and
 * provides handlers for rolling tests and editing characteristic values.
 */
export class Cofv2CharacterSheet extends ActorSheet {
  /**
   * Default options for the sheet. We merge our custom options with those of
   * the base class. Here we define CSS classes, template and dimensions.
   */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['cofv2', 'sheet', 'actor', 'character'],
      template: 'systems/cof-v2/templates/actor/character-sheet.hbs',
      width: 600,
      height: 600,
      resizable: true
    });
  }

  /**
   * Prepare data for the Handlebars template. We expose the system data on
   * `data.system` for convenience.
   */
  override getData() {
    const context = super.getData() as any;
    context.system = this.actor.system;
    return context;
  }

  /**
   * Activate listeners. Adds click handlers to buttons for rolling ability
   * tests and other interactive elements.
   */
  override activateListeners(html: JQuery) {
    super.activateListeners(html);

    // Roll an ability test when clicking on the roll button next to an ability.
    html.find('.roll-ability').on('click', this._onRollAbility.bind(this));
  }

  /**
   * Handler for ability tests. Expects a `data-ability` attribute on the
   * triggering element corresponding to the key of the ability (e.g. "agi").
   */
  protected async _onRollAbility(event: JQuery.ClickEvent) {
    event.preventDefault();
    const ability = $(event.currentTarget).data('ability');
    if (!ability) return;
    const mod: number = this.actor.system.attributes?.[ability]?.value || 0;
    const roll = await new Roll('1d20 + @mod', { mod }).roll({ async: true });
    roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: `Test ${ability.toUpperCase()}`
    });
  }
}
