import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';

export default [
  Color,
  Highlight.configure({
    multicolor: true,
  }),
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
