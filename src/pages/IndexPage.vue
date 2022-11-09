<template>
  <q-page padding>
    <div class="main-container row">
      <OrdenarContainer
        :iconPrecio="iconPrecio"
        :iconFecha="iconFecha"
        v-model:minPrecio="minPrecio"
        v-model:maxPrecio="maxPrecio"
        v-model:ordenarPor="ordenarPor"
        @ordenarPorPrecio="ordenarPorPrecio"
        @ordenarPorFecha="ordenarPorFecha"

      ></OrdenarContainer>
      <div class="col-2 gt-sm fixed">
        <FiltroContainer></FiltroContainer>
      </div>
      <CardsContainer :productos="productos"></CardsContainer>
      <PaginationContainer></PaginationContainer>
    </div>
  </q-page>
</template>

<script>
import OrdenarContainer from "../components/OrdenarContainer.vue";
import CardsContainer from "../components/CardsContainer.vue";
import FiltroContainer from "../components/FiltroContainer.vue";
import PaginationContainer from "../components/PaginationContainer.vue";
import { ref, watch } from "vue";
import { db, collection, getDocs, storage, storageRef } from "../boot/firebase";

export default {
  components: {
    CardsContainer,
    FiltroContainer,
    PaginationContainer,
    OrdenarContainer,
  },

  setup() {
    const minPrecio = ref();
    const maxPrecio = ref();
    const ordenarPor = ref("Precio");
    watch(minPrecio, (newMinPrecio) => {
      console.log(newMinPrecio);
    });
    return {
      iconFecha: ref(""),
      iconPrecio: ref("arrow_downward"),
      productos: ref([]),
      minPrecio,
      maxPrecio,
      ordenarPor,
    };
  },
  created() {
    this.getProducto();
  },
  methods: {
    ordenarPorPrecio() {
      if (this.iconPrecio == "arrow_downward") {
        this.iconPrecio = "arrow_upward";
        this.iconFecha = "";
        this.productos.sort((a, b) => a.price - b.price);
      } else {
        this.iconPrecio = "arrow_downward";
        this.iconFecha = "";
        this.productos.sort((a, b) => b.price - a.price);
      }
    },
    ordenarPorFecha() {
      if (this.iconFecha == "arrow_downward") {
        this.iconFecha = "arrow_upward";
        this.iconPrecio = "";
        this.productos.sort(
          (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
        );
      } else {
        this.iconFecha = "arrow_downward";
        this.iconPrecio = "";
        this.productos.sort(
          (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        );
      }
    },
    async getProducto() {
      try {
        const productoCollection = collection(db, "producto");
        const productoSnapshot = await getDocs(productoCollection);
        productoSnapshot.forEach((res) => {
          const producto = {
            id: res.id,
            price: res.data().price,
            shortDescription: res.data().shortDescription,
            fecha: res.data().fecha,
          };
          this.productos.push(producto);
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
