import {computed, ref} from "vue";

export function useValues(preset) {
    const edits = ref<Record<string, any>>({});
    const hasEdits = computed(() => Object.keys(edits.value).length > 0);

    const initialValues = computed(() => {
        const defaultValues = {
            name: null,
            collection: null,
            layout: '',
            search: null,
            scope: 'all',
            filter: null,
        };

        if (preset.value === null) return defaultValues;

        const value = {
            name: preset.value.name,
            collection: preset.value.collection,
            layout: preset.value.layout,
            search: preset.value.search,
            filter: preset.value.filter,
        };

        return value;
    });

    const values = computed(() => {
        return {
            ...initialValues.value,
            ...edits.value,
        };
    });

    const search = computed<string | null>({
        get() {
            return values.value.search;
        },
        set(newSearch) {
            edits.value = {
                ...edits.value,
                search: newSearch,
            };
        },
    });


    function updateFilters(newFilter: Filter) {
        edits.value = {
            ...edits.value,
            filter: newFilter,
        };
    }

    return {edits, initialValues, values, hasEdits, updateFilters, search};
}
