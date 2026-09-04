<template>
  <VTooltip v-model="isOpen" location="bottom">
    <template #activator="{ props: tooltip }">
      <VBtn
        :active="active"
        :aria-label="label"
        :class="{ 'pa-0': dropdown }"
        :density="density ?? 'default'"
        :disabled="disabled"
        :icon="!dropdown"
        :min-width="dropdown ? 40 : undefined"
        :size="size ?? 30"
        rounded="6"
        variant="text"
        v-bind="mergeProps($attrs, tooltip)"
        @click="onClick"
      >
        <slot>
          <VIcon :class="{ 'ml-1 mr-n1': dropdown }" :icon="icon" size="20" />
        </slot>
        <VIcon v-if="dropdown">mdi-menu-down</VIcon>
      </VBtn>
    </template>
    {{ label }}
  </VTooltip>
</template>

<script setup lang="ts">
import { mergeProps, ref } from 'vue';

defineOptions({ inheritAttrs: false });

defineProps<{
  active?: boolean;
  disabled?: boolean;
  density?: 'default' | 'comfortable' | 'compact';
  size?: string | number;
  label: string;
  icon?: string;
  // Renders a wider button with the icon and a menu-down chevron.
  dropdown?: boolean;
}>();

// The event must be forwarded; menu activator listeners rely on it.
const emit = defineEmits<{ click: [event: MouseEvent] }>();

const isOpen = ref(false);

const onClick = (event: MouseEvent) => {
  isOpen.value = false;
  emit('click', event);
};
</script>
