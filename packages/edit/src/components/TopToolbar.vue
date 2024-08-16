<template>
  <EditorToolbar v-if="editor" :editor="editor" />
</template>

<script setup lang="ts">
import { defineEmits, defineProps, inject, ref } from 'vue';

import EditorToolbar from './EditorToolbar.vue';

defineProps<{ element: Element }>();
defineEmits(['save']);

const editor = ref();

const elementBus: any = inject('$elementBus');

elementBus.on('initialize', (value: any) => {
  editor.value = value;
});
</script>

<style scoped></style>
