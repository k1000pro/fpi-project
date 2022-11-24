<template>
  <div class="flex flex-center col-md-9 col-12 content-end">
    <q-pagination
      v-model="actualPage"
      :max="maxPages"
      direction-links
      flat
      color="grey"
      active-color="primary"
    />
  </div>
  <div class="col-2 gt-sm">
    <q-select
      standout="bg-primary text-black"
      v-model="productsPerPage"
      :options="productsPerPageOptions"
      label="Productos por pagina"
    />
  </div>
</template>
<script>
import { ref, watch } from "vue";
import { useCounterStore } from "stores/dataglobal";

export default {
  props: ["maxPages"],
  emits: ["paginacion"],
  setup(props, { emit }) {
    const store = useCounterStore();
    const productsPerPage = ref(15);
    const actualPage = ref(1);

    watch(productsPerPage, (nuevo, viejo) => {
      store.productsPerPage = nuevo;
      emit("paginacion");
    });
    watch(actualPage, (nuevo, viejo) => {
      store.actualPage = nuevo;
      emit("paginacion");
    });
    return {
      productsPerPageOptions: [8, 15, 20, 30],
      productsPerPage,
      actualPage,
    };
  },
};
</script>
