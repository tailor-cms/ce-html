<template>
  <VMenu>
    <template #activator="{ props: menu }">
      <VTooltip location="bottom">
        <template #activator="{ props: tooltip }">
          <VBtn
            :active="!!value"
            :aria-label="label"
            :disabled="disabled"
            rounded="lg"
            size="32"
            icon
            v-bind="mergeProps(menu, tooltip)"
          >
            <VIcon size="24">{{ icon }}</VIcon>
            <VIcon :color="currentColor" size="20">mdi-color-helper</VIcon>
          </VBtn>
        </template>
        {{ label }}
      </VTooltip>
    </template>
    <VSheet class="pa-2" color="white">
      <div v-for="(colorRow, i) in COLORS" :key="i" class="d-flex">
        <VBtn
          v-for="color in colorRow"
          :key="color"
          :active="value === color"
          :aria-label="color"
          :color="color"
          class="color-btn"
          size="24"
          variant="flat"
          @click="
            currentColor === color ? $emit('unset') : (currentColor = color)
          "
        >
          <VIcon v-if="value === color" color="white" size="small">
            mdi-check-circle
          </VIcon>
        </VBtn>
      </div>
      <VBtn
        class="mt-1"
        size="small"
        variant="plain"
        block
        @click="$emit('unset')"
      >
        <VIcon size="small">mdi-water-off</VIcon>
        Reset
      </VBtn>
    </VSheet>
  </VMenu>
</template>

<script setup lang="ts">
import { computed, mergeProps } from 'vue';

const props = defineProps<{
  disabled: boolean;
  value: string;
  label: string;
  icon: string;
}>();
const emit = defineEmits(['set', 'unset']);

const COLORS = [
  [
    '#000000',
    '#333333',
    '#4D4D4D',
    '#666666',
    '#808080',
    '#999999',
    '#B3B3B3',
    '#CCCCCC',
    '#FFFFFF',
  ],
  [
    '#F44E3B',
    '#FE9200',
    '#FCDC00',
    '#DBDF00',
    '#A4DD00',
    '#68CCCA',
    '#73D8FF',
    '#AEA1FF',
    '#FDA1FF',
  ],
  [
    '#D33115',
    '#E27300',
    '#FCC400',
    '#B0BC00',
    '#68BC00',
    '#16A5A5',
    '#009CE0',
    '#7B64FF',
    '#FA28FF',
  ],
  [
    '#9F0500',
    '#C45100',
    '#FB9E00',
    '#808900',
    '#194D33',
    '#0C797D',
    '#0062B1',
    '#653294',
    '#AB149E',
  ],
];

const currentColor = computed({
  get() {
    return props.value;
  },
  set(color) {
    return emit('set', color);
  },
});
</script>

<style lang="scss" scoped>
.mdi-color-helper {
  position: absolute !important;
}

.v-btn.v-btn--active {
  color: rgba(var(--v-theme-primary));
}

.color-icon {
  position: relative;
}

:deep(.v-color-picker) {
  .v-color-picker-swatches > div {
    padding-bottom: 0;
  }

  .v-color-picker-swatches__swatch {
    margin: 0;
  }

  .v-color-picker-swatches__color {
    width: 1.5rem;
    height: 1.5rem;
    margin: 0.125rem;
    max-height: 1.5rem;
    border-radius: 50%;
  }
}

.color-btn {
  margin: 0.0625rem;
  border: 1px solid #dadce0;
}
</style>
