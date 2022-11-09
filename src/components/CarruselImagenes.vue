<template>
  <div class="q-pa-sm flex justify-center ">
    <q-responsive :ratio="4/3" style="width: 475px; max-width: 100%;" class="shadow-2 rounded-borders">
      <q-carousel
        swipeable
        animated
        arrows
        v-model="slide"
        infinite
        navigation
      >
      <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" class="rounded-borders" />
      <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" class="rounded-borders" />
      <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" class="rounded-borders"/>
      <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" class="rounded-borders"/>
      </q-carousel>
    </q-responsive>
  </div>
  </template>
  <script>
  import { ref } from 'vue'

  export default ({
    setup () {
      return {
        slide: ref(1)
      }
    }
  })
  </script>
