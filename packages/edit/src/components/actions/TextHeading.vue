<template>
  <VMenu>
    <template #activator="{ props: menu }">
      <VTooltip location="bottom">
        <template #activator="{ props: tooltip }">
          <VBtn
            :active="editor.isActive({ level: /\d+/ })"
            aria-label="Text heading"
            class="pa-0"
            min-width="46"
            rounded="lg"
            v-bind="mergeProps(menu, tooltip)"
          >
            <VIcon class="ml-1 mr-n1" size="24">
              mdi-format-header-{{
                editor.getAttributes('heading').level ?? 'pound'
              }}
            </VIcon>
            <VIcon small>mdi-menu-down</VIcon>
          </VBtn>
        </template>
        Headings
      </VTooltip>
    </template>
    <VList class="pa-1" color="primary" density="compact">
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
import { mergeProps } from 'vue';

defineProps<{ editor: any }>();
</script>

<style lang="scss" scoped>
.v-list-item + .v-list-item {
  margin-top: 0.125rem;
}
</style>
