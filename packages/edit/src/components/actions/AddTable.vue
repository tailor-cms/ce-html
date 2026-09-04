<template>
  <VMenu v-model="show">
    <template #activator="{ props: menu }">
      <IconButton v-bind="menu" icon="mdi-table-plus" label="Add table" />
    </template>
    <VSheet class="pa-2 text-center" elevation="3">
      <VCheckbox
        v-model="withHeaderRow"
        :ripple="false"
        class="mb-1"
        color="primary"
        density="compact"
        label="Add header"
        hide-details
        @click.stop
      />
      <div v-for="rows in gridSize.rows" :key="rows" class="d-flex">
        <VBtn
          v-for="cols in gridSize.cols"
          :key="cols"
          :active="selectedSize.rows >= rows && selectedSize.cols >= cols"
          class="cell-btn"
          color="secondary"
          size="24"
          variant="tonal"
          @click="insertTable(rows, cols)"
          @focus="updateSelection(rows, cols)"
          @mouseover="updateSelection(rows, cols)"
        />
      </div>
      <span class="text-body-medium">
        {{ selectedSize.rows }}x{{ selectedSize.cols }}
      </span>
    </VSheet>
  </VMenu>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';

import IconButton from '../IconButton.vue';

const INIT_SIZE = 5;
const MAX_SIZE = 10;

const props = defineProps<{ editor: any }>();

const show = ref(false);
const withHeaderRow = ref(false);
const selectedSize = reactive({ rows: 0, cols: 0 });
const gridSize = reactive({ rows: INIT_SIZE, cols: INIT_SIZE });

const updateSelection = (rows: number, cols: number) => {
  if (rows === gridSize.rows) gridSize.rows = Math.min(rows + 1, MAX_SIZE);
  else if (rows < gridSize.rows - 1 && rows >= INIT_SIZE - 1) gridSize.rows--;
  if (cols === gridSize.cols) gridSize.cols = Math.min(cols + 1, MAX_SIZE);
  else if (cols < gridSize.cols - 1 && cols >= INIT_SIZE - 1) gridSize.cols--;
  selectedSize.rows = rows;
  selectedSize.cols = cols;
};

const insertTable = (rows: number, cols: number) => {
  const options = {
    withHeaderRow: withHeaderRow.value,
    rows: rows + Number(withHeaderRow.value),
    cols,
  };
  return props.editor.chain().focus().insertTable(options).run();
};

watch(show, (val: boolean) => {
  if (!val) return;
  withHeaderRow.value = false;
  gridSize.rows = INIT_SIZE;
  gridSize.cols = INIT_SIZE;
});
</script>

<style lang="scss" scoped>
.cell-btn {
  margin: 0.0625rem;
}

.v-input--density-compact {
  --v-input-control-height: unset;
}
</style>
