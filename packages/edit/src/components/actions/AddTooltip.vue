<template>
  <VMenu v-model="show" :close-on-content-click="false">
    <template #activator="{ props: menu }">
      <IconButton
        v-bind="menu"
        :active="editor.isActive('tooltip')"
        :disabled="!editor.can().chain().focus().setTooltip().run()"
        icon="mdi-tooltip-text"
        label="Add tooltip"
      />
    </template>
    <VForm ref="form" @submit.prevent="setTooltip">
      <VSheet class="pa-3" elevation="3" width="240" rounded>
        <VTextField
          v-model="text"
          :rules="[rules.required]"
          density="compact"
          hide-details="auto"
          label="Text"
          variant="outlined"
        />
        <VTextField
          v-model="tooltip"
          :rules="[rules.required]"
          density="compact"
          hide-details="auto"
          label="Tooltip"
          variant="outlined"
        />
        <div class="actions d-flex justify-end">
          <VBtn
            v-if="editor.isActive('tooltip')"
            class="mr-2"
            text="Remove"
            variant="plain"
            @click="unset"
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

const tooltip = ref<string>('');
const text = ref<string>('');
const show = ref<boolean>(false);

function unset() {
  props.editor.chain().focus().unsetTooltip().run();
  tooltip.value = '';
  show.value = false;
}

async function setTooltip() {
  const { valid } = await form.value.validate();
  if (!valid) return;
  if (tooltip.value) {
    const attributes = { tooltip: tooltip.value, text: text.value };
    props.editor.chain().focus().setTooltip(attributes).run();
  } else props.editor.chain().focus().unsetTooltip().run();
  show.value = false;
  form.value.resetValidation();
}

watch(show, (val: boolean) => {
  if (!val) return;
  tooltip.value = props.editor.getAttributes('tooltip')['data-tooltip'] ?? '';
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
