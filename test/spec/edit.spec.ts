import { expect, test } from '@playwright/test';
import { elementClient } from '@tailor-cms/cek-e2e';

import { Edit } from '../pom';

const ELEMENT_ID = 'test-html-edit';
const IMAGE_URL = 'https://picsum.photos/200';

test.beforeEach(async ({ page }) => {
  await elementClient.reset(ELEMENT_ID);
  await page.goto(`/?id=${ELEMENT_ID}`);
  await page.waitForLoadState('networkidle');
});

test.describe('Initial render', () => {
  test('Renders editor and placeholder when empty', async ({ page }) => {
    const edit = new Edit(page);
    await expect(edit.editorContent).toBeVisible();
    await expect(edit.placeholder).toHaveAttribute(
      'data-placeholder',
      'Enter your text...',
    );
  });

  test('Top toolbar is hidden when not focused', async ({ page }) => {
    const edit = new Edit(page);
    await expect(edit.topToolbar).not.toBeVisible();
  });

  test('Top toolbar becomes visible when focused', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await expect(edit.topToolbar).toBeVisible();
    await expect(edit.boldBtn).toBeVisible();
  });
});

test.describe('Toolbar config', () => {
  test('All expected toolbar buttons are rendered', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    for (const btn of edit.allToolbarButtons) await expect(btn).toBeVisible();
  });
});

test.describe('Extensions are registered', () => {
  test('All supported marks and nodes survive editor parse', async ({
    page,
  }) => {
    const content = `
      <p>
        <strong>b</strong> <em>i</em> <u>u</u> <s>s</s>
        <sub>sub</sub> <sup>sup</sup> <code>c</code>
      </p>
      <h1>h1</h1><h2>h2</h2>
      <blockquote><p>q</p></blockquote>
      <ul><li>u</li></ul>
      <ol><li>o</li></ol>
      <pre><code>pre</code></pre>
      <hr>
      <p style="text-align: center">aligned</p>
      <p><a href="https://tailor-cms.com">link</a></p>
      <p><img src="${IMAGE_URL}" alt=""></p>
      <p><span class="has-tooltip" data-tooltip="t">tip</span></p>
      <table><tbody><tr><td>cell</td></tr></tbody></table>
    `;
    await elementClient.update(ELEMENT_ID, { content });
    await page.reload({ waitUntil: 'networkidle' });
    const edit = new Edit(page);
    const tags = [
      'strong',
      'em',
      'u',
      's',
      'sub',
      'sup',
      'p > code',
      'h1',
      'h2',
      'blockquote',
      'ul > li',
      'ol > li',
      'pre > code',
      'hr',
      'a[href]',
      'img[src]',
      'span.has-tooltip',
      'table td',
    ];
    for (const tag of tags) {
      await expect
        .soft(
          edit.editorContent.locator(tag),
          `expected <${tag}> to survive editor parse`,
        )
        .toHaveCount(1);
    }
  });
});

test.describe('Renders pre-seeded content', () => {
  test('Renders formatted HTML', async ({ page }) => {
    await elementClient.update(ELEMENT_ID, {
      content: '<p><strong>Hello</strong> <em>world</em></p>',
    });
    await page.reload({ waitUntil: 'networkidle' });
    const edit = new Edit(page);
    await expect(edit.editorContent.locator('strong')).toHaveText('Hello');
    await expect(edit.editorContent.locator('em')).toHaveText('world');
  });

  test('Renders headings and lists', async ({ page }) => {
    await elementClient.update(ELEMENT_ID, {
      content: '<h2>Title</h2><ul><li>one</li><li>two</li></ul>',
    });
    await page.reload({ waitUntil: 'networkidle' });
    const edit = new Edit(page);
    await expect(edit.editorContent.locator('h2')).toHaveText('Title');
    await expect(edit.editorContent.locator('ul > li')).toHaveCount(2);
  });
});

test.describe('Typing', () => {
  test('Adds typed text and hides placeholder', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.typeIntoEditor('Some content');
    await expect(edit.editorContent).toContainText('Some content');
    await expect(edit.editorContent.locator('p.is-editor-empty')).toHaveCount(
      0,
    );
  });
});

test.describe('Toolbar actions', () => {
  test.beforeEach(async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.typeIntoEditor('Sample text');
    await edit.selectAll();
  });

  test('Bold toggles strong mark and active state', async ({ page }) => {
    const edit = new Edit(page);
    await expect(edit.boldBtn).not.toHaveClass(/v-btn--active/);
    await edit.boldBtn.click();
    await expect(edit.editorContent.locator('strong')).toHaveText(
      'Sample text',
    );
    await expect(edit.boldBtn).toHaveClass(/v-btn--active/);
  });

  test('Bullet list wraps selection in ul', async ({ page }) => {
    const edit = new Edit(page);
    await edit.bulletListBtn.click();
    await expect(edit.editorContent.locator('ul > li')).toHaveText(
      'Sample text',
    );
  });

  test('Redo replays an undone change', async ({ page }) => {
    const edit = new Edit(page);
    await edit.boldBtn.click();
    await edit.undoBtn.click();
    await expect(edit.editorContent.locator('strong')).toHaveCount(0);
    await edit.redoBtn.click();
    await expect(edit.editorContent.locator('strong')).toHaveText(
      'Sample text',
    );
  });

  test('Clear formatting removes marks', async ({ page }) => {
    const edit = new Edit(page);
    await edit.boldBtn.click();
    await expect(edit.editorContent.locator('strong')).toBeVisible();
    await edit.selectAll();
    await edit.clearFormattingBtn.click();
    await expect(edit.editorContent.locator('strong')).toHaveCount(0);
  });

  test('Undo reverts last change', async ({ page }) => {
    const edit = new Edit(page);
    await edit.boldBtn.click();
    await expect(edit.editorContent.locator('strong')).toBeVisible();
    await edit.undoBtn.click();
    await expect(edit.editorContent.locator('strong')).toHaveCount(0);
  });
});

test.describe('Heading menu', () => {
  test.beforeEach(async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.typeIntoEditor('Sample text');
    await edit.selectAll();
  });

  test('Converts paragraph to h2', async ({ page }) => {
    const edit = new Edit(page);
    await edit.selectHeading(2);
    await expect(edit.editorContent.locator('h2')).toHaveText('Sample text');
  });

  test('Reverts heading back to paragraph', async ({ page }) => {
    const edit = new Edit(page);
    await edit.selectHeading(3);
    await expect(edit.editorContent.locator('h3')).toBeVisible();
    await edit.selectAll();
    await edit.selectHeading('Normal');
    await expect(edit.editorContent.locator('h3')).toHaveCount(0);
    await expect(
      edit.editorContent.locator('p', { hasText: 'Sample text' }),
    ).toBeVisible();
  });
});

test.describe('Font size and family', () => {
  test.beforeEach(async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.typeIntoEditor('Sample text');
    await edit.selectAll();
  });

  test('Applies a font size inline style', async ({ page }) => {
    const edit = new Edit(page);
    await edit.selectFontSize('24px');
    const span = edit.editorContent.locator('span').first();
    await expect(span).toHaveCSS('font-size', '24px');
  });

  test('Applies a font family inline style', async ({ page }) => {
    const edit = new Edit(page);
    await edit.selectFontFamily('Georgia');
    const span = edit.editorContent.locator('span').first();
    await expect(span).toHaveAttribute('style', /font-family:\s*Georgia/);
  });
});

test.describe('Color pickers', () => {
  test.beforeEach(async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.typeIntoEditor('Sample text');
    await edit.selectAll();
  });

  test('Applies text color', async ({ page }) => {
    const edit = new Edit(page);
    await edit.selectTextColor('#F44E3B');
    const span = edit.editorContent.locator('span').first();
    await expect(span).toHaveCSS('color', 'rgb(244, 78, 59)');
  });

  test('Applies background color', async ({ page }) => {
    const edit = new Edit(page);
    await edit.selectBackgroundColor('#FCDC00');
    const span = edit.editorContent.locator('span').first();
    await expect(span).toHaveCSS('background-color', 'rgb(252, 220, 0)');
  });
});

test.describe('Text align', () => {
  test.beforeEach(async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.typeIntoEditor('Sample text');
  });

  test('Aligns paragraph to the right', async ({ page }) => {
    const edit = new Edit(page);
    await edit.selectTextAlign('right');
    await expect(edit.editorContent.locator('p').first()).toHaveCSS(
      'text-align',
      'right',
    );
  });

  test('Aligns paragraph to center', async ({ page }) => {
    const edit = new Edit(page);
    await edit.selectTextAlign('center');
    await expect(edit.editorContent.locator('p').first()).toHaveCSS(
      'text-align',
      'center',
    );
  });
});

test.describe('List indent', () => {
  test('Nests a list item with increase indent', async ({ page }) => {
    await elementClient.update(ELEMENT_ID, {
      content: '<ul><li><p>one</p></li><li><p>two</p></li></ul>',
    });
    await page.reload({ waitUntil: 'networkidle' });
    const edit = new Edit(page);
    await edit.focus();
    // Place caret inside the second item
    await edit.editorContent.getByText('two').click();
    await edit.increaseIndentBtn.click();
    await expect(edit.editorContent.locator('ul > li > ul > li')).toContainText(
      'two',
    );
  });

  test('Decrease indent lifts a nested item back up', async ({ page }) => {
    await elementClient.update(ELEMENT_ID, {
      content: '<ul><li><p>one</p><ul><li><p>two</p></li></ul></li></ul>',
    });
    await page.reload({ waitUntil: 'networkidle' });
    const edit = new Edit(page);
    await edit.focus();
    await edit.editorContent.getByText('two').click();
    await edit.decreaseIndentBtn.click();
    await expect(edit.editorContent.locator('ul > li > ul')).toHaveCount(0);
    await expect(edit.editorContent.locator('ul > li')).toHaveCount(2);
  });
});

test.describe('Horizontal rule', () => {
  test('Inserts an hr element', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.typeIntoEditor('Before rule');
    await edit.horizontalRuleBtn.click();
    await expect(edit.editorContent.locator('hr')).toBeVisible();
  });
});

test.describe('Link menu', () => {
  test('Creates a link from selected text', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.typeIntoEditor('Tailor');
    await edit.selectAll();
    await edit.addLinkBtn.click();
    await expect(edit.addLinkMenu).toBeVisible();
    await expect(edit.linkTextInput).toHaveValue('Tailor');
    await edit.linkUrlInput.fill('https://tailor-cms.com');
    await edit.linkConfirmBtn.click();
    const link = edit.editorContent.locator('a');
    await expect(link).toHaveAttribute('href', 'https://tailor-cms.com');
    await expect(link).toHaveText('Tailor');
  });

  test('Unlinks existing link', async ({ page }) => {
    await elementClient.update(ELEMENT_ID, {
      content: '<p><a href="https://tailor-cms.com">Tailor</a></p>',
    });
    await page.reload({ waitUntil: 'networkidle' });
    const edit = new Edit(page);
    await edit.focus();
    await edit.selectAll();
    await edit.addLinkBtn.click();
    await edit.linkUnlinkBtn.click();
    await expect(edit.editorContent.locator('a')).toHaveCount(0);
  });
});

test.describe('Add image menu', () => {
  test('Inserts an image from a URL', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.addImageBtn.click();
    await expect(edit.addImageMenu).toBeVisible();
    await edit.imageTitleInput.fill('Sunset');
    await edit.imageUrlInput.fill(IMAGE_URL);
    await edit.imageConfirmBtn.click();
    const img = edit.editorContent.locator('img[src]');
    await expect(img).toHaveAttribute('src', IMAGE_URL);
    await expect(img).toHaveAttribute('alt', 'Sunset');
    await expect(img).toHaveAttribute('title', 'Sunset');
  });

  test('Requires title and url', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.addImageBtn.click();
    await edit.imageConfirmBtn.click();
    await expect(edit.addImageMenu).toBeVisible();
    await expect(edit.editorContent.locator('img[src]')).toHaveCount(0);
  });
});

test.describe('Add table menu', () => {
  test('Inserts a 2x2 table without header', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.addTableBtn.click();
    await expect(edit.addTableMenu).toBeVisible();
    // Initial grid is 5x5 row-major; (row=2, col=2) is flat index 6
    await edit.tableCellBtns.nth(6).click();
    const table = edit.editorContent.locator('table');
    await expect(table).toBeVisible();
    await expect(table.locator('tr')).toHaveCount(2);
    await expect(table.locator('tr').first().locator('td')).toHaveCount(2);
    await expect(table.locator('th')).toHaveCount(0);
  });

  test('Inserts a 2x2 table with header row', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.addTableBtn.click();
    await edit.tableHeaderCheckbox.click();
    // (row=2, col=2) flat index 6; `withHeaderRow` adds one extra row
    await edit.tableCellBtns.nth(6).click();
    const table = edit.editorContent.locator('table');
    await expect(table.locator('tr')).toHaveCount(3);
    await expect(table.locator('th')).toHaveCount(2);
  });
});

test.describe('Tooltip menu', () => {
  test('Wraps text in a tooltip span', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.addTooltipBtn.click();
    await expect(edit.addTooltipMenu).toBeVisible();
    await edit.tooltipTextInput.fill('hover me');
    await edit.tooltipInput.fill('Hello there');
    await edit.tooltipConfirmBtn.click();
    const span = edit.editorContent.locator('span.has-tooltip');
    await expect(span).toHaveText('hover me');
    await expect(span).toHaveAttribute('data-tooltip', 'Hello there');
  });

  test('Removes an existing tooltip', async ({ page }) => {
    await elementClient.update(ELEMENT_ID, {
      content:
        '<p><span class="has-tooltip" data-tooltip="note">target</span></p>',
    });
    await page.reload({ waitUntil: 'networkidle' });
    const edit = new Edit(page);
    await edit.focus();
    await edit.selectAll();
    await edit.addTooltipBtn.click();
    await edit.tooltipRemoveBtn.click();
    await expect(edit.editorContent.locator('span.has-tooltip')).toHaveCount(0);
  });
});

test.describe('Image bubble menu', () => {
  test.beforeEach(async ({ page }) => {
    await elementClient.update(ELEMENT_ID, {
      content: `<p><img src="${IMAGE_URL}" alt="test"></p>`,
    });
    await page.reload({ waitUntil: 'networkidle' });
  });

  test('Appears when image is selected', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.editorContent.locator('img[src]').click();
    await expect(edit.imageMenu.smallBtn).toBeVisible();
  });

  test('Resizes image via size button', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.editorContent.locator('img[src]').click();
    await edit.imageMenu.mediumBtn.click();
    await expect(edit.editorContent.locator('img[src]')).toHaveAttribute(
      'style',
      /width:\s*50%/,
    );
  });

  test('All expected buttons are rendered', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.editorContent.locator('img[src]').click();
    for (const btn of edit.imageMenu.allButtons)
      await expect(btn).toBeVisible();
  });
});

test.describe('Table bubble menu', () => {
  test.beforeEach(async ({ page }) => {
    await elementClient.update(ELEMENT_ID, {
      content: '<table><tbody><tr><td><p>a</p></td></tr></tbody></table>',
    });
    await page.reload({ waitUntil: 'networkidle' });
  });

  test('Appears when cell is selected', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.editorContent.locator('table td').click();
    await expect(edit.tableMenu.removeBtn).toBeVisible();
  });

  test('All expected buttons are rendered', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.editorContent.locator('table td').click();
    for (const btn of edit.tableMenu.allButtons)
      await expect(btn).toBeVisible();
  });

  test('Adds a column after the current one', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.editorContent.locator('table td').click();
    await edit.tableMenu.addColumnAfterBtn.click();
    await expect(edit.editorContent.locator('table td')).toHaveCount(2);
  });

  test('Removes the table', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.editorContent.locator('table td').click();
    await edit.tableMenu.removeBtn.click();
    await expect(edit.editorContent.locator('table')).toHaveCount(0);
  });
});

test.describe('Readonly mode', () => {
  test('Keeps editor visible but non-editable', async ({ page }) => {
    await elementClient.update(ELEMENT_ID, {
      content: '<p>Locked content</p>',
    });
    await page.reload({ waitUntil: 'networkidle' });
    const edit = new Edit(page);
    await edit.setReadonly();
    await expect(edit.editorContent).toHaveAttribute(
      'contenteditable',
      'false',
    );
    await expect(edit.editorContent).toContainText('Locked content');
  });

  test('Image bubble menu does not appear', async ({ page }) => {
    await elementClient.update(ELEMENT_ID, {
      content: `<p><img src="${IMAGE_URL}" alt="test"></p>`,
    });
    await page.reload({ waitUntil: 'networkidle' });
    const edit = new Edit(page);
    await edit.setReadonly();
    await edit.editorContent.locator('img[src]').click();
    await expect(edit.imageMenu.smallBtn).not.toBeVisible();
  });

  test('Table bubble menu does not appear', async ({ page }) => {
    await elementClient.update(ELEMENT_ID, {
      content: '<table><tbody><tr><td><p>cell</p></td></tr></tbody></table>',
    });
    await page.reload({ waitUntil: 'networkidle' });
    const edit = new Edit(page);
    await edit.setReadonly();
    await edit.editorContent.locator('table td').click();
    await expect(edit.tableMenu.removeBtn).not.toBeVisible();
  });
});
