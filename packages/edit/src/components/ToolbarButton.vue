<template>
  <VListItem
    v-if="inMenu"
    v-bind="$attrs"
    :active="active"
    :disabled="disabled"
    :title="label"
    role="menuitem"
    @click="onClick"
  >
    <template #prepend>
      <div class="list-icon">
        <slot :icon-size="18">
          <VIcon :icon="icon" size="18" />
        </slot>
      </div>
    </template>
    <template v-if="hasSubmenu" #append>
      <VIcon icon="mdi-chevron-right" size="18" />
    </template>
  </VListItem>
  <VTooltip v-else v-model="isOpen" location="bottom">
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
        <slot :icon-size="20">
          <VIcon :class="{ 'ml-1 mr-n1': dropdown }" :icon="icon" size="20" />
        </slot>
        <VIcon v-if="dropdown">mdi-menu-down</VIcon>
      </VBtn>
    </template>
    {{ label }}
  </VTooltip>
</template>

<script setup lang="ts">
import { computed, mergeProps, ref, useAttrs } from 'vue';

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
  // Renders a labeled list item when placed inside a menu.
  inMenu?: boolean;
}>();

// The event must be forwarded; menu activator listeners rely on it.
const emit = defineEmits<{ click: [event: MouseEvent | KeyboardEvent] }>();

const attrs = useAttrs();

// Set by VMenu activator props; marks rows that open a submenu.
const hasSubmenu = computed(() => attrs['aria-haspopup'] === 'menu');

const isOpen = ref(false);

const onClick = (event: MouseEvent | KeyboardEvent) => {
  isOpen.value = false;
  emit('click', event);
};
</script>

<style lang="scss" scoped>
.list-icon {
  position: relative;
  display: flex;
  // Matches Vuetify list icon emphasis; the wrapper opts out of its styles.
  opacity: var(--v-medium-emphasis-opacity);

  .v-list-item--active & {
    opacity: 1;
  }
}
</style>
