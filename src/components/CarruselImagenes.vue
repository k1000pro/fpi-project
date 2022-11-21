<template>
  <div class="q-pa-sm flex justify-center">
    <q-responsive
      :ratio="4 / 3"
      style="width: 400px; max-width: 100%; height:450px;"
      class="shadow-2 rounded-borders"
    >
      <q-carousel swipeable animated arrows v-model="slide" infinite  control-color="primary" thumbnails>
        <q-carousel-slide
          v-for="(imagen, index) in imagenesProducto"
          :key="index"
          :name="imagen.id"
          :img-src="imagen.imgSrc"
        />
      </q-carousel>
    </q-responsive>
  </div>
</template>
<script>
import { ref } from "vue";
import {
  getStorage,
  ref as ref2,
  getDownloadURL,
  listAll,
} from "firebase/storage";

export default {
  setup() {
    const currentPath = window.location.hash;
    const id = currentPath.split("/").pop();
    return {
      slide: ref(1),
      imagenesProducto: ref([
       
      ]),
      id,
    };
  },
  methods: {
    getImages() {
      const storage = getStorage();
      var counter=1
      const carpetaPath = ref2(storage, this.id + "/");
      listAll(carpetaPath)
        .then((res) => {
          res.items.forEach((itemRef) => {
            // All the items under listRef.
            const imagenPath = ref2(storage, itemRef.fullPath);

            getDownloadURL(imagenPath)
              .then((url) => {
                // `url` is the download URL for 'images/stars.jpg'
                // Or inserted into an <img> element
                var imagen={
                  id:counter,
                  imgSrc: url
                }
                counter++
                this.imagenesProducto.push(imagen)
              })
              .catch((error) => {
                // Handle any errors
              });
          });
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
        });
    },
  },
  created() {
    this.getImages();
  },
};
</script>

