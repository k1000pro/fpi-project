<template>
  <q-page padding>
    <div class="main-container row">
      <OrdenarContainer
        :iconPrecio="iconPrecio"
        :iconFecha="iconFecha"
        @ordenarPorPrecio="ordenarPorPrecio"
        @ordenarPorFecha="ordenarPorFecha"
        @filtrarTodo="filtrarTodo"
        @ordenarPor="ordenarPor"
      ></OrdenarContainer>
      <div class="col-2 gt-sm fixed">
        <FiltroContainer @filtrarTodo="filtrarTodo"></FiltroContainer>
      </div>
      <CardsContainer :productos="productos"></CardsContainer>
      <PaginationContainer @paginacion="paginacion"></PaginationContainer>
    </div>
    <!-- <p>{{store.filtroMarca}} {{store.filtroSistemas}} {{store.filtroPantalla}}</p> -->
  </q-page>
</template>

<script>
import OrdenarContainer from "../components/OrdenarContainer.vue";
import CardsContainer from "../components/CardsContainer.vue";
import FiltroContainer from "../components/FiltroContainer.vue";
import PaginationContainer from "../components/PaginationContainer.vue";
import { ref, watch, computed } from "vue";
import { db, collection, getDocs } from "../boot/firebase";
import { useCounterStore } from "stores/dataglobal";
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
    const store = useCounterStore();
    const productos = ref([]);

    function paginacion() {
      console.log(store.productosRespaldo.length);
      productos.value = store.productosRespaldo;
      if (store.productosRespaldo.length <= store.productsPerPage) {
        store.maxPages = 1;
      } else if (store.productosRespaldo.length > store.productsPerPage) {
        store.maxPages = Math.trunc(
          store.productosRespaldo.length / store.productsPerPage + 1
        );

        productos.value = productos.value.slice(
          store.productsPerPage * (store.actualPage - 1),
          store.productsPerPage * store.actualPage
        );
      }
      console.log(store.maxPages);
    }
    return {
      store,
      iconFecha: ref(""),
      iconPrecio: ref("arrow_upward"),
      productos,
      paginacion,
    };
  },

  methods: {
    //filtrar con los radiobutton y por precios
    filtrarTodo() {
      this.productos = this.store.productosTotales;

      //FILTRAR PRODUCTOS NUEVOS O USADOS
      if (this.store.filtroNuevo == true) {
        var estado = "nuevo";
        this.productos = this.productos.filter((item) => {
          if (estado.includes(item.estado)) {
            return true;
          } else {
            return false;
          }
        });
        this.store.productosRespaldo = this.productos;
        this.paginacion();
      } else {
        this.store.productosRespaldo = this.productos;
        this.paginacion();
      }
      if (
        this.store.filtroMarcas == "" &&
        this.store.filtroSistemas == "" &&
        this.store.filtroPantallas == ""
      ) {
        //Filtrar por precios
        if (this.store.minPrecio > 0 && this.store.maxPrecio > 0) {
          this.productos = this.productos.filter((item) => {
            if (
              item.precio * 1 >= this.store.minPrecio &&
              item.precio * 1 <= this.store.maxPrecio
            ) {
              return true;
            } else {
              return false;
            }
          });
          this.store.productosRespaldo = this.productos;
          this.paginacion();
        }
      }
      if (this.store.filtroSistemas != "") {
        //Filtrar por sistema

        this.productos = this.productos.filter((item) => {
          if (this.store.filtroSistemas.includes(item.sistema)) {
            return true;
          } else {
            return false;
          }
        });
        //Filtrar por precios
        if (this.store.minPrecio > 0 && this.store.maxPrecio > 0) {
          this.productos = this.productos.filter((item) => {
            if (
              item.precio * 1 >= this.store.minPrecio &&
              item.precio * 1 <= this.store.maxPrecio
            ) {
              return true;
            } else {
              return false;
            }
          });
        }
        this.store.productosRespaldo = this.productos;
        this.paginacion();
      }
      if (this.store.filtroMarcas != "") {
        //Filtrar por marca

        this.productos = this.productos.filter((item) => {
          if (this.store.filtroMarcas.includes(item.marca)) {
            return true;
          } else {
            return false;
          }
        });
        //Filtrar por precios

        if (this.store.minPrecio > 0 && this.store.maxPrecio > 0) {
          this.productos = this.productos.filter((item) => {
            if (
              item.precio * 1 >= this.store.minPrecio &&
              item.precio * 1 <= this.store.maxPrecio
            ) {
              return true;
            } else {
              return false;
            }
          });
        }
        this.store.productosRespaldo = this.productos;
        this.paginacion();
      }

      if (this.store.filtroPantallas != "") {
        // console.log("Ahorita te filtro por pantalla")
        this.productos = this.productos.filter((item) => {
          if (this.store.filtroPantallas.includes(item.pantalla)) {
            return true;
          } else {
            return false;
          }
        });
        if (this.store.minPrecio > 0 && this.store.maxPrecio > 0) {
          this.productos = this.productos.filter((item) => {
            if (
              item.precio * 1 >= this.store.minPrecio &&
              item.precio * 1 <= this.store.maxPrecio
            ) {
              return true;
            } else {
              return false;
            }
          });
        }
        this.store.productosRespaldo = this.productos;
        this.paginacion();
      }
    },
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

    //Filtrar con el combobox solo de moviles
    ordenarPor() {
      if (this.store.ordenarPor == "Precio") {
        this.productos.sort((a, b) => a.precio - b.precio);
      } else {
        this.productos.sort(
          (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        );
      }
    },

    //funcion para traer los productos de la base de datos
    async getProducto() {
      try {
        this.store.productosTotales = [];
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
                  sistema: res.data().sistema,
                  marca: res.data().marca,
                  pantalla: res.data().pantalla,
                  estado: res.data().estado,
                };
                this.store.productosTotales.sort((a, b) => a.precio - b.precio);
                this.store.productosTotales.push(producto);
                this.store.productosTotales.push(producto);
                this.store.productosTotales.push(producto);
                this.productos = this.store.productosTotales;
                this.store.productosRespaldo = this.store.productosTotales;
              })
              .catch((error) => {
                // Handle any errors
              });
          });
        });

        //this.paginacion();
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getProducto();
  },
};
</script>
