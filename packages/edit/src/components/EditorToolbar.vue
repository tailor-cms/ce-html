<template>
  <VBtnGroup density="compact" variant="text">
    <template v-for="(group, i) in toolbarItems" :key="i">
      <VDivider v-if="i" class="mx-1" vertical />
      <!-- @vue-ignore -->
      <template v-for="(it, j) in group" :key="j">
        <component
          :is="it.component"
          v-if="'component' in it"
          :editor="editor"
        />
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
      </template>
    </template>
  </VBtnGroup>
</template>

<script setup lang="ts">
import { Component as VueComponent } from 'vue';

import AddImage from './actions/AddImage.vue';
import AddLink from './actions/AddLink.vue';
import AddTable from './actions/AddTable.vue';
import AddTooltip from './actions/AddTooltip.vue';
import BackgroundColor from './actions/BackgroundColor.vue';
import FontFamily from './actions/FontFamily.vue';
import FontSize from './actions/FontSize.vue';
import IconButton from './IconButton.vue';
import TextAlign from './actions/TextAlign.vue';
import TextColor from './actions/TextColor.vue';
import TextHeading from './actions/TextHeading.vue';

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

const toolbarItems: (Action | Component)[][] = [
  [
    { label: 'Undo', action: ['undo'], icon: 'undo' },
    { label: 'Redo', action: ['redo'], icon: 'redo' },
  ],
  [
    { component: TextHeading },
    { component: FontFamily },
    { component: FontSize },
  ],
  [
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
  ],
  [
    { component: AddLink },
    { component: AddTable },
    { component: AddImage },
    { component: AddTooltip },
    {
      label: 'Horizontal line',
      action: ['setHorizontalRule'],
      icon: 'minus',
    },
  ],
  [{ component: TextColor }, { component: BackgroundColor }],
  [
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
  ],
  [{ component: TextAlign }],
  [
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
  ],
  [
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
  ],
  [
    {
      label: 'Clear formatting',
      action: ['unsetAllMarks'],
      icon: 'format-clear',
    },
  ],
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
