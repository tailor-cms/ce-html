import Link from '@tiptap/extension-link';

declare module '@tiptap/vue-3' {
  interface Commands<ReturnType> {
    customLink: {
      setLinkText: (attributes: { href: string; text: string }) => ReturnType;
    };
  }
}

export default Link.extend({
  addCommands() {
    return {
      ...this.parent?.(),
      setLinkText:
        ({ href, text } = { href: '', text: '' }) =>
        ({ chain, state }) => {
          const { from } = state.selection;
          const to = from + text.length;
          return chain()
            .insertContent(text)
            .setTextSelection({ from, to })
            .setMark(this.name, { href })
            .setMeta('preventAutolink', true)
            .run();
        },
    };
  },
});
