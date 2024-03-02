<template>
  <BubbleMenu
    v-show="editor.isActive('table')"
    :editor="editor"
    :should-show="() => true"
    :tippy-options="{ maxWidth: 'unset' }"
  >
    <VCard class="pa-1" rounded="lg">
      <VBtnGroup density="compact" variant="text">
        <IconButton
          icon="mdi-table-column-plus-before"
          label="Add column before"
          @click="editor.chain().focus().addColumnBefore().run()"
        />
        <IconButton
          icon="mdi-table-column-plus-after"
          label="Add column after"
          @click="editor.chain().focus().addColumnAfter().run()"
        />
        <IconButton
          icon="mdi-table-column-remove"
          label="Remove column"
          @click="editor.chain().focus().deleteColumn().run()"
        />
        <VDivider class="mx-1" vertical />
        <IconButton
          icon="mdi-table-row-plus-before"
          label="Add row before"
          @click="editor.chain().focus().addRowBefore().run()"
        />
        <IconButton
          icon="mdi-table-row-plus-after"
          label="Add row after"
          @click="editor.chain().focus().addRowAfter().run()"
        />
        <IconButton
          icon="mdi-table-row-remove"
          label="Remove row"
          @click="editor.chain().focus().deleteRow().run()"
        />
        <VDivider class="mx-1" vertical />
        <IconButton
          icon="mdi-table-remove"
          label="Remove rable"
          @click="editor.chain().focus().deleteTable().run()"
        />
        <VDivider class="mx-1" vertical />
        <IconButton
          :disabled="!editor.can().chain().focus().mergeCells().run()"
          icon="mdi-table-merge-cells"
          label="Merge cells"
          @click="editor.chain().focus().mergeCells().run()"
        />
        <IconButton
          :disabled="!editor.can().chain().focus().splitCell().run()"
          icon="mdi-table-split-cell"
          label="Split cell"
          @click="editor.chain().focus().splitCell().run()"
        />
      </VBtnGroup>
    </VCard>
  </BubbleMenu>
</template>

<script setup lang="ts">
import { BubbleMenu } from '@tiptap/vue-3';

import IconButton from '../IconButton.vue';

defineProps<{ editor: any }>();
</script>
