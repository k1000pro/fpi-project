<template>
  <q-toggle v-model="estado" color="primary" keep-color label="Nuevo" />

  <div class="column">
    <h6 class="text-dark q-mt-sm q-mb-none">Marca</h6>
    <div class="q-pa-md rounded-borders text-caption options-container">
      <q-option-group
        v-model="marca"
        :options="marcaOptions"
        color="primary"
        right-label
        size="xs"
        keep-color
      >
        <template v-slot:label="marcaOptions">
          <div class="row items-center">
            <span class="text-black">{{ marcaOptions.label }}</span>
            <q-badge text-color="white " color="primary" class="q-ml-xs">{{
              marcaOptions.stock
            }}</q-badge>
          </div>
        </template></q-option-group
      >
    </div>
    <h6 class="text-dark q-mt-md q-mb-none">Sistema</h6>
    <div class="q-pa-md rounded-borders text-caption options-container">
      <q-option-group
        v-model="sistema"
        :options="sistemaOptions"
        color="primary"
        size="xs"
        keep-color
        ><template v-slot:label="sistemaOptions">
          <div class="row items-center">
            <span class="text-black">{{ sistemaOptions.label }}</span>
            <q-badge text-color="white " color="primary" class="q-ml-xs">{{
              sistemaOptions.stock
            }}</q-badge>
          </div>
        </template></q-option-group
      >
    </div>
    <h6 class="text-dark q-mt-md q-mb-none">Pantalla</h6>
    <div class="q-pa-md rounded-borders text-caption options-container">
      <q-option-group
        v-model="pantalla"
        :options="pantallaOptions"
        color="primary"
        size="xs"
        keep-color
        ><template v-slot:label="pantallaOptions">
          <div class="row items-center">
            <span class="text-black">{{ pantallaOptions.label }}</span>
            <q-badge text-color="white " color="primary" class="q-ml-xs">{{
              pantallaOptions.stock
            }}</q-badge>
          </div>
        </template></q-option-group
      >
    </div>
    <q-btn
      @click="limpiarFiltro"
      size="12px"
      flat
      dense
      class="q-mt-sm"
      color="primary"
      >Limpiar filtros</q-btn
    >
   


  </div>
</template>
<script>

import { ref,watch } from "vue";
import { db, collection, getDocs,} from "../boot/firebase";
import { useCounterStore } from 'stores/dataglobal';




export default {
  emits: ['filtrarTodo','paginacion'],
  setup(props,{emit}) {

    const store = useCounterStore();
    const estado=ref(store.filtroNuevo)
    const marca=ref(store.filtroMarcas)
    const sistema=ref(store.filtroSistemas)
    const pantalla=ref(store.filtroPantallas)
    watch (marca,(newMarca, marca )=> {
      store.filtroMarcas=newMarca
      emit('filtrarTodo')
    })
    watch (sistema,(newSistema, sistema )=> {
      store.filtroSistemas=newSistema
      emit('filtrarTodo')
    })
    watch (pantalla,(newPantalla, pantalla )=> {
      store.filtroPantallas=newPantalla
      emit('filtrarTodo')
    })
    watch (estado,(nuevoValor, viejoValor )=> {
      store.filtroNuevo=nuevoValor
      emit('filtrarTodo')
    })
    //Desmarcar los radio btns
    function limpiarFiltro() {
      estado.value=false;
      marca.value = 0;
      sistema.value = 0;
      pantalla.value = 0;
      store.filtroMarcas = ''
      store.filtroSistemas = ''
      store.filtroPantallas = ''
      emit('paginacion')
    }
    return {
      store,
      estado,
      marcaOptions: ref([]),
      sistemaOptions: ref([]),
      pantallaOptions: ref([]),
      marca,
      sistema,
      pantalla,
      limpiarFiltro
    };
  },
  methods: {
    
    //Construccion del filtro
    async constFiltro() {
      try {
        var marcaRepetida = false;
        var pantallaRepetida = false;
        var sistemaRepetida = false;
        const productoCollection = collection(db, "producto");
        const productoSnapshot = await getDocs(productoCollection);
        productoSnapshot.forEach((res) => {
          marcaRepetida = false;
          pantallaRepetida = false;
          sistemaRepetida = false;
          this.marcaOptions.forEach((marca) => {
            if (res.data().marca != marca.value) {
            } else {
              marcaRepetida = true;
              marca.stock++;
            }
          });
          const marca = {
            label:
              res.data().marca.charAt(0).toUpperCase() +
              res.data().marca.substring(1),
            value: res.data().marca,
            stock: 1,
          };
          this.pantallaOptions.forEach((pantalla) => {
            if (res.data().pantalla != pantalla.value) {
            } else {
              pantallaRepetida = true;
              pantalla.stock++;
            }
          });
          const pantalla = {
            label: res.data().pantalla + " pulgadas",
            value: res.data().pantalla,
            stock: 1,
          };
          //verificar si esta repetido sistema
          this.sistemaOptions.forEach((sistema) => {
            if (res.data().sistema != sistema.value) {
            } else {
              sistemaRepetida = true;
              sistema.stock++;
            }
          });
          const sistema = {
            label:
              res.data().sistema.charAt(0).toUpperCase() +
              res.data().sistema.substring(1),
            value: res.data().sistema,
            stock: 1,
          };

          pantallaRepetida == false ? this.pantallaOptions.push(pantalla) : NaN;
          marcaRepetida == false ? this.marcaOptions.push(marca) : NaN;
          sistemaRepetida == false ? this.sistemaOptions.push(sistema) : NaN;
        });
        
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.constFiltro();

  }
};
</script>
<style lang="sass">
li
    list-style: None
.q-list
    border-color: #8e79ba
.options-container
  border: solid #8e79ba 1px
</style>
