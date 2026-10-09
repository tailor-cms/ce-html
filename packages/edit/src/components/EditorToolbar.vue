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
    <!-- Closing on content click would also close submenus as they open;
      the menu closes once an action runs instead (see onTransaction) -->
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
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

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
  ],
  [
    {
      label: 'Clear formatting',
      action: ['unsetAllMarks'],
      icon: 'format-clear',
    },
  ],
];

// Matches the ToolbarButton default size.
const MORE_BTN_WIDTH = 30;

const root = ref<HTMLElement>();
const groupEls: HTMLElement[] = [];
// Last measured width per group; hidden groups keep their cached width.
const groupWidths: number[] = [];
const isOverflowOpen = ref(false);
// Groups from this index on are moved to the overflow menu.
const visibleCount = ref(groups.length);
const hiddenGroups = computed(() => groups.slice(visibleCount.value));

const getWidth = (count: number, gap: number) =>
  groupWidths.slice(0, count).reduce((sum, it) => sum + it, 0) +
  gap * Math.max(count - 1, 0);

const countHiddenItems = (count: number) => groups.slice(count).flat().length;

const layout = () => {
  const el = root.value;
  if (!el) return;
  groupEls.forEach((it, i) => {
    if (it?.offsetWidth) groupWidths[i] = it.offsetWidth;
  });
  const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
  const available = el.clientWidth;
  let count = groups.length;
  if (getWidth(count, gap) > available) {
    const budget = available - MORE_BTN_WIDTH - gap;
    // Groups move to the overflow menu from right to left; a menu with a
    // single item would just swap it for the more button.
    while (
      count > 0 &&
      (getWidth(count, gap) > budget || countHiddenItems(count) < 2)
    ) {
      count--;
    }
  }
  visibleCount.value = count;
};

// Every toolbar action runs an editor command, which dispatches a
// transaction; focus changes do too, but are not actions.
const onTransaction = ({ transaction }: { transaction: any }) => {
  if (!transaction.getMeta('focus') && !transaction.getMeta('blur')) {
    isOverflowOpen.value = false;
  }
};

watch(
  () => props.editor,
  (editor, prevEditor) => {
    prevEditor?.off('transaction', onTransaction);
    editor?.on('transaction', onTransaction);
  },
  { immediate: true },
);

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  layout();
  resizeObserver = new ResizeObserver(() => layout());
  if (root.value) resizeObserver.observe(root.value);
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  props.editor?.off('transaction', onTransaction);
});
</script>

<style lang="scss" scoped>
.editor-toolbar {
  display: flex;
  flex: 1 1 0%;
  align-items: center;
  justify-content: flex-start;
  gap: 0.125rem;
  min-width: 0;
}

.separated::before {
  content: '';
  align-self: stretch;
  width: 1px;
  margin: 0.25rem 0.125rem;
  background: rgba(var(--v-border-color), var(--v-border-opacity));
}
</style>
