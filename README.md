# HTML

Rich text HTML content element powered by Tiptap.

**Type:** `TIPTAP_HTML`

## Data

| Field | Type | Description |
|-------|------|-------------|
| `content` | `string` | HTML content produced by the editor |

## Edit

- Tiptap-based WYSIWYG editor with typography, lists, alignment, super/subscript, code, and blockquote
- Top toolbar with headings, font family/size, text and background color, image/link/table/tooltip insertion, and clear formatting
- Bubble menus for image sizing and table manipulation (rows, columns, merge, split)
- Debounced autosave (3s) on content change

## Display

- Renders the stored HTML with styles for headings, tables, code, blockquotes, and tooltips

## Development

```sh
pnpm dev     # Preview :8080 | Edit :8010 | Display :8020 | Server :8030
pnpm build
pnpm lint
pnpm test
```

## Run with Docker

```sh
docker compose up
```
