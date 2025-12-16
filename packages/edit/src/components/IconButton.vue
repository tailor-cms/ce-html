<template>
  <VTooltip v-model="isOpen" location="bottom">
    <template #activator="{ props: tooltip }">
      <VBtn
        :active="active"
        :aria-label="label"
        :density="density ?? 'default'"
        :disabled="disabled"
        :icon="icon"
        :size="size ?? 32"
        rounded="lg"
        variant="text"
        v-bind="{ ...$attrs, ...tooltip }"
        @click="onClick"
      />
    </template>
    {{ label }}
  </VTooltip>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  active?: boolean;
  disabled?: boolean;
  density?: string;
  size?: string;
  label: string;
  icon: string;
}>();

const emit = defineEmits(['click']);

const isOpen = ref(false);

const onClick = () => {
  isOpen.value = false;
  emit('click');
};
</script>

<style lang="scss" scoped>
.v-btn.v-btn--density-compact {
  width: calc(var(--v-btn-height) - 0.25rem);
  height: calc(var(--v-btn-height) - 0.25rem);
}
</style>
