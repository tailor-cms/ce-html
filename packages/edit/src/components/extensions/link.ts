import { CommandProps } from '@tiptap/vue-3';
import Link from '@tiptap/extension-link';

export default Link.extend({
  addCommands() {
    return {
      ...this.parent?.(),
      setLinkText:
        ({ href, text } = { href: '', text: '' }) =>
        ({ chain, state }: CommandProps) => {
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
