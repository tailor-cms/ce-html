<template>
  <VMenu :submenu="inMenu">
    <template #activator="{ props: menu }">
      <ToolbarButton
        v-bind="menu"
        :disabled="!editor.can().chain().focus().setTextAlign('left').run()"
        :in-menu="inMenu"
        icon="mdi-format-align-justify"
        label="Text align"
        dropdown
      />
    </template>
    <VList :lines="false" density="compact" nav>
      <VListItem
        v-for="textAlign in alignments"
        :key="textAlign"
        :active="editor.isActive({ textAlign })"
        @click="editor.chain().focus().setTextAlign(textAlign).run()"
      >
        <VListItemTitle class="text-capitalize">
          <VIcon
            :icon="`mdi-format-align-${textAlign}`"
            class="mr-1"
            size="small"
            aria-hidden
          />
          {{ textAlign }}
        </VListItemTitle>
      </VListItem>
    </VList>
  </VMenu>
</template>

<script setup lang="ts">
import ToolbarButton from '../ToolbarButton.vue';

defineProps<{ editor: any; inMenu?: boolean }>();

const alignments = ['left', 'center', 'right', 'justify'];
</script>
