<template>
  <div class="col-2 gt-sm"></div>
  <div class="q-pa-md row q-gutter-md col-xs-12 col-sm-10 justify-around">
    <q-intersection
      v-for="index in 20"
      :key="index"
      transition="scale"
      class="my-card"
      once
    >
      <q-card class="q-ma-sm shadow-7">
        <img src="../assets/huawei.jpg" />

        <q-card-section>
          <div class="text-h6">$132.00 </div>
          <div class="text-subtitle2">Samsung J6, Pantalla de 5.5 64GB, 2GB Ram, Color Negro</div>
        </q-card-section>
      </q-card>
    </q-intersection>
  </div>
 
</template>
<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      current: ref(1)
    }
  }
}
</script>
<style lang="sass" scoped>
.my-card
  min-height: 400px
  width: 250px
.q-card
  cursor: pointer
  transition: all 0.3s
.q-card:hover
  scale: 1.1
  background-color:#8e79ba
  color: white
</style>
