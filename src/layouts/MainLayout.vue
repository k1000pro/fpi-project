<template>
  <q-layout view="hhh LpR lff">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar class="justify-between">
        <q-btn class="lt-md" flat @click="drawer = !drawer" round icon="menu" />
        <q-toolbar-title
          class="gt-sm col-3 text-weight-bold title"
          @click="regresarInicio"
        >
          <q-icon
            name="img:/icons/logo.png"
            style="height: 40px; width: 27px"
          />
          Tienda Cellphone
        </q-toolbar-title>
        <q-select
          @filter="filterFn"
          use-input
          hide-selected
          color="primary"
          bg-color="white"
          outlined
          item-aligned
          dense
          v-model="text"
          :options="options"
          input-class="text-right"
          class="col-sm-4"
          popup-content-style="background-color: #fff; color:black; "
          name="search"
          placeholder="Buscar"
          hide-dropdown-icon
          transition-show="jump-up"
        transition-hide="jump-up"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
          <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              style="height: 75px;  max-width: fit-content; min-width: 100%;"
              @click="irAlProducto(scope.opt.id)"
            >
              <q-item-section avatar="">
                <img :src="scope.opt.url" alt="Producto" width="75" />
              </q-item-section>
              <q-item-section style="color: black">
                <q-item-label
                  ><strong>${{ scope.opt.precio }}</strong></q-item-label
                >
                <q-item-label class="ellipsis-2-lines">{{
                  scope.opt.titulo
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:no-option>
            <q-item style="background-color: white; color: black; height: 75px">
              <q-item-section class="text-italic text-grey">
                No hay resultados
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-list padding class="row col-3 justify-end gt-sm text-weight-bold">
          <q-item
            active
            clickable
            v-ripple
            to="/"
            exact
            active-class="my-menu-link"
          >
            <q-item-section>Inicio</q-item-section>
          </q-item>
          <ModalAnuncio></ModalAnuncio>
          <q-item clickable v-ripple>
            <q-item-section class="text-grey-4">
              <q-icon name="shopping_cart" size="sm" />
              <q-badge text-color="black  " color="white" floating transparent
                >5</q-badge
              >
            </q-item-section>
          </q-item>
        </q-list>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      :width="300"
      :breakpoint="500"
      overlay
      bordered
      class="bg-primary"
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-toolbar-title
            class="text-white q-my-md q-ml-md text-center text-weight-bold"
          >
            <q-icon
              name="img:/icons/logo.png"
              style="height: 40px; width: 27px"
            />
            Tienda Cellphone
          </q-toolbar-title>
          <q-list padding class="column text-center">
            <q-separator />
            <q-item
              active
              clickable
              v-ripple
              to="/"
              class="q-pa-lg text-weight-bold"
              active-class="my-menu-link"
            >
              <q-item-section>Inicio</q-item-section>
            </q-item>
            <q-separator />

            <ModalAnuncio></ModalAnuncio>

            <q-separator />
            <q-item clickable v-ripple to="/" class="q-pa-lg text-weight-bold">
              <q-item-section class="text-grey-4">Carrito</q-item-section>
            </q-item>
            <q-separator />
          </q-list>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- drawer content -->

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-white text-black">
      <q-toolbar class="column">
        <div class="text-grey-6">Martinez Molina, Kamilo Ernesto</div>
        <div class="text-grey-6">Perez Gonzalez, Diego Fernando</div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import ModalAnuncio from "src/components/ModalAnuncio.vue";
import { ref } from "vue";
import { db, collection, getDocs } from "../boot/firebase";
import {
  getStorage,
  ref as ref2,
  getDownloadURL,
  listAll,
} from "firebase/storage";

export default {
  setup() {
    function irAlProducto(id) {
      if (window.location.hash.indexOf("Producto") == -1) {
        window.location.hash = "Producto/" + id;
      } else {
        window.location.hash = "Producto/" + id;
        location.reload();
      }
      this.text = "";
    }
    const productos = ref([]);
    const options = ref([]);
    //Funcion para redirigir
    function regresarInicio() {
      window.location.hash = "/";
    }
    const leftDrawerOpen = ref(false);

    return {
      irAlProducto,
      regresarInicio,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      productoBuscado: ref(),
      drawer: ref(false),
      text: ref(""),
      productos,
      options,

      filterFn(val, update, abort) {
        if (val.length < 2) {
          abort();
          return;
        }
        update(() => {
          const respaldo = JSON.parse(JSON.stringify(productos.value));
          const valorBuscado = val.toLowerCase();
          var productosFiltrados = [];
          respaldo.forEach((producto) => {
            var valores = [producto.precio, producto.titulo];
            for (var i = 0; i < valores.length; i++) {
              var valoresFiltrados = valores[i]
                .toLowerCase()
                .includes(valorBuscado);
            }
            if (valoresFiltrados == true) {
              var productoFiltrado = {
                id: producto.id,
                precio: producto.precio,
                titulo: producto.titulo,
                url: producto.url,
              };
              productosFiltrados.push(productoFiltrado);
            }
          });
          options.value = productosFiltrados;
        });
      },
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
                    url: url,
                  };
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
    };
  },
  components: { ModalAnuncio },
  created() {
    this.getProducto();
  },
};
</script>
<style lang="sass">
.my-menu-link
  color: white
.title
  cursor: pointer
</style>
