import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';

export default [
  StarterKit,
  Subscript,
  Superscript,
  Underline,
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Placeholder.configure({
    showOnlyWhenEditable: false,
    placeholder: 'Enter your text...',
  }),
];
