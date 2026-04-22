import type { FrameLocator, Locator } from '@playwright/test';

export class ImageMenu {
  readonly smallBtn: Locator;
  readonly mediumBtn: Locator;
  readonly largeBtn: Locator;

  constructor(frame: FrameLocator) {
    this.smallBtn = frame.getByRole('button', { name: 'Small' });
    this.mediumBtn = frame.getByRole('button', { name: 'Medium' });
    this.largeBtn = frame.getByRole('button', { name: 'Large' });
  }

  get allButtons(): Locator[] {
    return [this.smallBtn, this.mediumBtn, this.largeBtn];
  }
}
