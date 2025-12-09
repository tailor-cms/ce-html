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
            min-width="46"
            rounded="lg"
            v-bind="mergeProps(menu, tooltip)"
          >
            <VIcon class="ml-1 mr-n1" size="24">mdi-format-size</VIcon>
            <VIcon small>mdi-menu-down</VIcon>
          </VBtn>
        </template>
        Font size
      </VTooltip>
    </template>
    <VList class="pa-1" color="primary" density="compact" max-height="220">
      <VListItem
        v-for="fontSize in FONT_SIZES"
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

import { FONT_SIZES } from './constants';

const props = defineProps<{ editor: any }>();

const toggle = (fontSize: string) =>
  props.editor.isActive({ fontSize })
    ? props.editor.chain().focus().unsetFontSize().run()
    : props.editor.chain().focus().setFontSize(fontSize).run();
</script>

<style lang="scss" scoped>
.v-list-item + .v-list-item {
  margin-top: 0.125rem;
}
</style>
