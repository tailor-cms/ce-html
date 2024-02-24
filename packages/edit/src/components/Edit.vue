<template>
  <div class="tce-container">
    <EditorContent v-if="editor" :editor="editor" />
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, inject, watch } from 'vue';
import { EditorContent, useEditor } from '@tiptap/vue-3';
import { Element } from 'tce-manifest';
import StarterKit from '@tiptap/starter-kit';

const props = defineProps<{ element: Element; isFocused: boolean }>();
const emit = defineEmits(['save']);

const elementBus: any = inject('$elementBus');

const editor = useEditor({
  content: props.element.data.content,
  extensions: [StarterKit],
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
:deep(.tiptap) {
  min-height: 5rem;
  padding: 1rem;
  border: 1px solid #888;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;

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
