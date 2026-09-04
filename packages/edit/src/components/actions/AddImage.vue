<template>
  <VMenu v-model="show" :close-on-content-click="false">
    <template #activator="{ props: menu }">
      <IconButton
        v-bind="menu"
        :active="editor.isActive('image')"
        :disabled="!editor.can().chain().focus().setImage().run()"
        icon="mdi-image-plus"
        label="Add image"
      />
    </template>
    <VForm ref="form" @submit.prevent="setImage">
      <VSheet class="pa-3" elevation="8" width="230" rounded>
        <VTextField
          v-model="title"
          :rules="[rules.required]"
          density="compact"
          hide-details="auto"
          label="Title"
          variant="outlined"
        />
        <VTextField
          v-model="url"
          :rules="[rules.required, rules.url]"
          density="compact"
          hide-details="auto"
          label="Url"
          variant="outlined"
        />
        <div class="actions d-flex justify-end">
          <VBtn color="primary" text="Confirm" type="submit" variant="tonal" />
        </div>
      </VSheet>
    </VForm>
  </VMenu>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import IconButton from '../IconButton.vue';
import { rules } from './rules';

const props = defineProps<{ editor: any }>();

const form = ref();

const url = ref<string>('');
const title = ref<string>('');
const show = ref<boolean>(false);

async function setImage() {
  const { valid } = await form.value.validate();
  if (!valid) return;
  const href = url.value.startsWith('http')
    ? url.value
    : `https://${url.value}`;
  props.editor
    .chain()
    .focus()
    .setImage({ src: href, alt: title.value, title: title.value })
    .run();
  show.value = false;
  form.value.resetValidation();
}

watch(show, (val: boolean) => {
  if (!val) return;
  url.value = '';
  title.value = '';
  form.value?.resetValidation();
});
</script>

<style lang="scss" scoped>
.v-sheet {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>
