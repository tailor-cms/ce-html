<template>
  <div :class="{ 'in-menu': inMenu }" class="toolbar-group">
    <!-- @vue-ignore -->
    <template v-for="(it, i) in items" :key="i">
      <component
        :is="it.component"
        v-if="'component' in it"
        :editor="editor"
        :in-menu="inMenu"
      />
      <ToolbarButton
        v-if="'action' in it"
        :active="'isActive' in it && editor.isActive(it.isActive)"
        :disabled="
          !editor.can().chain().focus()[it.action[0]](it.action[1]).run()
        "
        :icon="`mdi-${it.icon}`"
        :in-menu="inMenu"
        :label="it.label"
        @click="editor.chain().focus()[it.action[0]](it.action[1]).run()"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Component as VueComponent } from 'vue';

import ToolbarButton from './ToolbarButton.vue';

export interface Action {
  label: string;
  isActive?: string;
  action: string[];
  icon: string;
}

export interface Component {
  component: VueComponent;
}

export type ToolbarItem = Action | Component;

defineProps<{
  editor: any;
  items: ToolbarItem[];
  // Renders items as labeled menu items when placed inside a menu.
  inMenu?: boolean;
}>();
</script>

<style lang="scss" scoped>
.toolbar-group {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 0.125rem;

  &.in-menu {
    display: block;
  }
}
</style>
