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
    <VSheet class="pa-2 text-center" color="white">
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
      <span class="text-body-2">
        {{ selectedSize.rows }}x{{ selectedSize.cols }}
      </span>
    </VSheet>
  </VMenu>
</template>

<script setup lang="ts">
import { mergeProps, reactive, ref } from 'vue';

const DIMENSIONS = { rows: 5, cols: 5 };

const props = defineProps<{ editor: any }>();

const withHeaderRow = ref(false);
const selectedSize = reactive({ rows: 0, cols: 0 });

const updateSelection = (rows: number, cols: number) => {
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
</script>

<style lang="scss" scoped>
.cell-btn {
  margin: 0.0625rem;
}

.v-input--density-compact {
  --v-input-control-height: unset;
}
</style>
