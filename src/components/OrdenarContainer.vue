<template>
  <div class="col-12 flex justify-end row gt-sm">
    <div class="row col-6 justify-end">
      <q-input
        dense
        standout="bg-primary text-white"
        v-model="minPrecio"
        label="Precio:"
        placeholder="$"
        type="number"
      />
      <q-input
        dense
        standout="bg-primary text-white"
        v-model="maxPrecio"
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
      v-model="ordenarPor"
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
          <FiltroContainer  @filtrarTodo="$emit('filtrarTodo')"></FiltroContainer>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
  <!---Aqui termina el modal-->
</template>
<script>
import { ref,watch } from "vue";
import FiltroContainer from "../components/FiltroContainer.vue";
import { useCounterStore } from 'stores/dataglobal';

export default {
  props: ["iconPrecio", "iconFecha"],
  emits: [
    "ordenarPorPrecio",
    "ordenarPorFecha",
    "filtrarTodo",
    "ordenarPor"
  ],
  setup(props,{ emit } ) {
    const store = useCounterStore();
    const minPrecio=ref();
    const maxPrecio=ref();
    const ordenarPor=ref("Precio");

    watch (minPrecio,(newMinPrecio, minPrecio )=> {
      store.minPrecio=newMinPrecio
      emit('filtrarTodo')
    })
    watch (maxPrecio,(newMaxPrecio, maxPrecio )=> {
      store.maxPrecio=newMaxPrecio
      emit('filtrarTodo')
    })
    watch(ordenarPor,(newOrdenarPor,ordenarPor)=>{
      store.ordenarPor=newOrdenarPor
      emit('ordenarPor')
    })
    return {
      ordenarOptions: ["Precio", "Fecha"],
      dialog: ref(false),
      maximizedToggle: ref(true),
      store,
      minPrecio,
      maxPrecio,
      ordenarPor,
      

    };
  },

  components: { FiltroContainer },
  methods: {
  
  },
};
</script>
