<template>
  <VMenu>
    <template #activator="{ props: menu }">
      <VTooltip location="bottom">
        <template #activator="{ props: tooltip }">
          <VBtn
            :active="!!editor.getAttributes('textStyle').fontSize"
            :disabled="!editor.can().chain().focus().setFontSize().run()"
            aria-label="Font Size"
            class="pa-0"
            min-width="54"
            rounded="lg"
            v-bind="mergeProps(menu, tooltip)"
          >
            <VIcon size="24">mdi-format-size</VIcon>
            <VIcon small>mdi-menu-down</VIcon>
          </VBtn>
        </template>
        Font Size
      </VTooltip>
    </template>
    <VList class="pa-1" color="primary" density="compact" max-height="176">
      <VListItem
        v-for="fontSize in fontSizes"
        :key="fontSize"
        :active="editor.isActive({ fontSize })"
        class="px-2"
        min-height="36"
        rounded="sm"
        @click="toggle(fontSize)"
      >
        <VListItemTitle class="text-capitalize">{{ fontSize }}</VListItemTitle>
      </VListItem>
    </VList>
  </VMenu>
</template>

<script setup lang="ts">
import { mergeProps } from 'vue';

const props = defineProps<{ editor: any }>();

const fontSizes = [
  '8px',
  '9px',
  '10px',
  '11px',
  '12px',
  '14px',
  '16px',
  '18px',
  '24px',
  '30px',
  '36px',
  '48px',
  '60px',
  '72px',
  '96px',
];

const toggle = (fontSize) =>
  props.editor.isActive({ fontSize })
    ? props.editor.chain().focus().unsetFontSize().run()
    : props.editor.chain().focus().setFontSize(fontSize).run();
</script>

<style lang="scss" scoped>
.v-list-item + .v-list-item {
  margin-top: 0.125rem;
}

:deep(.v-btn__content) {
  border-radius: inherit;
}

.menu-icon {
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
}
</style>
