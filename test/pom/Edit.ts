import { expect, type Locator, type Page } from '@playwright/test';
import { pom } from '@tailor-cms/cek-e2e';

import { ImageMenu } from './bubble-menus/ImageMenu';
import { TableMenu } from './bubble-menus/TableMenu';
import { ToolbarControl } from './ToolbarControl';

export class Edit extends pom.EditPanel {
  readonly editorContent: Locator;
  readonly images: Locator;
  readonly placeholder: Locator;
  readonly boldBtn: ToolbarControl;
  readonly italicBtn: ToolbarControl;
  readonly underlineBtn: ToolbarControl;
  readonly strikeBtn: ToolbarControl;
  readonly undoBtn: ToolbarControl;
  readonly redoBtn: ToolbarControl;
  readonly orderedListBtn: ToolbarControl;
  readonly bulletListBtn: ToolbarControl;
  readonly superscriptBtn: ToolbarControl;
  readonly subscriptBtn: ToolbarControl;
  readonly blockquoteBtn: ToolbarControl;
  readonly codeBtn: ToolbarControl;
  readonly codeBlockBtn: ToolbarControl;
  readonly horizontalRuleBtn: ToolbarControl;
  readonly clearFormattingBtn: ToolbarControl;
  readonly addLinkBtn: ToolbarControl;
  readonly addLinkMenu: Locator;
  readonly linkTextInput: Locator;
  readonly linkUrlInput: Locator;
  readonly linkConfirmBtn: Locator;
  readonly linkUnlinkBtn: Locator;
  readonly addImageBtn: ToolbarControl;
  readonly imagePicker: pom.AssetPicker;
  readonly addTableBtn: ToolbarControl;
  readonly addTableMenu: Locator;
  readonly tableHeaderCheckbox: Locator;
  readonly tableCellBtns: Locator;
  readonly addTooltipBtn: ToolbarControl;
  readonly addTooltipMenu: Locator;
  readonly tooltipTextInput: Locator;
  readonly tooltipInput: Locator;
  readonly tooltipConfirmBtn: Locator;
  readonly tooltipRemoveBtn: Locator;
  readonly headingBtn: ToolbarControl;
  readonly fontSizeBtn: ToolbarControl;
  readonly fontFamilyBtn: ToolbarControl;
  readonly textAlignBtn: ToolbarControl;
  readonly textColorBtn: ToolbarControl;
  readonly backgroundColorBtn: ToolbarControl;
  readonly increaseIndentBtn: ToolbarControl;
  readonly decreaseIndentBtn: ToolbarControl;
  readonly imageMenu: ImageMenu;
  readonly tableMenu: TableMenu;

  constructor(page: Page) {
    super(page);
    this.editorContent = this.editor.locator('.tiptap');
    this.placeholder = this.editorContent.locator('p.is-editor-empty').first();
    // ProseMirror pads inline atoms with separator <img> hack nodes
    this.images = this.editorContent.locator('img:not(.ProseMirror-separator)');
    this.boldBtn = this.control('Bold');
    this.italicBtn = this.control('Italic');
    this.underlineBtn = this.control('Underline');
    this.strikeBtn = this.control('Strikethrough');
    this.undoBtn = this.control('Undo');
    this.redoBtn = this.control('Redo');
    this.orderedListBtn = this.control('Numbered list');
    this.bulletListBtn = this.control('Bullet list');
    this.superscriptBtn = this.control('Superscript');
    this.subscriptBtn = this.control('Subscript');
    this.blockquoteBtn = this.control('Quote');
    this.codeBtn = this.control('Code');
    this.codeBlockBtn = this.control('Code block');
    this.horizontalRuleBtn = this.control('Horizontal line');
    this.clearFormattingBtn = this.control('Clear formatting');
    this.addLinkBtn = this.control('Add link');
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
    this.addImageBtn = this.control('Add image');
    this.imagePicker = new pom.AssetPicker(this.el, 'Insert image');
    this.addTableBtn = this.control('Add table');
    this.addTableMenu = this.el
      .locator('.v-overlay.v-menu')
      .filter({ hasText: 'Add header' });
    this.tableHeaderCheckbox = this.addTableMenu.getByRole('checkbox', {
      name: 'Add header',
    });
    this.tableCellBtns = this.addTableMenu.locator('.cell-btn');
    this.addTooltipBtn = this.control('Add tooltip');
    // The overflow menu's "Add tooltip" item would match by text alone
    this.addTooltipMenu = this.el
      .locator('.v-overlay.v-menu')
      .filter({ has: this.el.getByLabel('Tooltip', { exact: true }) });
    this.tooltipTextInput = this.addTooltipMenu.getByLabel('Text');
    this.tooltipInput = this.addTooltipMenu.getByLabel('Tooltip');
    this.tooltipConfirmBtn = this.addTooltipMenu.getByRole('button', {
      name: 'Confirm',
    });
    this.tooltipRemoveBtn = this.addTooltipMenu.getByRole('button', {
      name: 'Remove',
    });
    this.headingBtn = this.control('Headings');
    this.fontSizeBtn = this.control('Font size');
    this.fontFamilyBtn = this.control('Font family');
    this.textAlignBtn = this.control('Text align');
    this.textColorBtn = this.control('Text color');
    this.backgroundColorBtn = this.control('Background color');
    this.increaseIndentBtn = this.control('Increase indent');
    this.decreaseIndentBtn = this.control('Decrease indent');
    this.imageMenu = new ImageMenu(this.el);
    this.tableMenu = new TableMenu(this.el);
  }

  private control(name: string): ToolbarControl {
    return new ToolbarControl(this.el, this.topToolbar, name);
  }

  get allToolbarButtons(): ToolbarControl[] {
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
    // The overflow menu stays open behind submenus; the newest sorts last
    return this.el.locator('.v-overlay--active .v-list').last();
  }

  private openColorSheet() {
    return this.el
      .locator('.v-overlay--active .v-sheet')
      .filter({ hasText: 'Reset' })
      .last();
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
