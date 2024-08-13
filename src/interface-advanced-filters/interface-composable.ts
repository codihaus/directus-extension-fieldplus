import {computed} from 'vue';
import {useCollection, useStores} from "@directus/extensions-sdk";

export function useInterfaceComposable(name) {
    const { useCollectionsStore, useFieldsStore } = useStores();
    const collectionsStore = useCollectionsStore();

    const allowCollection = computed(() => {
        return collectionsStore.collections
            .map((collection) => ({
                text: collection.collection,
                value: collection.collection,
            }))
            .filter((option) => {
                return !(option.text.startsWith('directus_'));
            })
    })

    const fields = computed(() => [
        {
            field: 'meta-group',
            type: 'alias',
            name: computed(() => name.value),
            meta: {
                field: 'meta-group',
                special: ['alias', 'no-data', 'group'],
                interface: 'group-detail',
            },
        },
        {
            field: 'name',
            name: '$t:name',
            type: 'string',
            meta: {
                interface: 'system-input-translated-string',
                options: {
                    placeholder: '$t:preset_name_placeholder',
                },
                width: 'half',
                group: 'meta-group',
            },
        },
        {
            field: 'collection',
            name: '$t:collection',
            type: 'string',
            meta: {
                interface: 'select-dropdown',
                options: {
                    choices: allowCollection.value,
                },
                width: 'half',
                group: 'meta-group',
            },
        },
        {
            field: 'layout',
            name: '$t:layout',
            type: 'string',
            meta: {
                interface: 'input',
                width: 'half',
                group: 'meta-group',
            },
        },

        {
            field: 'search',
            name: '$t:search',
            type: 'string',
            meta: {
                interface: 'input',
                width: 'half',
                options: {
                    placeholder: '$t:search_items',
                },
                group: 'meta-group',
            },
        },
        {
            field: 'filter',
            name: '$t:filter',
            type: 'json',
            meta: {
                interface: 'system-filter',
                group: 'meta-group',
                options: {
                    collectionField: 'collection',
                    rawFieldNames: true,
                },
            },
        }
    ]);


    return {
        allowCollection,
        fields
    }
}
