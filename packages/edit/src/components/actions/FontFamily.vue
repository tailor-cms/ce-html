<template>
  <VMenu>
    <template #activator="{ props: menu }">
      <VTooltip location="bottom">
        <template #activator="{ props: tooltip }">
          <VBtn
            :active="!!editor.getAttributes('textStyle').fontFamily"
            aria-label="Text align"
            class="pa-0"
            min-width="54"
            rounded="lg"
            v-bind="mergeProps(menu, tooltip)"
          >
            <VIcon size="24">mdi-format-font</VIcon>
            <div>
              <VIcon small>mdi-menu-down</VIcon>
            </div>
          </VBtn>
        </template>
        Text align
      </VTooltip>
    </template>
    <VList class="pa-1" color="primary" density="compact">
      <VListItem
        v-for="fontFamily in fontFamilies"
        :key="fontFamily"
        :active="editor.isActive('textStyle', { fontFamily })"
        class="px-2"
        min-height="36"
        rounded="sm"
        @click="editor.chain().focus().setFontFamily(fontFamily).run()"
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

defineProps<{ editor: any }>();

const fontFamilies = [
  'Helvetica',
  'Arial',
  'Georgia',
  'Impact',
  'Tahoma',
  'Times New Roman',
  'Verdana',
];
</script>

<style lang="scss" scoped>
.v-list-item + .v-list-item {
  margin-top: 0.125rem;
}
</style>
