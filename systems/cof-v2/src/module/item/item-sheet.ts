/**
 * Basic item sheet for all item types in COF V2. Extends the base ItemSheet
 * and provides the data context to the Handlebars template. For more
 * specialised items (spells, capacities, etc.) you can extend this class.
 */
export class Cofv2ItemSheet extends ItemSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['cofv2', 'sheet', 'item'],
      template: 'systems/cof-v2/templates/item/item-sheet.hbs',
      width: 480,
      height: 400,
      resizable: true
    });
  }

  override getData() {
    const context = super.getData() as any;
    context.system = this.item.system;
    return context;
  }
}
