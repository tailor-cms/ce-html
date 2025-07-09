import { OpenAISchema } from '@tailor-cms/cek-common';

import type {
  DataInitializer,
  ElementData,
  ElementManifest,
} from './interfaces';

// Element unique id within the target system (e.g. Tailor)
export const type = 'TIPTAP_HTML';

// Display name (e.g. shown to the author)
export const name = 'HTML';

// Function which inits element state (data property on the Content Element
// entity)
export const initState: DataInitializer = (): ElementData => ({ content: '' });

// Can be loaded from package.json
export const version = '1.0';

// UI configuration for Tailor CMS
const ui = {
  // Display icon, https://pictogrammers.com/library/mdi/
  icon: 'mdi-text-box-outline',
  // Does element support only full width or can be used within layouts
  // (e.g. 50/50 layout)
  forceFullWidth: false,
};

export const ai = {
  Schema: {
    type: 'json_schema',
    name: 'ce_tiptap_html',
    schema: {
      type: 'object',
      properties: {
        content: { type: 'string' },
      },
      required: ['content'],
      additionalProperties: false,
    },
  } as OpenAISchema,
  getPrompt: () => `
    Generate rich text for a page as an object with the following
    properties: { "content": "" }
    where:
    - 'content' is the text of the page in HTML format.
  `,
  processResponse: (val: any) => val,
};

const manifest: ElementManifest = {
  type,
  version,
  name,
  ssr: false,
  initState,
  ui,
  ai,
};

export default manifest;
export * from './interfaces';
