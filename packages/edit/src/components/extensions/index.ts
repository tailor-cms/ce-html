import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from '@tiptap/extension-table';
import OfficePaste from '@intevation/tiptap-extension-office-paste';
import { Placeholder } from '@tiptap/extensions';
import StarterKit from '@tiptap/starter-kit';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyleKit } from '@tiptap/extension-text-style';

import Image from './image.ts';
import Link from './link.ts';
import Tooltip from './tooltip.ts';

export default [
  OfficePaste,
  Image,
  Link.configure({ openOnClick: false }),
  Tooltip,
  StarterKit.configure({ link: false }),
  Subscript,
  Superscript,
  Table.configure({ resizable: true }),
  TableCell,
  TableHeader,
  TableRow,
  TextStyleKit,
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Placeholder.configure({
    showOnlyWhenEditable: false,
    placeholder: 'Enter your text...',
  }),
];
