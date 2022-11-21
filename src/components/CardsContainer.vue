<template>
  <div class="col-2 gt-sm"></div>
  <div class="q-pa-md row q-gutter-md col-12 col-md-10 justify-around">
    <q-card
      class="q-ma-lg shadow-7 q-card"
      v-for="(producto, index) in productos"
      :key="index"
      @click="irAlProducto(producto.id)"
      :id="producto.id"
    >
      <img :src="producto.url" />
      <q-card-section>
        <div class="text-h6">${{ producto.precio }}</div>
        <div class="text-subtitle2 ellipsis-2-lines">{{ producto.titulo }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  props: ["productos"],

  setup(props) {
    //Funcion para redirigir
    function irAlProducto(id) {
      window.location.hash = "Producto/" + id;
    }

    return {
      irAlProducto,
    };
  },

  methods: {},
};
</script>
<style lang="sass" scoped>
.q-card
  max-height: 345px
  min-height: 345px
  width: 250px
  cursor: pointer
  transition: all 0.3s


.q-card:hover
  scale: 1.05
  background-color:#8e79ba
  color: white
</style>
