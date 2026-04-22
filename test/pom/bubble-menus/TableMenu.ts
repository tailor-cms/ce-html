import type { FrameLocator, Locator } from '@playwright/test';

export class TableMenu {
  readonly addColumnBeforeBtn: Locator;
  readonly addColumnAfterBtn: Locator;
  readonly removeColumnBtn: Locator;
  readonly addRowBeforeBtn: Locator;
  readonly addRowAfterBtn: Locator;
  readonly removeRowBtn: Locator;
  readonly removeBtn: Locator;
  readonly mergeCellsBtn: Locator;
  readonly splitCellBtn: Locator;

  constructor(frame: FrameLocator) {
    this.addColumnBeforeBtn = frame.getByRole('button', {
      name: 'Add column before',
    });
    this.addColumnAfterBtn = frame.getByRole('button', {
      name: 'Add column after',
    });
    this.removeColumnBtn = frame.getByRole('button', { name: 'Remove column' });
    this.addRowBeforeBtn = frame.getByRole('button', {
      name: 'Add row before',
    });
    this.addRowAfterBtn = frame.getByRole('button', { name: 'Add row after' });
    this.removeRowBtn = frame.getByRole('button', { name: 'Remove row' });
    this.removeBtn = frame.getByRole('button', { name: 'Remove table' });
    this.mergeCellsBtn = frame.getByRole('button', { name: 'Merge cells' });
    this.splitCellBtn = frame.getByRole('button', { name: 'Split cell' });
  }

  get allButtons(): Locator[] {
    return [
      this.addColumnBeforeBtn,
      this.addColumnAfterBtn,
      this.removeColumnBtn,
      this.addRowBeforeBtn,
      this.addRowAfterBtn,
      this.removeRowBtn,
      this.removeBtn,
      this.mergeCellsBtn,
      this.splitCellBtn,
    ];
  }
}
