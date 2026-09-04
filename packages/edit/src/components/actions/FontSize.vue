<template>
  <VMenu>
    <template #activator="{ props: menu }">
      <IconButton
        v-bind="menu"
        :active="!!editor.getAttributes('textStyle').fontSize"
        :disabled="!editor.can().chain().focus().setFontSize().run()"
        icon="mdi-format-size"
        label="Font size"
        dropdown
      />
    </template>
    <VList class="pa-1" density="compact" max-height="220">
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
import { FONT_SIZES } from './constants';
import IconButton from '../IconButton.vue';

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
