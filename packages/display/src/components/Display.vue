<template>
  <div class="ce-html-default-root">
    <!-- eslint-disable-next-line -->
    <span v-html="data.content" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { ElementData } from '@tailor-cms/ce-html-default-manifest';

defineProps<{ id: number; data: ElementData }>();
</script>

<style scoped lang="scss">
.ce-html-default-root {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
}
</style>
