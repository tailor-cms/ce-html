<template>
  <VBtnGroup density="compact" variant="text">
    <Fragment v-for="(group, index) in actions" :key="index">
      <VTooltip v-for="btn in group" :key="btn.label" location="bottom">
        <template #activator="{ props }">
          <VBtn
            :active="'isActive' in btn && editor.isActive(btn.isActive)"
            :aria-label="btn.label"
            :disabled="!editor.can().chain().focus()[btn.action]().run()"
            :icon="`mdi-${btn.icon}`"
            v-bind="props"
            rounded="lg"
            size="36"
            @click="editor.chain().focus()[btn.action]().run()"
          />
        </template>
        {{ btn.label }}
      </VTooltip>
      <VDivider class="mx-1" vertical />
    </Fragment>
  </VBtnGroup>
</template>

<script setup lang="ts">
import { Fragment } from 'vue';

defineProps<{ editor: any }>();

interface Action {
  label: string;
  isActive?: string;
  action: string;
  icon: string;
}

const actions: Action[][] = [
  [
    {
      label: 'Undo',
      action: 'undo',
      icon: 'undo',
    },
    {
      label: 'Redo',
      action: 'redo',
      icon: 'redo',
    },
  ],
  [
    {
      label: 'Bold',
      isActive: 'bold',
      action: 'toggleBold',
      icon: 'format-bold',
    },
    {
      label: 'Italic',
      isActive: 'italic',
      action: 'toggleItalic',
      icon: 'format-italic',
    },
    {
      label: 'Strikethrough',
      isActive: 'strike',
      action: 'toggleStrike',
      icon: 'format-strikethrough',
    },
  ],
  [
    {
      label: 'Horizontal line',
      action: 'setHorizontalRule',
      icon: 'minus',
    },
  ],
  [
    {
      label: 'Numbered list',
      isActive: 'orderedList',
      action: 'toggleOrderedList',
      icon: 'format-list-numbered',
    },
    {
      label: 'Numbered list',
      isActive: 'bulletList',
      action: 'toggleBulletList',
      icon: 'format-list-bulleted',
    },
  ],
  [
    {
      label: 'Quote',
      isActive: 'blockquote',
      action: 'toggleBlockquote',
      icon: 'format-quote-close',
    },
    {
      label: 'Code',
      isActive: 'code',
      action: 'toggleCode',
      icon: 'code-tags',
    },
  ],
];
</script>

<style lang="scss" scoped>
.v-btn + .v-btn {
  margin-left: 0.125rem;
}

.v-btn.v-btn--active {
  color: rgba(var(--v-theme-primary));
}
</style>
