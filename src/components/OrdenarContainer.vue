<template>
  <div class="col-12 flex justify-end row gt-sm">
    <div class="row col-6 justify-end">
      <q-input
        dense
        standout="bg-primary text-white"
        :model-value="minPrecio"
        @update:model-value="minPrecio"
        label="Precio:"
        placeholder="$"
        type="number"
      />
      <q-input
        dense
        standout="bg-primary text-white"
        :model-value="maxPrecio"
        @input="$emit('update:model-value', $event.target.value)"
        label="Precio maximo:"
        placeholder="$"
        type="number"
      />
    </div>
    <div class="row col-6 justify-center">
      <q-btn-group>
        <q-btn
          @click="$emit('ordenarPorPrecio')"
          id="precioBtn"
          color="primary"
          label="Precio"
          :icon="iconPrecio"
        />
        <q-btn
          @click="$emit('ordenarPorFecha')"
          color="primary"
          label="Fecha"
          id="fechaBtn"
          :icon="iconFecha"

        />
      </q-btn-group>
    </div>
  </div>

  <!--OrdenarContainer para moviles-->
  <div class="col-12 flex justify-center row lt-md">
    <q-select
      class="col-6"
      dense
      standout="bg-primary text-black"
      :model-value="ordenarPor"

      :options="ordenarOptions"
      label="Ordenar por:"
      id="ordenarPorSelect"
    />
    <q-btn size="sm" icon="filter_alt" color="primary" @click="dialog = true" />
  </div>
  <!---Aqui empieza el offcanvas del filtro-->
  <div class="q-pa-sm q-gutter-sm">
    <q-dialog
      v-model="dialog"
      :maximized="maximizedToggle"
      position="right"
      transition-show="slide-left"
      transition-hide="slide-right"
    >
      <q-card class="bg-white text-black" style="min-width: 300px">
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
  props: ["iconPrecio", "iconFecha", "minPrecio", "maxPrecio", "ordenarPor"],
  emits: [
    "ordenarPorPrecio",
    "ordenarPorFecha",
    "update:model-value",

  ],
  setup(props, { emit }) {
    function devolverValor(e){
        console.log(e)
      }
    return {
      ordenarOptions: ["Precio", "Fecha"],
      dialog: ref(false),
      maximizedToggle: ref(true),
      devolverValor

    };
  },

  components: { FiltroContainer },
  methods: {},
};
</script>
