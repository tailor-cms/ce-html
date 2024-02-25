<template>
  <ColorPicker
    :disabled="!editor.can().chain().focus().setHighlight().run()"
    :value="editor.getAttributes('highlight').color"
    icon="mdi-format-color-highlight"
    label="Text Highlight"
    @set="editor.chain().focus().setHighlight({ color: $event }).run()"
    @unset="editor.chain().focus().unsetHighlight().run()"
  />
</template>

<script setup lang="ts">
import ColorPicker from './ColorPicker.vue';

defineProps<{
  editor: any;
}>();
</script>
