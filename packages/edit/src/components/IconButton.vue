<template>
  <VTooltip location="bottom">
    <template #activator="{ props: tooltip }">
      <VBtn
        :active="active"
        :aria-label="label"
        :disabled="disabled"
        :icon="icon"
        v-bind="tooltip"
        rounded="lg"
        size="36"
        @click="$emit('click')"
      />
    </template>
    {{ label }}
  </VTooltip>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

defineProps<{
  active?: boolean;
  disabled?: boolean;
  label: string;
  icon: string;
}>();

defineEmits(['click']);
</script>
