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

import { COLORS } from './constants';

const props = defineProps<{
  disabled: boolean;
  value: string;
  label: string;
  icon: string;
}>();
const emit = defineEmits(['set', 'unset']);

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
