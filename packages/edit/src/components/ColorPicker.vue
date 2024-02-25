<template>
  <VMenu>
    <template #activator="{ props: menu }">
      <VTooltip location="bottom">
        <template #activator="{ props: tooltip }">
          <VBtn
            aria-label="Text color"
            class="pa-0"
            min-width="54"
            v-bind="mergeProps(menu, tooltip)"
          >
            <VIcon size="24">mdi-format-color-text</VIcon>
            <VIcon :color="currentColor">mdi-color-helper</VIcon>
            <VIcon small>mdi-menu-down</VIcon>
          </VBtn>
        </template>
        Text color
      </VTooltip>
    </template>
    <VColorPicker
      v-model="currentColor"
      hide-canvas
      hide-inputs
      hide-sliders
      show-swatches
    />
  </VMenu>
</template>

<script setup lang="ts">
import { computed, mergeProps } from 'vue';

const props = defineProps<{ editor: any }>();

const currentColor = computed({
  get() {
    return props.editor.getAttributes('textStyle').color;
  },
  set(color) {
    return props.editor.chain().focus().setColor(color).run();
  },
});
</script>

<style lang="scss" scoped>
.mdi-color-helper {
  position: absolute !important;
  left: 9px;
  bottom: 8px;
}

.color-icon {
  position: relative;
}
</style>
