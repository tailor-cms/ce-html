import { Mark, mergeAttributes } from '@tiptap/vue-3';

declare module '@tiptap/vue-3' {
  interface Commands<ReturnType> {
    tooltip: {
      setTooltip: (attributes: { tooltip: string; text: string }) => ReturnType;
      unsetTooltip: () => ReturnType;
    };
  }
}

export default Mark.create({
  name: 'tooltip',
  keepOnSplit: false,
  exitable: true,

  addAttributes() {
    return {
      'data-tooltip': {
        default: null,
        parseHTML: (element) => element.getAttribute('data-tooltip'),
        renderHTML: (attributes) => ({
          'data-tooltip': attributes['data-tooltip'],
        }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'span[data-tooltip]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes({ class: 'has-tooltip' }, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setTooltip:
        ({ tooltip, text } = { tooltip: '', text: '' }) =>
        ({ chain, state }) => {
          const { from } = state.selection;
          const to = from + text.length;
          return chain()
            .insertContent(text)
            .setTextSelection({ from, to })
            .setMark(this.name, { 'data-tooltip': tooltip })
            .run();
        },
      unsetTooltip:
        () =>
        ({ chain }) => {
          return chain().unsetMark(this.name).run();
        },
    };
  },
});
