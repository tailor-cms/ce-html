import CharacterCount from '@tiptap/extension-character-count';
import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';

import FontSize from './font-size.ts';
import Image from './image.ts';
import Link from './link.ts';
import Paragraph from './paragraph.ts';

export default [
  Color,
  CharacterCount,
  FontFamily,
  FontSize,
  Image,
  Link.configure({ openOnClick: false }),
  StarterKit.configure({ paragraph: false }),
  Subscript,
  Superscript,
  Underline,
  Table.configure({
    resizable: true,
  }),
  TableCell,
  TableHeader,
  TableRow,
  TextStyle,
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Paragraph,
  Highlight.configure({ multicolor: true }),
  Placeholder.configure({
    showOnlyWhenEditable: false,
    placeholder: 'Enter your text...',
  }),
];
