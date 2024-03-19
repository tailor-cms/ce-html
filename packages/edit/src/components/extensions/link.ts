import { CommandProps } from '@tiptap/vue-3';
import Link from '@tiptap/extension-link';

export default Link.extend({
  addCommands() {
    return {
      ...this.parent?.(),
      setLinkText:
        ({ attributes, text }: { attributes?: any; text?: string } = {}) =>
        ({ chain }: CommandProps) => {
          return chain()
            .setMark(this.name, { href: attributes?.href })
            .command(({ tr }: any) => {
              tr.insertText(text);
              return true;
            })
            .setMeta('preventAutolink', true)
            .run();
        },
    };
  },
});
