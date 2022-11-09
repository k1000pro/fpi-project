<template>
  <q-layout view="hhh LpR lff">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar class="justify-between">
        <q-btn class="lt-md" flat @click="drawer = !drawer" round icon="menu" />
        <q-toolbar-title class="gt-sm col-3 text-weight-bold">
          <q-icon
            name="img:/icons/logo.png"
            style="height: 40px; width: 27px"
          />
          Tienda Cellphone
        </q-toolbar-title>
        <q-input
          dark
          dense
          standout
          v-model="text"
          input-class="text-right"
          class="col-auto"
          name="producto_buscar"
          placeholder="Buscar"
        >
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon
              v-else
              name="clear"
              class="cursor-pointer"
              @click="text = ''"
            />
          </template>
        </q-input>
        <q-list padding class="row col-3 justify-end gt-sm text-weight-bold">
          <q-item active clickable v-ripple to="/" exact active-class="my-menu-link">
            <q-item-section >Inicio</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/">
            <q-item-section class="text-grey-4 ">
              <q-icon name="add" size="sm" />
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/">
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
          <q-toolbar-title class="text-white q-my-md q-ml-md text-center text-weight-bold">
            <q-icon
              name="img:/icons/logo.png"
              style="height: 40px; width: 27px"
            />
            Tienda Cellphone
          </q-toolbar-title>
          <q-list padding class="column text-center">
            <q-separator />
            <q-item active clickable v-ripple to="/" class="q-pa-lg text-weight-bold" active-class="my-menu-link">
              <q-item-section >Inicio</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple to="/" class="q-pa-lg text-weight-bold">
              <q-item-section class="text-grey-4">Nuevo anuncio</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple to="/" class="q-pa-lg text-weight-bold" >
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
        <div class="text-grey-6">
          Martinez Molina, Kamilo Ernesto
        </div>
        <div class="text-grey-6">
          Perez Gonzalez, Diego Fernando
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from "vue";
const menuList = [
  {
    label: "Inicio",
    separator: true,
  },
  {
    icon: "inbox",
    label: "Nuevo anuncio",
    separator: true,
  },
  {
    icon: "inbox",
    label: "Carrito",
    separator: true,
  },
];

export default {
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      productoBuscado: ref(),
      drawer: ref(false),
      menuList,
      text: ref(""),
      tab: ref("mails"),
    };
  },
};
</script>
<style lang="sass">
.my-menu-link
  color: white
</style>
