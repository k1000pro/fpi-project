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
      <CardsContainer :productos="productos" ></CardsContainer>
      <PaginationContainer :maxPages="maxPages" :actualPage="actualPage" :productsPerPage="productsPerPage"></PaginationContainer>
    </div>
  </q-page>
</template>

<script>
import OrdenarContainer from "../components/OrdenarContainer.vue";
import CardsContainer from "../components/CardsContainer.vue";
import FiltroContainer from "../components/FiltroContainer.vue";
import PaginationContainer from "../components/PaginationContainer.vue";
import { ref, watch } from "vue";
import { db, collection, getDocs } from "../boot/firebase";
import {
  getStorage,
  ref as ref2,
  getDownloadURL,
  listAll,
} from "firebase/storage";

export default {
  components: {
    CardsContainer,
    FiltroContainer,
    PaginationContainer,
    OrdenarContainer,
  },

  setup() {
    const productsPerPage=ref( '8')
    const actualPage=ref(1);
    const maxPages=ref(1);
    const minPrecio = ref();
    const maxPrecio = ref();
    const ordenarPor = ref("Precio");
    watch(minPrecio, (newMinPrecio) => {
      console.log(newMinPrecio);
    });
    return {
      iconFecha: ref(""),
      iconPrecio: ref("arrow_upward"),
      productos: ref([]),
      minPrecio,
      maxPrecio,
      ordenarPor,
      actualPage,
      maxPages,
      productsPerPage
    };
  },
  created() {
    this.getProducto();
  },
  methods: {
    //metodo para ordenar productos por precio
    ordenarPorPrecio() {
      if (this.iconPrecio === "arrow_upward") {
        this.iconPrecio = "arrow_downward";
        this.iconFecha = "";
        this.productos.sort((a, b) => b.precio - a.precio);
      } else {
        this.iconPrecio = "arrow_upward";
        this.iconFecha = "";
        this.productos.sort((a, b) => a.precio - b.precio);
      }
    },
    //metodo para ordenar productos por fecha
    ordenarPorFecha() {
      if (this.iconFecha === "arrow_upward") {
        this.iconFecha = "arrow_downward";
        this.iconPrecio = "";
        this.productos.sort(
          (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        );
      } else {
        this.iconFecha = "arrow_upward";
        this.iconPrecio = "";
        this.productos.sort(
          (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
        );
      }
    },
    //funcion para traer los productos de la base de datos
    async getProducto() {
      try {
        const storage = getStorage();
        const productoCollection = collection(db, "producto");
        const productoSnapshot = await getDocs(productoCollection);
        productoSnapshot.forEach((res) => {
          var carpetaPath = ref2(storage, res.id + "/");
          listAll(carpetaPath).then((resp) => {
            // All the items under listRef.
            const imagenPath = ref2(storage, resp.items[0].fullPath);
            getDownloadURL(imagenPath)
              .then((url) => {
                // `url` is the download URL for 'images/stars.jpg'
                // Or inserted into an <img> element
                const producto = {
                  id: res.id,
                  precio: res.data().precio,
                  titulo: res.data().titulo,
                  fecha: res.data().fecha,
                  url: url,
                };
                this.productos.sort((a, b) => a.precio - b.precio);
                this.productos.push(producto);
              })
              .catch((error) => {
                // Handle any errors
              });
          });
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
