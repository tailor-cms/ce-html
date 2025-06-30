import { OpenAISchema } from '@tailor-cms/cek-common';

export const Schema: OpenAISchema = {
  type: 'json_schema',
  name: 'ce_counter',
  schema: {
    type: 'object',
    properties: {
      content: { type: 'string' },
    },
    required: ['content'],
    additionalProperties: false,
  },
};

export const getPrompt = () => `
  Generate HTML content element as an object with the following properties:
  {
    "content": "",
  },
  where:
  - 'content' is the text of the page in HTML format.
`;

export default {
  getPrompt,
  Schema,
  processResponse: (val: any) => val,
};
