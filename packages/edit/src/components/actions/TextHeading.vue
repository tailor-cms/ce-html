<template>
  <VMenu>
    <template #activator="{ props: menu }">
      <IconButton
        v-bind="menu"
        :active="editor.isActive({ level: /\d+/ })"
        :icon="`mdi-format-header-${editor.getAttributes('heading').level ?? 'pound'}`"
        label="Headings"
        dropdown
      />
    </template>
    <VList class="pa-1" density="compact">
      <VListItem
        v-for="level in [1, 2, 3, 4, 5, 6]"
        :key="level"
        :active="editor.isActive({ level })"
        class="px-2"
        min-height="36"
        rounded="sm"
        @click="editor.chain().focus().toggleHeading({ level }).run()"
      >
        <VListItemTitle>Heading {{ level }}</VListItemTitle>
      </VListItem>
      <VListItem
        :active="editor.isActive('paragraph')"
        class="px-2"
        min-height="36"
        rounded="sm"
        @click="editor.chain().focus().setParagraph().run()"
      >
        <VListItemTitle>Normal</VListItemTitle>
      </VListItem>
    </VList>
  </VMenu>
</template>

<script setup lang="ts">
import IconButton from '../IconButton.vue';

defineProps<{ editor: any }>();
</script>

<style lang="scss" scoped>
.v-list-item + .v-list-item {
  margin-top: 0.125rem;
}
</style>
