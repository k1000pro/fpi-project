<template>
  <div class="col-12 flex justify-end row gt-sm">
    <div class="row col-6 justify-end">
      <q-input
        dense
        standout="bg-primary text-white"
        v-model="minPrecio"
        label="Precio:"
        placeholder="$"
      />
      <q-input
        dense
        standout="bg-primary text-white"
        v-model="maxPrecio"
        label="Precio maximo:"
        placeholder="$"
      />
    </div>
    <div class="row col-6 justify-center">
      <q-btn-group>
        <q-btn color="primary" label="Precio" icon="arrow_downward" />
        <q-btn color="primary" label="Fecha" />
      </q-btn-group>
    </div>
  </div>

  <!--OrdenarContainer para moviles-->
  <div class="col-12 flex justify-center row lt-md">
    <q-select
      class="col-6"
      dense
      standout="bg-primary text-black"
      v-model="ordenarPor"
      :options="ordenarOptions"
      label="Ordenar por:"
    />
    <q-btn size="sm" icon="filter_alt" color="primary" @click="dialog = true" />
  </div>
  <!---Aqui empieza el offcanvas del filtro-->
  <div class="q-pa-sm q-gutter-sm">
    <q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-left"
      transition-hide="slide-right"
    >
      <q-card class="bg-white text-black">
        <q-bar>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup> </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">Filtrar</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <FiltroContainer></FiltroContainer>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
  <!---Aqui termina el modal-->
</template>
<script>
import { ref } from "vue";
import FiltroContainer from "../components/FiltroContainer.vue";

export default {
  setup() {
    return {
      minPrecio: ref(""),
      maxPrecio: ref(""),
      ordenarPor: ref(""),
      ordenarOptions: ["Precio", "Fecha"],
      dialog: ref(false),
      maximizedToggle: ref(true),
    };
  },
  components: { FiltroContainer },
};
</script>
