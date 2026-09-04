<template>
  <VMenu>
    <template #activator="{ props: menu }">
      <IconButton
        v-bind="menu"
        :active="!!editor.getAttributes('textStyle').fontFamily"
        :disabled="!editor.can().chain().focus().setFontFamily().run()"
        icon="mdi-format-font"
        label="Font family"
        dropdown
      />
    </template>
    <VList :lines="false" density="compact" nav>
      <VListItem
        v-for="fontFamily in FONT_FAMILIES"
        :key="fontFamily"
        :active="editor.isActive('textStyle', { fontFamily })"
        :disabled="!editor.can().chain().focus().setFontFamily().run()"
        @click="toggle(fontFamily)"
      >
        <VListItemTitle :style="`font-family: ${fontFamily}`">
          {{ fontFamily }}
        </VListItemTitle>
      </VListItem>
    </VList>
  </VMenu>
</template>

<script setup lang="ts">
import { FONT_FAMILIES } from './constants';
import IconButton from '../IconButton.vue';

const props = defineProps<{ editor: any }>();

const toggle = (fontFamily: string) =>
  props.editor.isActive({ fontFamily })
    ? props.editor.chain().focus().unsetFontFamily().run()
    : props.editor.chain().focus().setFontFamily(fontFamily).run();
</script>
