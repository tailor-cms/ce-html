import Paragraph from '@tiptap/extension-paragraph';

export default Paragraph.extend({
  parseHTML() {
    return [{ tag: 'div' }, { tag: 'p' }, { tag: 'span' }];
  },
  addGlobalAttributes() {
    return [
      {
        types: ['heading', 'paragraph'],
        attributes: {
          class: {
            default: null,
            parseHTML: (element) => element.getAttribute('class'),
            renderHTML(attributes) {
              return { class: attributes.class };
            },
          },
        },
      },
    ];
  },
});
