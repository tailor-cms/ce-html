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
    <VList density="compact" lines="1" max-height="220" nav>
      <VListItem
        v-for="fontSize in FONT_SIZES"
        :key="fontSize"
        :active="editor.isActive({ fontSize })"
        :title="fontSize"
        @click="toggle(fontSize)"
      />
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
