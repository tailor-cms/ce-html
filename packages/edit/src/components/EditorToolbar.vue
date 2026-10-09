<template>
  <div
    ref="root"
    aria-label="Text formatting"
    class="editor-toolbar"
    role="group"
  >
    <ToolbarGroup
      v-for="(group, i) in groups"
      v-show="i < visibleCount"
      :key="i"
      :ref="(it: any) => (groupEls[i] = it?.$el)"
      :class="{ separated: i > 0 }"
      :editor="editor"
      :items="group"
    />
    <!-- Closed by onTransaction; closing on content click would also close
      submenus as they open -->
    <VMenu
      v-if="hiddenGroups.length"
      v-model="isOverflowOpen"
      :close-on-content-click="false"
      location="bottom end"
    >
      <template #activator="{ props: menu }">
        <ToolbarButton
          v-bind="menu"
          class="ms-auto"
          icon="mdi-dots-horizontal"
          label="More formatting options"
        />
      </template>
      <VList :lines="false" density="compact" min-width="220" role="menu" nav>
        <template v-for="(group, i) in hiddenGroups" :key="i">
          <VDivider v-if="i" class="my-1" />
          <ToolbarGroup :editor="editor" :items="group" in-menu />
        </template>
      </VList>
    </VMenu>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { drop, findLast, map, range, sum, take } from 'lodash-es';

import AddImage from './actions/AddImage.vue';
import AddLink from './actions/AddLink.vue';
import AddTable from './actions/AddTable.vue';
import AddTooltip from './actions/AddTooltip.vue';
import BackgroundColor from './actions/BackgroundColor.vue';
import FontFamily from './actions/FontFamily.vue';
import FontSize from './actions/FontSize.vue';
import TextAlign from './actions/TextAlign.vue';
import TextColor from './actions/TextColor.vue';
import TextHeading from './actions/TextHeading.vue';
import ToolbarButton from './ToolbarButton.vue';
import ToolbarGroup from './ToolbarGroup.vue';
import type { ToolbarItem } from './ToolbarGroup.vue';

const props = defineProps<{ editor: any }>();

const groups: ToolbarItem[][] = [
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
      icon: 'format-strikethrough-variant',
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
      label: 'Bullet list',
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
    {
      label: 'Clear formatting',
      action: ['unsetAllMarks'],
      icon: 'format-clear',
    },
  ],
];

// ToolbarButton default size plus spacing before it
const MORE_BTN_WIDTH = 34;

const root = ref<HTMLElement>();
const groupEls: HTMLElement[] = [];
const isOverflowOpen = ref(false);

// Groups from this index on are moved to the overflow menu
const visibleCount = ref(groups.length);
const hiddenGroups = computed(() => drop(groups, visibleCount.value));

// Hides groups right to left until the rest fit beside the more button
const getVisibleCount = (groupWidths: number[], width: number) => {
  const widthOf = (count: number) => sum(take(groupWidths, count));
  if (widthOf(groups.length) <= width) return groups.length;
  const canShow = (count: number) => widthOf(count) <= width - MORE_BTN_WIDTH;
  return findLast(range(groups.length), canShow) ?? 0;
};

// Closes the menu once a command runs; focus changes dispatch
// transactions too, but aren't actions
const onTransaction = ({ transaction }: { transaction: any }) => {
  if (!transaction.getMeta('focus') && !transaction.getMeta('blur')) {
    isOverflowOpen.value = false;
  }
};

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  props.editor.on('transaction', onTransaction);
  // Buttons have fixed sizes, so group widths are measured once
  const groupWidths = map(groupEls, 'offsetWidth');
  resizeObserver = new ResizeObserver(([entry]) => {
    visibleCount.value = getVisibleCount(groupWidths, entry.contentRect.width);
  });
  resizeObserver.observe(root.value!);
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  props.editor.off('transaction', onTransaction);
});
</script>

<style lang="scss" scoped>
.editor-toolbar {
  display: flex;
  flex: 1 1 0%;
  align-items: center;
  justify-content: flex-start;
  min-width: 0;
}

.separated::before {
  content: '';
  align-self: stretch;
  width: 1px;
  // Group spacing lives here so it's part of the measured group widths
  margin: 0.25rem 0.125rem 0.25rem 0.25rem;
  background: rgba(var(--v-border-color), var(--v-border-opacity));
}
</style>
