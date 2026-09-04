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
import IconButton from '../IconButton.vue';

defineProps<{ editor: any }>();

const alignments = ['left', 'center', 'right', 'justify'];
</script>
