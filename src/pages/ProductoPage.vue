<template>
  <q-page>
    <div class="row justify-center q-mt-sm">
      <div class="col-12 col-md-5 q-mx-sm">
        <CarruselImagenes></CarruselImagenes>
      </div>
      <div class="col-12 col-md-6 q-mx-sm">
        <InformacionVertical ></InformacionVertical>
      </div>
    </div>
    <InformacionInferior></InformacionInferior>
  </q-page>
</template>

<script>

import CarruselImagenes from "src/components/CarruselImagenes.vue";
import InformacionInferior from "src/components/InformacionInferior.vue";
import InformacionVertical from "src/components/InformacionVertical.vue";
import { defineComponent } from "vue";
import { ref } from "vue";

export default defineComponent({
    name: "ProductoPage",
    components: { CarruselImagenes, InformacionInferior, InformacionVertical },
    setup(){

      return{
      }
    }
});
</script>
