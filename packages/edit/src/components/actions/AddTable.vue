<template>
  <VMenu>
    <template #activator="{ props: menu }">
      <VTooltip location="bottom">
        <template #activator="{ props: tooltip }">
          <VBtn
            aria-label="Add table"
            rounded="lg"
            size="36"
            icon
            v-bind="mergeProps(menu, tooltip)"
          >
            <VIcon size="24">mdi-table-plus</VIcon>
          </VBtn>
        </template>
        Add table
      </VTooltip>
    </template>
    <VSheet class="pa-2" color="white">
      <div v-for="rows in DIMENSIONS.rows" :key="rows" class="d-flex">
        <VBtn
          v-for="cols in DIMENSIONS.cols"
          :key="cols"
          :active="selectedSize.rows >= rows && selectedSize.cols >= cols"
          class="cell-btn"
          color="primary"
          size="24"
          variant="tonal"
          @click="insertTable(rows, cols)"
          @focus="updateSelection(rows, cols)"
          @mouseover="updateSelection(rows, cols)"
        />
      </div>
    </VSheet>
  </VMenu>
</template>

<script setup lang="ts">
import { mergeProps, reactive } from 'vue';

const DIMENSIONS = {
  rows: 5,
  cols: 5,
};

const props = defineProps<{ editor: any }>();

const selectedSize = reactive({ rows: 0, cols: 0 });

const updateSelection = (rows: number, cols: number) => {
  selectedSize.rows = rows;
  selectedSize.cols = cols;
};

const insertTable = (rows: number, cols: number) => {
  const options = { rows, cols, withHeaderRow: true };
  return props.editor.chain().focus().insertTable(options).run();
};
</script>

<style lang="scss" scoped>
.cell-btn {
  margin: 0.0625rem;
}
</style>
