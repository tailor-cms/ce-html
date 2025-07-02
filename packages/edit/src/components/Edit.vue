<template>
  <div class="tce-container">
    <ImageMenu v-if="editor" :editor="editor" />
    <TableMenu v-if="editor" :editor="editor" />
    <EditorContent v-if="editor" :editor="editor" />
  </div>
</template>

<script lang="ts" setup>
import { EditorContent, useEditor } from '@tiptap/vue-3';
import { inject, nextTick, watch } from 'vue';
import { debounce } from 'lodash-es';
import { Element } from '@tailor-cms/ce-html-manifest';

import extensions from './extensions';
import ImageMenu from './bubble-menus/ImageMenu.vue';
import TableMenu from './bubble-menus/TableMenu.vue';

const SAVE_DEBOUNCE = 3000;

const props = defineProps<{
  element: Element;
  isDragged: boolean;
  isFocused: boolean;
  isReadonly: boolean;
}>();
const emit = defineEmits(['save']);

const elementBus: any = inject('$elementBus');

const editor = useEditor({
  content: props.element.data.content,
  extensions,
  editable: !props.isReadonly && props.isFocused,
  onUpdate: debounce(() => save(), SAVE_DEBOUNCE),
});

const save = () => {
  const content = editor.value?.isEmpty ? '' : editor.value?.getHTML();
  return emit('save', { ...props.element.data, content });
};

watch(
  () => props.isFocused,
  () => {
    const { isReadonly, isFocused } = props;
    editor.value?.setOptions({ editable: !isReadonly && isFocused });
    if (!isFocused) return save();
    if (!isReadonly) {
      editor.value?.commands.focus();
      nextTick(() => elementBus.emit('initialize', editor.value));
    }
  },
);

watch(
  () => props.element.data.content,
  (value) => {
    if (!editor.value) return;
    const isSame = editor.value.getHTML() === value;
    return !isSame && editor.value?.commands.setContent(value, false);
  },
);
</script>

<style lang="scss" scoped>
.tce-container {
  text-align: left;
}

:deep(.ProseMirror) {
  min-height: 5rem;
  padding: 0.5rem;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  outline: none;

  & p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    height: 0;
    opacity: 0.5;
    float: left;
    pointer-events: none;
  }

  > * + * {
    margin-top: 0.75em;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2.25rem;
  }

  h3 {
    font-size: 2rem;
  }

  h4 {
    font-size: 1.75rem;
  }

  h5 {
    font-size: 1.5rem;
  }

  h6 {
    font-size: 1.25rem;
  }

  blockquote {
    padding: 0.25rem 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-style: italic;
  }

  ul,
  ol {
    padding: 0 1.25rem;
  }

  code {
    font-family: 'Source Code Pro', monospace !important;
    background: #eee;
    padding: 0.125rem 0.5rem;
    border-radius: 8px;
  }

  pre {
    padding: 0.5rem 1rem;
    border-radius: 8px;
    background: #eee;
    white-space: pre-wrap;

    code {
      padding: 0;
      font-size: 0.875rem;
      background: none;
    }
  }

  img {
    max-width: 100%;
    height: auto;

    &.ProseMirror-selectednode {
      outline: 2px solid #68cef8;
    }
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }

  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;

    td,
    th {
      min-width: 1em;
      border: 2px solid #ced4da;
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      font-weight: bold;
      text-align: left;
      background-color: #f1f3f5;
    }

    .selectedCell:after {
      z-index: 2;
      position: absolute;
      content: '';
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(200, 200, 255, 0.4);
      pointer-events: none;
    }

    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: -2px;
      width: 4px;
      background-color: #adf;
      pointer-events: none;
    }

    p {
      margin: 0;
    }
  }
}
</style>
