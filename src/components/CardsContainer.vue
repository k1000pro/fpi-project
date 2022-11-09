<template>
  <div class="col-2 gt-sm"></div>
  <div class="q-pa-md row q-gutter-md col-xs-12 col-sm-10 justify-around">
    <q-card
      class="q-ma-lg shadow-7 q-card"
      v-for="(producto, index) in productos"
      :key="index"

    >
      <img src="../assets/huawei.jpg" />
      <q-card-section>
        
        <div class="text-h6" v-html="producto.price"></div>
        <div class="text-subtitle2" v-html="producto.shortDescription"></div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { ref } from "vue";
import { db, collection, getDocs,storage,storageRef } from "../boot/firebase";


export default {
    props: ['productos'],
  
  setup(props) {
    const gsReference=storageRef(storage,"gs://fpi-project-c21aa.appspot.com/huawei.jpg")
    
    return {
    };
  },
  created() {

  
  },
 
  methods: {
    
   
    
  },
};
</script>
<style lang="sass" scoped>
.q-card
  max-height: 350px
  width: 250px
.q-card
  cursor: pointer
  transition: all 0.3s
.q-card:hover
  scale: 1.05
  background-color:#8e79ba
  color: white
</style>
