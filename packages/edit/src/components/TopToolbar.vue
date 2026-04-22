<template>
  <EditorToolbar v-if="editor" :editor="editor" />
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import type { Element, ElementData } from '@tailor-cms/ce-html-manifest';

import EditorToolbar from './EditorToolbar.vue';

defineProps<{ element: Element }>();
defineEmits<{ save: [data: ElementData] }>();

const editor = ref();

const elementBus: any = inject('$elementBus');

elementBus.on('initialize', (value: any) => {
  editor.value = value;
});
</script>

<style scoped></style>
