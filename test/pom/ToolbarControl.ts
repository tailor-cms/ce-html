import type { FrameLocator, Locator } from '@playwright/test';

/**
 * Toolbar control that moves to the "More formatting options" menu when
 * the toolbar is too narrow to fit it.
 */
export class ToolbarControl {
  readonly toolbarButton: Locator;
  readonly menuItem: Locator;
  readonly moreBtn: Locator;

  constructor(
    frame: FrameLocator,
    private readonly toolbar: Locator,
    name: string,
  ) {
    this.toolbarButton = toolbar.getByRole('button', { name, exact: true });
    this.menuItem = frame
      .locator('.v-overlay--active')
      .getByRole('menuitem', { name, exact: true });
    this.moreBtn = toolbar.getByRole('button', {
      name: 'More formatting options',
    });
  }

  // Returns the control wherever it is rendered, opening the overflow menu
  // if needed
  async reveal(): Promise<Locator> {
    await this.toolbar.waitFor();
    if (await this.toolbarButton.isVisible()) return this.toolbarButton;
    if (!(await this.menuItem.isVisible())) await this.moreBtn.click();
    return this.menuItem;
  }

  async click(): Promise<void> {
    await (await this.reveal()).click();
  }
}
