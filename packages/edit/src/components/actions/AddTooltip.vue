<template>
  <VMenu v-model="show" :close-on-content-click="false">
    <template #activator="{ props: menu }">
      <VTooltip location="bottom">
        <template #activator="{ props: tooltipProps }">
          <VBtn
            :active="editor.isActive('tooltip')"
            :disabled="!editor.can().chain().focus().setTooltip().run()"
            aria-label="Add tooltip"
            rounded="lg"
            size="32"
            v-bind="mergeProps(menu, tooltipProps)"
          >
            <VIcon size="24">mdi-tooltip-text</VIcon>
          </VBtn>
        </template>
        Add tooltip
      </VTooltip>
    </template>
    <VForm ref="form" @submit.prevent="setTooltip">
      <VSheet class="pa-3" elevation="8" width="240" rounded>
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
            variant="plain"
            @click="unset"
          >
            Remove
          </VBtn>
          <VBtn color="primary" type="submit" variant="tonal">Confirm</VBtn>
        </div>
      </VSheet>
    </VForm>
  </VMenu>
</template>

<script setup lang="ts">
import { mergeProps, ref, watch } from 'vue';

const rules = {
  required: (val: string) => !!val || 'The field is required',
};

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
    console.log('Setting tooltip with attributes:', attributes);
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
