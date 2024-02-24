<template>
  <VBtnGroup class="w-100 bg-white">
    <VBtn
      v-for="btn in actions"
      :key="btn.name"
      :active="editor.isActive(btn.name)"
      :disabled="!editor.can().chain().focus()[btn.action]().run()"
      :icon="`mdi-${btn.icon}`"
      @click="editor.chain().focus()[btn.action]().run()"
    />
  </VBtnGroup>
</template>

<script setup lang="ts">
defineProps<{ editor: any }>();

const actions = [
  {
    name: 'bold',
    action: 'toggleBold',
    icon: 'format-bold',
  },
  {
    name: 'italic',
    action: 'toggleItalic',
    icon: 'format-italic',
  },
  {
    name: 'strike',
    action: 'toggleStrike',
    icon: 'format-strikethrough-variant',
  },
  {
    name: 'code',
    action: 'toggleCode',
    icon: 'code-tags',
  },
];
</script>
