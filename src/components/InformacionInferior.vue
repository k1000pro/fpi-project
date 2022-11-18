<template>
  <div class="row">
    <div class="col-12 text-center">
      <span class="text-h4 ">Descripción</span>
    </div>
  </div>
  <div class="row justify-center q-my-sm">
    <div class="col-12 col-md-5">
      <q-card class="my-card q-ma-sm tamanio" bordered>
        <q-card-section class="q-ma-auto">
          <ul >
            <li
              class="row justify-between "
              v-for="(value, propiedad) in arrayDetalleTelefono"
              :key="value"
            >
              <span class="col-6"><strong>{{ propiedad }}:</strong></span
              ><span class="col-6"> {{ value }}</span>
            </li>
          </ul>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-12 col-md-5">
      <q-card class="my-card q-ma-sm q-pa-md tamanio">
        <q-card-section class="q-ma-auto">
          {{ descripcion }}
        </q-card-section>
      </q-card>
    </div>
  </div>
  <div class="row posicionamiento justify-center">
    <q-btn color="primary lt-md q-px-lg q-mr-sm " to="/" label=" Inicio " />
    <q-btn color="primary lt-md" label="Comprar" />
  </div>
</template>

<script>
import { ref } from "vue";
import { db, collection, getDocs, storage, storageRef } from "../boot/firebase";

export default {
  setup() {
    const currentPath = window.location.hash;
    const id = currentPath.split("/").pop();
    return {
      descripcion: ref(""),
      arrayDetalleTelefono: ref({
        Estado: "",
        Marca: "",
        Modelo: "",
        Pantalla: "",
        Sistema: "",
        Rom: "",
        Ram: "",
      }),
      async getProducto() {
        try {
          const productoCollection = collection(db, "producto");
          const productoSnapshot = await getDocs(productoCollection);
          productoSnapshot.forEach((res) => {
            if (res.id == id) {
              this.descripcion = res.data().descripcion;
              this.arrayDetalleTelefono.Estado = res.data().estado.charAt(0).toUpperCase() +
              res.data().estado.substring(1);
              this.arrayDetalleTelefono.Marca = res.data().marca.charAt(0).toUpperCase() +
              res.data().marca.substring(1);
              this.arrayDetalleTelefono.Modelo = res.data().modelo.charAt(0).toUpperCase() +
              res.data().modelo.substring(1);
              this.arrayDetalleTelefono.Pantalla = res.data().pantalla+" pulgadas";
              this.arrayDetalleTelefono.Sistema = res.data().sistema.charAt(0).toUpperCase() +
              res.data().sistema.substring(1);
              this.arrayDetalleTelefono.Rom = res.data().rom+ " GB";
              this.arrayDetalleTelefono.Ram = res.data().ram+ " GB";
            } else {
            }
          });
        } catch (error) {
          console.log(error);
        }
      },
    };
  },
  created() {
    this.getProducto();
  },
};
</script>

<style>
.tamanio {
  min-width: 80%;
  min-height: 95%;
  border: 1px #8e79ba solid;
}
.posicionamiento {
  position: sticky;
  bottom: 5px;
}
li:hover{
  background-color: #8e79ba;
  color: #fff;
  border-radius: 3px;
  
}
</style>
