import { useStores, defineInterface } from '@directus/extensions-sdk';
import { computed, ref, defineComponent, watch, resolveComponent, openBlock, createElementBlock, createVNode, unref, isRef } from 'vue';

function useInterfaceComposable(name) {
  const { useCollectionsStore, useFieldsStore } = useStores();
  const collectionsStore = useCollectionsStore();
  const allowCollection = computed(() => {
    return collectionsStore.collections.map((collection) => ({
      text: collection.collection,
      value: collection.collection
    })).filter((option) => {
      return !option.text.startsWith("directus_");
    });
  });
  const fields = computed(() => [
    {
      field: "meta-group",
      type: "alias",
      name: computed(() => name.value),
      meta: {
        field: "meta-group",
        special: ["alias", "no-data", "group"],
        interface: "group-detail"
      }
    },
    {
      field: "name",
      name: "$t:name",
      type: "string",
      meta: {
        interface: "system-input-translated-string",
        options: {
          placeholder: "$t:preset_name_placeholder"
        },
        width: "half",
        group: "meta-group"
      }
    },
    {
      field: "collection",
      name: "$t:collection",
      type: "string",
      meta: {
        interface: "select-dropdown",
        options: {
          choices: allowCollection.value
        },
        width: "half",
        group: "meta-group"
      }
    },
    {
      field: "layout",
      name: "$t:layout",
      type: "string",
      meta: {
        interface: "input",
        width: "half",
        group: "meta-group"
      }
    },
    {
      field: "search",
      name: "$t:search",
      type: "string",
      meta: {
        interface: "input",
        width: "half",
        options: {
          placeholder: "$t:search_items"
        },
        group: "meta-group"
      }
    },
    {
      field: "filter",
      name: "$t:filter",
      type: "json",
      meta: {
        interface: "system-filter",
        group: "meta-group",
        options: {
          collectionField: "collection",
          rawFieldNames: true
        }
      }
    }
  ]);
  return {
    allowCollection,
    fields
  };
}

function useValues(preset) {
  const edits = ref({});
  const hasEdits = computed(() => Object.keys(edits.value).length > 0);
  const initialValues = computed(() => {
    const defaultValues = {
      name: null,
      collection: null,
      layout: "",
      search: null,
      scope: "all",
      filter: null
    };
    if (preset.value === null)
      return defaultValues;
    const value = {
      name: preset.value.name,
      collection: preset.value.collection,
      layout: preset.value.layout,
      search: preset.value.search,
      filter: preset.value.filter
    };
    return value;
  });
  const values = computed(() => {
    return {
      ...initialValues.value,
      ...edits.value
    };
  });
  const search = computed({
    get() {
      return values.value.search;
    },
    set(newSearch) {
      edits.value = {
        ...edits.value,
        search: newSearch
      };
    }
  });
  function updateFilters(newFilter) {
    edits.value = {
      ...edits.value,
      filter: newFilter
    };
  }
  return { edits, initialValues, values, hasEdits, updateFilters, search };
}

const _hoisted_1 = { class: "wrapper-input" };
var _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "interface",
  props: {
    value: { default: {} },
    primaryKey: {},
    collection: {},
    field: {},
    disabled: { type: Boolean, default: false },
    enableCreate: { type: Boolean, default: true },
    enableSelect: { type: Boolean, default: true },
    limit: { default: 1 },
    prefix: { default: "" },
    allowDuplicates: { type: Boolean, default: false }
  },
  emits: ["input"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const loading = ref(false);
    const preset = computed(() => {
      return props.value;
    });
    const {
      fields
    } = useInterfaceComposable(
      computed(() => finalValue.value.name)
    );
    const { edits, hasEdits, initialValues, values, updateFilters, search } = useValues(preset);
    const finalValue = computed(() => {
      return {
        ...preset.value,
        ...edits.value
      };
    });
    watch(
      () => edits.value,
      (value) => {
        console.log(value);
        emits("input", finalValue.value);
      }
    );
    return (_ctx, _cache) => {
      const _component_v_form = resolveComponent("v-form");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_v_form, {
          modelValue: unref(edits),
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(edits) ? edits.value = $event : null),
          fields: unref(fields),
          loading: loading.value,
          "initial-values": unref(initialValues),
          "primary-key": _ctx.id
        }, null, 8, ["modelValue", "fields", "loading", "initial-values", "primary-key"])
      ]);
    };
  }
});

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = "\n.wrapper-input[data-v-61885c8e] {\n\tpadding: 20px;\n\tborder-radius: var(--theme--border-radius);\n\tbackground: var(--theme--navigation--background);\n}\n";
n(css,{});

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

var InterfaceComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-61885c8e"], ["__file", "interface.vue"]]);

var e0 = defineInterface({
  id: "cdh-filter",
  name: "Filter",
  icon: "box",
  description: "",
  component: InterfaceComponent,
  options: null,
  types: ["json", "text"]
});

const interfaces = [e0];const displays = [];const layouts = [];const modules = [];const panels = [];const themes = [];const operations = [];

export { displays, interfaces, layouts, modules, operations, panels, themes };
