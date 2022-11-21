<template>
  <div class="flex flex-center col-md-9 col-12 content-end">
    <q-pagination
      :model-value="actualPage"
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
      :model-value="productsPerPage"
      :options="productsPerPageOptions"
      label="Productos por pagina"
    />
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  emits: ["update:model-value"],
  props: ["maxPages", "actualPage", "productsPerPage"],
  setup(props) {
    return {
      productsPerPageOptions: ["8", "15", "20", "30"],
    };
  },
};
</script>
