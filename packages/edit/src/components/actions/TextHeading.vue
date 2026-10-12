<template>
  <VMenu :submenu="inMenu">
    <template #activator="{ props: menu }">
      <ToolbarButton
        v-bind="menu"
        :active="editor.isActive({ level: /\d+/ })"
        :icon="`mdi-format-header-${editor.getAttributes('heading').level ?? 'pound'}`"
        :in-menu="inMenu"
        label="Headings"
        dropdown
      />
    </template>
    <VList :lines="false" density="compact" nav>
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
import ToolbarButton from '../ToolbarButton.vue';

defineProps<{ editor: any; inMenu?: boolean }>();
</script>
