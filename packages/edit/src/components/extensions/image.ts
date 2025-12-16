import Image from '@tiptap/extension-image';

export default Image.configure({ inline: true }).extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        renderHTML: ({ width }) => {
          if (!width) return {};
          return { style: `width: ${width};` };
        },
        parseHTML: (element) => element.style.width.replace(/['"]+/g, ''),
      },
    };
  },
});
