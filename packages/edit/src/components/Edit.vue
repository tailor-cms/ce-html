<template>
  <div class="tce-container">
    <EditorContent v-if="editor" :editor="editor" />
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, inject, watch } from 'vue';
import { EditorContent, useEditor } from '@tiptap/vue-3';
import { Element } from '@tailor-cms/ce-html-default-manifest';

import extensions from './extensions';

const props = defineProps<{ element: Element; isFocused: boolean }>();
const emit = defineEmits(['save']);

const elementBus: any = inject('$elementBus');

const editor = useEditor({
  content: props.element.data.content,
  extensions
}) as any;

watch(
  () => props.isFocused,
  (val) => {
    if (!val && editor.value) emit('save', { content: editor.value.getHTML() });
    elementBus.emit('initialize', editor.value);
  },
);
</script>

<style lang="scss" scoped>
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
    font-family: 'JetBrainsMono', monospace;
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
}
</style>
