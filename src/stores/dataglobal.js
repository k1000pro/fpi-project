import { defineStore } from 'pinia'

export const useCounterStore = defineStore('dataglobal', {
  state: () => ({
    counter: 0,
    filtroSistemas: '',
    filtroMarcas: '',
    filtroPantallas:'',
    productosTotales:[],
    maxPrecio:0,
    minPrecio:0,
    productsPerPage:8,
    maxPages:1,
    actualPage:1,
    filtroNuevo:false,
    productosRespaldo:[],

  }),

  getters: {
    doubleCount (state) {
      return state.counter * 2
    }
  },

  actions: {
    increment () {
      this.counter++
    }
  }
})
