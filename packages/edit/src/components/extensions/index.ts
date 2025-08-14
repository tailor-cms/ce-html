import { Table, TableRow, TableCell, TableHeader } from '@tiptap/extension-table'
import StarterKit from '@tiptap/starter-kit';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyleKit } from '@tiptap/extension-text-style';
import { Placeholder } from '@tiptap/extensions';

import Image from './image.ts';
import Link from './link.ts';
import Paragraph from './paragraph.ts';
import Tooltip from './tooltip.ts';

export default [
  Image,
  Link.configure({ openOnClick: false }),
  Tooltip,
  StarterKit.configure({ paragraph: false }),
  Subscript,
  Superscript,
  Table.configure({ resizable: true }),
  TableCell,
  TableHeader,
  TableRow,
  TextStyleKit,
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Paragraph,
  Placeholder.configure({
    showOnlyWhenEditable: false,
    placeholder: 'Enter your text...',
  }),
];
