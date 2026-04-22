import { expect, type Locator, type Page } from '@playwright/test';
import { pom } from '@tailor-cms/cek-e2e';

import { ImageMenu } from './bubble-menus/ImageMenu';
import { TableMenu } from './bubble-menus/TableMenu';

export class Edit extends pom.EditPanel {
  readonly editorContent: Locator;
  readonly placeholder: Locator;
  readonly boldBtn: Locator;
  readonly italicBtn: Locator;
  readonly underlineBtn: Locator;
  readonly strikeBtn: Locator;
  readonly undoBtn: Locator;
  readonly redoBtn: Locator;
  readonly orderedListBtn: Locator;
  readonly bulletListBtn: Locator;
  readonly superscriptBtn: Locator;
  readonly subscriptBtn: Locator;
  readonly blockquoteBtn: Locator;
  readonly codeBtn: Locator;
  readonly codeBlockBtn: Locator;
  readonly horizontalRuleBtn: Locator;
  readonly clearFormattingBtn: Locator;
  readonly addLinkBtn: Locator;
  readonly addLinkMenu: Locator;
  readonly linkTextInput: Locator;
  readonly linkUrlInput: Locator;
  readonly linkConfirmBtn: Locator;
  readonly linkUnlinkBtn: Locator;
  readonly addImageBtn: Locator;
  readonly addImageMenu: Locator;
  readonly imageTitleInput: Locator;
  readonly imageUrlInput: Locator;
  readonly imageConfirmBtn: Locator;
  readonly addTableBtn: Locator;
  readonly addTableMenu: Locator;
  readonly tableHeaderCheckbox: Locator;
  readonly tableCellBtns: Locator;
  readonly addTooltipBtn: Locator;
  readonly addTooltipMenu: Locator;
  readonly tooltipTextInput: Locator;
  readonly tooltipInput: Locator;
  readonly tooltipConfirmBtn: Locator;
  readonly tooltipRemoveBtn: Locator;
  readonly headingBtn: Locator;
  readonly fontSizeBtn: Locator;
  readonly fontFamilyBtn: Locator;
  readonly textAlignBtn: Locator;
  readonly textColorBtn: Locator;
  readonly backgroundColorBtn: Locator;
  readonly increaseIndentBtn: Locator;
  readonly decreaseIndentBtn: Locator;
  readonly imageMenu: ImageMenu;
  readonly tableMenu: TableMenu;

  constructor(page: Page) {
    super(page);
    this.editorContent = this.editor.locator('.tiptap');
    this.placeholder = this.editorContent.locator('p.is-editor-empty').first();
    this.boldBtn = this.topToolbar.getByRole('button', { name: 'Bold' });
    this.italicBtn = this.topToolbar.getByRole('button', { name: 'Italic' });
    this.underlineBtn = this.topToolbar.getByRole('button', {
      name: 'Underline',
    });
    this.strikeBtn = this.topToolbar.getByRole('button', {
      name: 'Strikethrough',
    });
    this.undoBtn = this.topToolbar.getByRole('button', { name: 'Undo' });
    this.redoBtn = this.topToolbar.getByRole('button', { name: 'Redo' });
    this.orderedListBtn = this.topToolbar
      .getByRole('button', { name: 'Numbered list' })
      .first();
    this.bulletListBtn = this.topToolbar
      .getByRole('button', { name: 'Numbered list' })
      .nth(1);
    this.superscriptBtn = this.topToolbar.getByRole('button', {
      name: 'Superscript',
    });
    this.subscriptBtn = this.topToolbar.getByRole('button', {
      name: 'Subscript',
    });
    this.blockquoteBtn = this.topToolbar.getByRole('button', { name: 'Quote' });
    this.codeBtn = this.topToolbar
      .getByRole('button', { name: 'Code' })
      .first();
    this.codeBlockBtn = this.topToolbar.getByRole('button', {
      name: 'Code block',
    });
    this.horizontalRuleBtn = this.topToolbar.getByRole('button', {
      name: 'Horizontal line',
    });
    this.clearFormattingBtn = this.topToolbar.getByRole('button', {
      name: 'Clear formatting',
    });
    this.addLinkBtn = this.topToolbar.getByRole('button', { name: 'Add link' });
    this.addLinkMenu = this.el
      .locator('.v-overlay.v-menu')
      .filter({ hasText: 'Url' });
    this.linkTextInput = this.addLinkMenu.getByLabel('Text');
    this.linkUrlInput = this.addLinkMenu.getByLabel('Url');
    this.linkConfirmBtn = this.addLinkMenu.getByRole('button', {
      name: 'Confirm',
    });
    this.linkUnlinkBtn = this.addLinkMenu.getByRole('button', {
      name: 'Unlink',
    });
    this.addImageBtn = this.topToolbar.getByRole('button', {
      name: 'Add image',
    });
    this.addImageMenu = this.el
      .locator('.v-overlay.v-menu')
      .filter({ hasText: 'Title' });
    this.imageTitleInput = this.addImageMenu.getByLabel('Title');
    this.imageUrlInput = this.addImageMenu.getByLabel('Url');
    this.imageConfirmBtn = this.addImageMenu.getByRole('button', {
      name: 'Confirm',
    });
    this.addTableBtn = this.topToolbar.getByRole('button', {
      name: 'Add table',
    });
    this.addTableMenu = this.el
      .locator('.v-overlay.v-menu')
      .filter({ hasText: 'Add header' });
    this.tableHeaderCheckbox = this.addTableMenu.getByRole('checkbox', {
      name: 'Add header',
    });
    this.tableCellBtns = this.addTableMenu.locator('.cell-btn');
    this.addTooltipBtn = this.topToolbar.getByRole('button', {
      name: 'Add tooltip',
    });
    this.addTooltipMenu = this.el
      .locator('.v-overlay.v-menu')
      .filter({ hasText: 'Tooltip' });
    this.tooltipTextInput = this.addTooltipMenu.getByLabel('Text');
    this.tooltipInput = this.addTooltipMenu.getByLabel('Tooltip');
    this.tooltipConfirmBtn = this.addTooltipMenu.getByRole('button', {
      name: 'Confirm',
    });
    this.tooltipRemoveBtn = this.addTooltipMenu.getByRole('button', {
      name: 'Remove',
    });
    this.headingBtn = this.topToolbar.getByRole('button', {
      name: 'Text heading',
    });
    this.fontSizeBtn = this.topToolbar.getByRole('button', {
      name: 'Font size',
    });
    this.fontFamilyBtn = this.topToolbar.getByRole('button', {
      name: 'Font family',
    });
    this.textAlignBtn = this.topToolbar.getByRole('button', {
      name: 'Text align',
    });
    this.textColorBtn = this.topToolbar.getByRole('button', {
      name: 'Text color',
    });
    this.backgroundColorBtn = this.topToolbar.getByRole('button', {
      name: 'Background color',
    });
    this.increaseIndentBtn = this.topToolbar.getByRole('button', {
      name: 'Increase indent',
    });
    this.decreaseIndentBtn = this.topToolbar.getByRole('button', {
      name: 'Decrease indent',
    });
    this.imageMenu = new ImageMenu(this.el);
    this.tableMenu = new TableMenu(this.el);
  }

  get allToolbarButtons(): Locator[] {
    return [
      this.undoBtn,
      this.redoBtn,
      this.boldBtn,
      this.italicBtn,
      this.underlineBtn,
      this.strikeBtn,
      this.superscriptBtn,
      this.subscriptBtn,
      this.blockquoteBtn,
      this.codeBtn,
      this.codeBlockBtn,
      this.orderedListBtn,
      this.bulletListBtn,
      this.horizontalRuleBtn,
      this.clearFormattingBtn,
      this.increaseIndentBtn,
      this.decreaseIndentBtn,
      this.addLinkBtn,
      this.addImageBtn,
      this.addTableBtn,
      this.addTooltipBtn,
      this.headingBtn,
      this.fontSizeBtn,
      this.fontFamilyBtn,
      this.textAlignBtn,
      this.textColorBtn,
      this.backgroundColorBtn,
    ];
  }

  private openMenuList() {
    return this.el.locator('.v-overlay--active .v-list');
  }

  private openColorSheet() {
    return this.el
      .locator('.v-overlay--active .v-sheet')
      .filter({ hasText: 'Reset' });
  }

  async selectHeading(level: 1 | 2 | 3 | 4 | 5 | 6 | 'Normal') {
    await this.headingBtn.click();
    const name = level === 'Normal' ? 'Normal' : `Heading ${level}`;
    await this.openMenuList()
      .getByRole('listitem')
      .filter({ hasText: name })
      .click();
  }

  async selectFontSize(size: string) {
    await this.fontSizeBtn.click();
    await this.openMenuList()
      .getByRole('listitem')
      .filter({ hasText: new RegExp(`^${size}$`) })
      .click();
  }

  async selectFontFamily(family: string) {
    await this.fontFamilyBtn.click();
    await this.openMenuList()
      .getByRole('listitem')
      .filter({ hasText: new RegExp(`^${family}$`) })
      .click();
  }

  async selectTextAlign(dir: 'left' | 'center' | 'right' | 'justify') {
    await this.textAlignBtn.click();
    await this.openMenuList()
      .getByRole('listitem')
      .filter({ hasText: dir })
      .click();
  }

  async selectTextColor(hex: string) {
    await this.textColorBtn.click();
    await this.openColorSheet().getByRole('button', { name: hex }).click();
  }

  async selectBackgroundColor(hex: string) {
    await this.backgroundColorBtn.click();
    await this.openColorSheet().getByRole('button', { name: hex }).click();
  }

  async typeIntoEditor(text: string) {
    await this.editorContent.click();
    await this.editorContent.pressSequentially(text);
    await expect(this.editorContent).toContainText(text);
  }

  async selectAll() {
    await this.editorContent.focus();
    await this.editorContent.selectText();
  }
}
