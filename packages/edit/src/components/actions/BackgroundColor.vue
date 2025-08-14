<template>
  <ColorPicker
    :disabled="!editor.can().chain().focus().setBackgroundColor().run()"
    :value="editor.getAttributes('textStyle').backgroundColor"
    icon="mdi-format-color-highlight"
    label="Text highlight"
    @set="editor.chain().focus().setBackgroundColor($event).run()"
    @unset="editor.chain().focus().unsetBackgroundColor().run()"
  />
</template>

<script setup lang="ts">
import ColorPicker from './ColorPicker.vue';

defineProps<{
  editor: any;
}>();
</script>
