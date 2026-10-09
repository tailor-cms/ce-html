<template>
  <VMenu :submenu="inMenu">
    <template #activator="{ props: menu }">
      <ToolbarButton
        v-bind="menu"
        :active="!!editor.getAttributes('textStyle').fontSize"
        :disabled="!editor.can().chain().focus().setFontSize().run()"
        :in-menu="inMenu"
        icon="mdi-format-size"
        label="Font size"
        dropdown
      />
    </template>
    <VList :lines="false" density="compact" max-height="220" nav>
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
import ToolbarButton from '../ToolbarButton.vue';

const props = defineProps<{ editor: any; inMenu?: boolean }>();

const toggle = (fontSize: string) =>
  props.editor.isActive({ fontSize })
    ? props.editor.chain().focus().unsetFontSize().run()
    : props.editor.chain().focus().setFontSize(fontSize).run();
</script>
