<template>
  <VMenu>
    <template #activator="{ props: menu }">
      <IconButton
        v-bind="menu"
        :disabled="!editor.can().chain().focus().setTextAlign('left').run()"
        icon="mdi-format-align-justify"
        label="Text align"
        dropdown
      />
    </template>
    <VList class="pa-1" density="compact">
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
import IconButton from '../IconButton.vue';

defineProps<{ editor: any }>();

const alignments = ['left', 'center', 'right', 'justify'];
</script>

<style lang="scss" scoped>
.v-list-item + .v-list-item {
  margin-top: 0.125rem;
}
</style>
