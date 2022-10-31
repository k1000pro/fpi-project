<template>
    <div class="flex flex-center col-md-9 col-12">
        <q-pagination
        v-model="current"
        max="5"
        direction-links
        flat
        color="grey"
        active-color="primary"
      />
    </div>
    <div class=" col-2 gt-sm">
        <q-select standout="bg-primary text-black" v-model="productsPerPage" :options="productsPerPageOptions" label="Productos por pagina" />
    </div>
      
</template>
<script>
import { ref } from 'vue'


export default {
  setup () {
    return {
      current: ref(1),
      productsPerPage: ref(20),
      productsPerPageOptions: [
        '10', '20', '30', '40'
      ]
    }
  }
}
</script>