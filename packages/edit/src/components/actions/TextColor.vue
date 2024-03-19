<template>
  <ColorPicker
    :disabled="!editor.can().chain().focus().setColor().run()"
    :value="editor.getAttributes('textStyle').color"
    icon="mdi-format-color-text"
    label="Text color"
    @set="editor.chain().focus().setColor($event).run()"
    @unset="editor.chain().focus().unsetColor().run()"
  />
</template>

<script setup lang="ts">
import ColorPicker from './ColorPicker.vue';

defineProps<{
  editor: any;
}>();
</script>
