<template>
  <VBtnGroup density="compact" variant="text">
    <template v-for="(btn, index) in toolbarItems">
      <VTooltip v-if="'action' in btn" :key="btn.label" location="bottom">
        <template #activator="{ props }">
          <VBtn
            :active="'isActive' in btn && editor.isActive(btn.isActive)"
            :aria-label="btn.label"
            :disabled="
              !editor.can().chain().focus()[btn.action[0]](btn.action[1]).run()
            "
            :icon="`mdi-${btn.icon}`"
            v-bind="props"
            rounded="lg"
            size="36"
            @click="editor.chain().focus()[btn.action[0]](btn.action[1]).run()"
          />
        </template>
        {{ btn.label }}
      </VTooltip>
      <component
        :is="btn.component"
        v-else-if="'component' in btn"
        :key="btn.component"
      />
      <VDivider v-else :key="index" class="mx-1" vertical />
    </template>
  </VBtnGroup>
</template>

<script setup lang="ts">
defineProps<{ editor: any }>();

interface Action {
  label: string;
  isActive?: string;
  action: string[];
  icon: string;
}

interface Component {
  component: string;
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
  {
    label: 'Horizontal line',
    action: ['setHorizontalRule'],
    icon: 'minus',
  },
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
    isActive: 'bulletList',
    action: ['liftListItem', 'listItem'],
    icon: 'format-indent-decrease',
  },
  {
    label: 'Increase indent',
    isActive: 'bulletList',
    action: ['sinkListItem', 'listItem'],
    icon: 'format-indent-increase',
  },
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
  { type: 'divider' },
  {
    label: 'Clear formatting',
    action: ['unsetAllMarks'],
    icon: 'format-clear',
  },
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
