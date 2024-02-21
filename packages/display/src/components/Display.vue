<template>
  <div class="ce-html-default-root">
    {{ data.content }}
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { ElementData } from 'tce-manifest';

defineProps<{ id: number; data: ElementData }>();
</script>

<style scoped lang="scss">
.ce-html-default-root {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
}
</style>
