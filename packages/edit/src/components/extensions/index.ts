import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';

import FontSize from './fontSize.ts';
import Link from './link.ts';

export default [
  Color,
  FontFamily,
  FontSize,
  Highlight.configure({ multicolor: true }),
  Link.configure({ openOnClick: false }),
  StarterKit,
  Subscript,
  Superscript,
  Underline,
  TextStyle,
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Placeholder.configure({
    showOnlyWhenEditable: false,
    placeholder: 'Enter your text...',
  }),
];
