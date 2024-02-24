<template>
  <VBtnGroup class="w-100 bg-white">
    <template v-for="(group, index) in actions" :key="index">
      <VTooltip v-for="btn in group" :key="btn.label" location="bottom">
        <template #activator="{ props }">
          <VBtn
            :active="'isActive' in btn && editor.isActive(btn.isActive)"
            :aria-label="btn.label"
            :disabled="!editor.can().chain().focus()[btn.action]().run()"
            :icon="`mdi-${btn.icon}`"
            v-bind="props"
            @click="editor.chain().focus()[btn.action]().run()"
          />
        </template>
        {{ btn.label }}
      </VTooltip>
      <VDivider vertical />
    </template>
  </VBtnGroup>
</template>

<script setup lang="ts">
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
      icon: 'format-strikethrough-variant',
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
