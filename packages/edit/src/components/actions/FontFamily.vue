<template>
  <VMenu>
    <template #activator="{ props: menu }">
      <VTooltip location="bottom">
        <template #activator="{ props: tooltip }">
          <VBtn
            :active="!!editor.getAttributes('textStyle').fontFamily"
            :disabled="!editor.can().chain().focus().setFontFamily().run()"
            aria-label="Text align"
            class="pa-0"
            min-width="46"
            rounded="lg"
            v-bind="mergeProps(menu, tooltip)"
          >
            <VIcon class="ml-1 mr-n1" size="24">mdi-format-font</VIcon>
            <div>
              <VIcon small>mdi-menu-down</VIcon>
            </div>
          </VBtn>
        </template>
        Font family
      </VTooltip>
    </template>
    <VList class="pa-1" color="primary" density="compact">
      <VListItem
        v-for="fontFamily in fontFamilies"
        :key="fontFamily"
        :active="editor.isActive('textStyle', { fontFamily })"
        :disabled="!editor.can().chain().focus().setFontFamily().run()"
        class="px-2"
        min-height="36"
        rounded="sm"
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
import { mergeProps } from 'vue';

const props = defineProps<{ editor: any }>();

const fontFamilies = [
  'Helvetica',
  'Arial',
  'Georgia',
  'Impact',
  'Tahoma',
  'Times New Roman',
  'Verdana',
];

const toggle = (fontFamily: string) =>
  props.editor.isActive({ fontFamily })
    ? props.editor.chain().focus().unsetFontFamily().run()
    : props.editor.chain().focus().setFontFamily(fontFamily).run();
</script>

<style lang="scss" scoped>
.v-list-item + .v-list-item {
  margin-top: 0.125rem;
}
</style>
