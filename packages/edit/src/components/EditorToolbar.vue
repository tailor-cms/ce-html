<template>
  <VBtnGroup density="compact" variant="text">
    <!-- @vue-ignore -->
    <template v-for="(it, index) in toolbarItems" :key="index">
      <IconButton
        v-if="'action' in it"
        :active="'isActive' in it && editor.isActive(it.isActive)"
        :disabled="
          !editor.can().chain().focus()[it.action[0]](it.action[1]).run()
        "
        :icon="`mdi-${it.icon}`"
        :label="it.label"
        @click="editor.chain().focus()[it.action[0]](it.action[1]).run()"
      />
      <component
        :is="it.component"
        v-else-if="'component' in it"
        :editor="editor"
      />
      <VDivider v-else class="mx-1" vertical />
    </template>
  </VBtnGroup>
</template>

<script setup lang="ts">
import { Component as VueComponent } from 'vue';

import AddImage from './actions/AddImage.vue';
import AddLink from './actions/AddLink.vue';
import AddTable from './actions/AddTable.vue';
import FontFamily from './actions/FontFamily.vue';
import FontSize from './actions/FontSize.vue';
import IconButton from './IconButton.vue';
import TextAlign from './actions/TextAlign.vue';
import TextColor from './actions/TextColor.vue';
import TextHeading from './actions/TextHeading.vue';
import TextHighlight from './actions/TextHighlight.vue';

defineProps<{ editor: any }>();

interface Action {
  label: string;
  isActive?: string;
  action: string[];
  icon: string;
}

interface Component {
  component: VueComponent;
}

const toolbarItems: (Action | Component | { type: string })[] = [
  {
    label: 'Undo',
    action: ['undo'],
    icon: 'undo',
  },
  {
    label: 'Redo',
    action: ['redo'],
    icon: 'redo',
  },
  { type: 'divider' },
  { component: TextHeading },
  { component: FontFamily },
  { component: FontSize },
  { type: 'divider' },
  {
    label: 'Bold',
    isActive: 'bold',
    action: ['toggleBold'],
    icon: 'format-bold',
  },
  {
    label: 'Italic',
    isActive: 'italic',
    action: ['toggleItalic'],
    icon: 'format-italic',
  },
  {
    label: 'Underline',
    isActive: 'underline',
    action: ['toggleUnderline'],
    icon: 'format-underline',
  },
  {
    label: 'Strikethrough',
    isActive: 'strike',
    action: ['toggleStrike'],
    icon: 'format-strikethrough',
  },
  { type: 'divider' },
  { component: AddLink },
  { component: AddTable },
  { component: AddImage },
  {
    label: 'Horizontal line',
    action: ['setHorizontalRule'],
    icon: 'minus',
  },
  { type: 'divider' },
  { component: TextColor },
  { component: TextHighlight },
  { type: 'divider' },
  {
    label: 'Numbered list',
    isActive: 'orderedList',
    action: ['toggleOrderedList'],
    icon: 'format-list-numbered',
  },
  {
    label: 'Numbered list',
    isActive: 'bulletList',
    action: ['toggleBulletList'],
    icon: 'format-list-bulleted',
  },
  {
    label: 'Decrease indent',
    action: ['liftListItem', 'listItem'],
    icon: 'format-indent-decrease',
  },
  {
    label: 'Increase indent',
    action: ['sinkListItem', 'listItem'],
    icon: 'format-indent-increase',
  },
  { type: 'divider' },
  { component: TextAlign },
  { type: 'divider' },
  {
    label: 'Superscript',
    isActive: 'superscript',
    action: ['toggleSuperscript'],
    icon: 'format-superscript',
  },
  {
    label: 'Subscript',
    isActive: 'subscript',
    action: ['toggleSubscript'],
    icon: 'format-subscript',
  },
  { type: 'divider' },
  {
    label: 'Quote',
    isActive: 'blockquote',
    action: ['toggleBlockquote'],
    icon: 'format-quote-close',
  },
  {
    label: 'Code',
    isActive: 'code',
    action: ['toggleCode'],
    icon: 'code-tags',
  },
  {
    label: 'Code block',
    isActive: 'codeBlock',
    action: ['toggleCodeBlock'],
    icon: 'code-block-tags',
  },
  { type: 'divider' },
  {
    label: 'Clear formatting',
    action: ['unsetAllMarks'],
    icon: 'format-clear',
  },
];
</script>

<style lang="scss" scoped>
.v-btn-group {
  display: flex;
  flex-wrap: wrap;
  height: unset;
}

:deep(.v-btn + .v-btn) {
  margin-left: 0.125rem;
}

:deep(.v-btn.v-btn--active) {
  color: rgba(var(--v-theme-primary));
}
</style>
