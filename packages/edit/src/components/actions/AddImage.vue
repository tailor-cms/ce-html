<template>
  <VMenu v-model="show" :close-on-content-click="false">
    <template #activator="{ props: menu }">
      <VTooltip location="bottom">
        <template #activator="{ props: tooltip }">
          <VBtn
            :active="editor.isActive('image')"
            :disabled="!editor.can().chain().focus().setImage().run()"
            aria-label="Add image"
            rounded="lg"
            size="32"
            v-bind="mergeProps(menu, tooltip)"
          >
            <VIcon size="24">mdi-image-plus</VIcon>
          </VBtn>
        </template>
        Add image
      </VTooltip>
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
          <VBtn color="primary" type="submit" variant="tonal">Confirm</VBtn>
        </div>
      </VSheet>
    </VForm>
  </VMenu>
</template>

<script setup lang="ts">
import { mergeProps, ref, watch } from 'vue';
import isURL from 'validator/lib/isURL';

const rules = {
  required: (val: string) => !!val || 'The field is required',
  url: (val: string) => {
    const url = val.trim();
    if (!url) return true;
    return isURL(url) || 'Please enter valid URL';
  },
};

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
