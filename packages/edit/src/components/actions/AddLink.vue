<template>
  <VMenu v-model="show" :close-on-content-click="false">
    <template #activator="{ props: menu }">
      <IconButton
        v-bind="menu"
        :active="editor.isActive('link')"
        :disabled="!editor.can().chain().focus().setLinkText().run()"
        icon="mdi-link-variant-plus"
        label="Add link"
      />
    </template>
    <VForm ref="form" @submit.prevent="setLink">
      <VSheet class="pa-3" elevation="8" width="230" rounded>
        <VTextField
          v-model="text"
          :rules="[rules.required]"
          density="compact"
          hide-details="auto"
          label="Text"
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
          <VBtn
            v-if="editor.isActive('link')"
            class="mr-2"
            text="Unlink"
            variant="text"
            @click="unlink"
          />
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

const getText = () => {
  const { view, state } = props.editor;
  const { from, to } = view.state.selection;
  return state.doc.textBetween(from, to, ' ');
};

const url = ref<string>('');
const text = ref<string>('');
const show = ref<boolean>(false);

function unlink() {
  props.editor.chain().focus().unsetLink().run();
  url.value = '';
  show.value = false;
}

async function setLink() {
  const { valid } = await form.value.validate();
  if (!valid) return;
  const href = url.value.startsWith('http')
    ? url.value
    : `https://${url.value}`;
  if (href) {
    props.editor.chain().focus().setLinkText({ href, text: text.value }).run();
  } else props.editor.chain().focus().unsetLink().run();
  show.value = false;
  form.value.resetValidation();
}

watch(show, (val: boolean) => {
  if (!val) return;
  url.value = props.editor.getAttributes('link').href ?? '';
  text.value = getText() ?? '';
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
