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
            size="36"
            icon
            v-bind="mergeProps(menu, tooltip)"
          >
            <VIcon size="24">{{ icon }}</VIcon>
            <VIcon :color="currentColor">mdi-color-helper</VIcon>
          </VBtn>
        </template>
        {{ label }}
      </VTooltip>
    </template>
    <VSheet color="white">
      <VColorPicker
        v-model="currentColor"
        elevation="0"
        swatches-max-height="unset"
        width="unset"
        hide-canvas
        hide-inputs
        hide-sliders
        show-swatches
      />
      <div class="pa-2">
        <VBtn
          prepend-icon="mdi-water-off"
          variant="plain"
          block
          @click="$emit('unset')"
        >
          Reset
        </VBtn>
      </div>
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
</style>
