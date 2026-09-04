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
    <VList density="compact" lines="1" nav>
      <VListItem
        v-for="level in [1, 2, 3, 4, 5, 6]"
        :key="level"
        :active="editor.isActive({ level })"
        :title="`Heading ${level}`"
        @click="editor.chain().focus().toggleHeading({ level }).run()"
      />
      <VListItem
        :active="editor.isActive('paragraph')"
        title="Normal"
        @click="editor.chain().focus().setParagraph().run()"
      />
    </VList>
  </VMenu>
</template>

<script setup lang="ts">
import IconButton from '../IconButton.vue';

defineProps<{ editor: any }>();
</script>
