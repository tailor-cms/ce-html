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
import debounce from 'lodash/debounce';
import { Element } from '@tailor-cms/ce-html-manifest';

import extensions from './extensions';
import ImageMenu from './bubble-menus/ImageMenu.vue';
import TableMenu from './bubble-menus/TableMenu.vue';

const SAVE_DEBOUNCE = 3000;

const props = defineProps<{
  element: Element;
  isFocused: boolean;
  isDisabled: boolean;
}>();
const emit = defineEmits(['save']);

const elementBus: any = inject('$elementBus');

const editor = useEditor({
  content: props.element.data.content,
  extensions,
  editable: !props.isDisabled && props.isFocused,
  onUpdate: debounce(() => save(), SAVE_DEBOUNCE),
});

const save = () => {
  const content = editor.value?.isEmpty ? '' : editor.value?.getHTML();
  return emit('save', { ...props.element.data, content });
};

watch(
  () => props.isFocused,
  () => {
    const { isDisabled, isFocused } = props;
    editor.value?.setOptions({ editable: !isDisabled && isFocused });
    if (!isFocused) return save();
    if (!isDisabled) {
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

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;

    &.ProseMirror-selectednode {
      outline: 2px solid #68cef8;
    }
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
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
