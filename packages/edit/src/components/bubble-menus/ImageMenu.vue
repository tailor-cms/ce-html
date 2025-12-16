<template>
  <BubbleMenu :editor="editor" :should-show="() => editor.isActive('image')">
    <VCard class="pa-1" rounded="lg">
      <VBtnGroup density="compact" variant="text">
        <IconButton
          v-for="{ width, label, icon } in sizes"
          :key="label"
          :active="editor.getAttributes('image').width === width"
          :icon="icon"
          :label="label"
          @click="setWidth(width)"
        />
      </VBtnGroup>
    </VCard>
  </BubbleMenu>
</template>

<script setup lang="ts">
import { BubbleMenu } from '@tiptap/vue-3/menus';

import IconButton from '../IconButton.vue';

const sizes = [
  { width: '25%', label: 'Small', icon: 'mdi-size-s' },
  { width: '50%', label: 'Medium', icon: 'mdi-size-m' },
  { width: '100%', label: 'Large', icon: 'mdi-size-xl' },
];

const props = defineProps<{ editor: any }>();

function setWidth(value: string) {
  const current = props.editor.getAttributes('image').width;
  const width = current !== value ? value : undefined;
  props.editor.chain().focus().updateAttributes('image', { width }).run();
}
</script>

<style lang="scss" scoped>
:deep(.v-btn + .v-btn) {
  margin-left: 0.125rem;
}

:deep(.v-btn.v-btn--active) {
  color: rgba(var(--v-theme-primary));
}
</style>
