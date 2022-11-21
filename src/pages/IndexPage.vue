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
        <FiltroContainer

        ></FiltroContainer>
      </div>
      <CardsContainer :productos="productos"></CardsContainer>
      <PaginationContainer></PaginationContainer>
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
import { useCounterStore } from 'stores/dataglobal';
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
    const minPrecio = ref();
    const maxPrecio = ref();
    const ordenarPor = ref("Precio");
    const productos = ref([])

    watch(minPrecio, (newMinPrecio) => {
      console.log(newMinPrecio);
    });
    function filtrarTodo(){
      // console.log('Estoy filtrando')
      if (store.filtroMarca == '' && store.filtroSistemas == '' && store.filtroPantalla == ''){
        // console.log("No puedo filtrar")
        productos.value = store.productosTotales
        return false
      }
      if (store.filtroSistemas != '') {
        // console.log("Ahorita te filtro por sistema")

        productos.value = productos.value.filter((item) => {
          if (store.filtroSistemas.includes(item.sistema)) {
            // console.log("entre a la funcion de filtrado")
            return true
          }else {
            return false
          }
        }
        )
      }
      if (store.filtroMarca != '') {
        // console.log("Ahorita te filtro por Marca")
        productos.value = productos.value.filter((item) => {
            if (store.filtroMarca.includes(item.marca)) {
              return true
            }else {
              return false
            }
          }
        )
      }

      if (store.filtroPantalla != '') {
        // console.log("Ahorita te filtro por pantalla")
        productos.value = productos.value.filter((item) => {
            if (store.filtroPantalla.includes(item.pantalla)) {
              return true
            }else {
              return false
            }
          }
        )
      }


    }
    //tengo que buscar una forma de cambiarlo
    const hayFiltroSis = computed ( () => {
      return store.filtroSistemas
    }
    )
    watch (hayFiltroSis, ( nuevo, viejo )=> {
      filtrarTodo()
    })
    const hayFiltroMar = computed ( () => {
      return store.filtroMarca
    }
    )
    watch (hayFiltroMar, ( nuevo, viejo )=> {
      filtrarTodo()
    })
    const hayFiltroPan = computed ( () => {
      return store.filtroSistemas
    }
    )
    watch (hayFiltroPan, ( nuevo, viejo )=> {
      filtrarTodo()
    })

    return {
      store,
      iconFecha: ref(""),
      iconPrecio: ref("arrow_upward"),
      productos,
      productosOriginales: ref([]),
      minPrecio,
      maxPrecio,
      ordenarPor,
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
                  sistema: res.data().sistema,
                  marca: res.data().marca,
                  pantalla: res.data().pantalla
                };
                this.store.productosTotales.sort((a, b) => a.precio - b.precio);
                this.store.productosTotales.push(producto);
                this.productos = this.store.productosTotales
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
