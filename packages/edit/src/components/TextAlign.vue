<template>
  <VMenu>
    <template #activator="{ props: menu }">
      <VTooltip location="bottom">
        <template #activator="{ props: tooltip }">
          <VBtn
            aria-label="Text align"
            class="pa-0"
            min-width="54"
            v-bind="mergeProps(menu, tooltip)"
          >
            <VIcon size="24">mdi-format-align-justify</VIcon>
            <VIcon small>mdi-menu-down</VIcon>
          </VBtn>
        </template>
        Text align
      </VTooltip>
    </template>
    <VList class="pa-1" color="primary" density="compact">
      <VListItem
        v-for="textAlign in alignments"
        :key="textAlign"
        :active="editor.isActive({ textAlign })"
        class="px-2"
        min-height="36"
        rounded="sm"
        @click="editor.chain().focus().setTextAlign(textAlign).run()"
      >
        <VListItemTitle class="text-capitalize">
          <VIcon class="mr-1" size="small" aria-hidden>
            mdi-format-align-{{ textAlign }}
          </VIcon>
          {{ textAlign }}
        </VListItemTitle>
      </VListItem>
    </VList>
  </VMenu>
</template>

<script setup lang="ts">
import { mergeProps } from 'vue';

defineProps<{ editor: any }>();

const alignments = ['left', 'center', 'right', 'justify'];
</script>

<style lang="scss" scoped>
.v-list-item + .v-list-item {
  margin-top: 0.125rem;
}
</style>
