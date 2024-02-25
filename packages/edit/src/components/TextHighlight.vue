<template>
  <VMenu>
    <template #activator="{ props: menu }">
      <VTooltip location="bottom">
        <template #activator="{ props: tooltip }">
          <VBtn
            aria-label="Highlight"
            rounded="lg"
            size="36"
            icon
            v-bind="mergeProps(menu, tooltip)"
          >
            <VIcon size="24">mdi-format-color-highlight</VIcon>
            <VIcon :color="currentColor">mdi-color-helper</VIcon>
          </VBtn>
        </template>
        Highlight
      </VTooltip>
    </template>
    <VSheet color="white">
      <VColorPicker
        v-model="currentColor"
        elevation="0"
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
          @click="props.editor.chain().focus().unsetHighlight().run()"
        >
          Reset
        </VBtn>
      </div>
    </VSheet>
  </VMenu>
</template>

<script setup lang="ts">
import { computed, mergeProps } from 'vue';

const props = defineProps<{ editor: any }>();

const currentColor = computed({
  get() {
    return props.editor.getAttributes('highlight').color;
  },
  set(color) {
    return props.editor.chain().focus().setHighlight({ color }).run();
  },
});
</script>

<style lang="scss" scoped>
.mdi-color-helper {
  position: absolute !important;
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
