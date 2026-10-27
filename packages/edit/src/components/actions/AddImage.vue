<template>
  <ToolbarButton
    :active="editor.isActive('image')"
    :disabled="!editor.can().chain().focus().setImage().run()"
    :in-menu="inMenu"
    icon="mdi-image-plus"
    label="Add image"
    @click="isPickerOpen = true"
  />
  <TailorAssetPicker
    v-model="isPickerOpen"
    :allowed-extensions="IMAGE_EXTENSIONS"
    heading="Insert image"
    icon="mdi-image-plus"
    allow-url-source
    @select="insertImage"
    @upload="insertImage"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { AssetPick } from '../extensions/image';
import ToolbarButton from '../ToolbarButton.vue';

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];

const props = defineProps<{ editor: any; inMenu?: boolean }>();

const isPickerOpen = ref(false);

const insertImage = (asset: AssetPick) =>
  props.editor.chain().focus().setAssetImage(asset).run();
</script>
