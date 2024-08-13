<template>
	<div class="wrapper-input">
		<v-form v-model="edits" :fields="fields" :loading="loading" :initial-values="initialValues" :primary-key="id"/>
	</div>
</template>

<style scoped>
.wrapper-input {
	padding: 20px;
	border-radius: var(--theme--border-radius);
	background: var(--theme--navigation--background);
}
</style>

<script lang="ts" setup>
import {computed, ref, watch} from "vue";
import {useInterfaceComposable} from "./interface-composable";
import {useValues} from "./useValues";

const props = withDefaults(defineProps<{
	value?: any;
	primaryKey: string | number;
	collection: string;
	field: string;
	disabled?: boolean;
	enableCreate?: boolean;
	enableSelect?: boolean;
	limit?: number;
	prefix?: string;
	allowDuplicates?: boolean;
}>(), {
	disabled: false,
	enableCreate: true,
	enableSelect: true,
	limit: 1,
	prefix: "",
	allowDuplicates: false,
	value: {}
});
const emits = defineEmits(['input']);
const loading = ref(false);

const preset = computed(() => {
	return props.value;
});


const {
	fields
} = useInterfaceComposable(
	computed(() => finalValue.value.name),
)
const {edits, hasEdits, initialValues, values, updateFilters, search} = useValues(preset);


const finalValue = computed(() => {
	return {
		...preset.value,
		...edits.value
	}
});
watch(
	() => edits.value,
	(value) => {
		console.log(value)
		emits('input', finalValue.value);
	}
);
</script>
