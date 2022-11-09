<template>
  <div class="q-px-lg">
    <span class="text-h6 q-pt-md block text-primary" >{{titulo}}</span>
    <span class="text-h4 q-py-md block text-primary">{{precio}}</span>
    <q-btn color="primary gt-sm" label="Comprar" />
    <legend class=" row rounded-borders q-my-md justify-center q-mr-md q-py-md text-primary shadow-2 ">
      <span class="col-6 text-center text-subtitle2"> Vendedor: {{vendedor}} </span>
      <span class="col-6 text-center text-subtitle2"> Telefono: {{telefono}} </span>
    </legend>
  </div>

</template>
<script>
import { ref } from 'vue';

  export default {
    setup () {
      return {
        vendedor: 'Juan Perez',
        telefono: '77243727',
        precio: '$235.00',
        titulo: 'Iphone 6 pantalla de 8 pulgadas, 64Gb internos, 2Gb de Ram, Sólo Banda Tigo, Nuevo'
    }
  }
}
</script>
<style>
legend{
  border: 1px #8e79ba solid;
  padding: 5px;
}
</style>
