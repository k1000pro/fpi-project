<!-- eslint-disable vue/valid-v-for -->
<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div class="q-pa-none">

    <q-item clickable v-ripple class="gt-sm" @click="dialog = true">
      <q-item-section class="text-grey-4  gt-sm">
        <q-icon name="add" size="sm" />
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple  class="text-weight-bold lt-md"  @click="dialog = true">
        <q-item-section class="text-grey-4">Nuevo anuncio</q-item-section>
    </q-item>
    <q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-white text-primary q-pa-none">
        <q-bar class="bg-black">
          <q-space />
          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section class=" row text-center q-pb-none">
          <div class="text-h4 col-12">Nuevo Anuncio</div>
        </q-card-section>
        <div class=" q-ma-md ">
            <!-- Inicio -->
            <q-form
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md row justify-evenly "
            >
              <div class="col-12 col-sm-5 cuadrado">
                <div class="row justify-star q-mx-xl">
                  <!-- Radio Botton -->
                  <div class="col-8 justify-star">
                    <span >Estado: </span>
                    <q-radio v-model="nuevo.estado" val="nuevo" label="Nuevo" />
                    <q-radio v-model="nuevo.estado" val="usado" label="Usado" />
                  </div>
                  <!-- Inputs -->
                  <div class="col-12 col-sm-9">
                    <q-input  standout="bg-primary text-white" prefix="Marca:" v-model="nuevo.marca" label="Marca del Telefono *"  :dense="dense" lazy-rules
                    filled :rules="[ val => val && val.length > 0 || 'Por favor rellene el campo']" @update:model-value="envioVar" />
                    <q-input standout="bg-primary text-white" prefix="Modelo:" v-model="nuevo.modelo" label="Modelo del Telefono *"  :dense="dense" lazy-rules
                      filled :rules="[ val => val && val.length > 0 || 'Por favor rellene el campo']" @update:model-value="envioVar" />
                    <q-input
                          filled
                          standout="bg-primary text-white"
                          v-model="nuevo.pantalla"
                          label="Pantalla"
                          prefix="Pantalla:"
                          suffix="Pulgadas"
                          mask="#.#"
                          input-class="text" :dense="dense" lazy-rules
                          :rules="[ val => val && val.length > 0 || 'Por favor rellene el campo'] "
                          @update:model-value="envioVar"
                        />
                      <q-select standout="bg-primary text-white" v-model="arrSistemas" :options="options" prefix="Sistema:" label="Sistema Operativo"  :dense="dense" lazy-rules :rules="[ val => val || 'Por favor rellene el campo']" filled @update:model-value="envioVar" />
                      <q-input  standout="bg-primary text-white" v-model="nuevo.rom" label="Almacenamiento interno"  :dense="dense" lazy-rules
                        filled :rules="[ val => val && val.length > 0 || 'Por favor rellene el campo']"  mask="###" prefix="ROM:" suffix="GB" @update:model-value="envioVar"/>
                        <q-input  standout="bg-primary text-white" v-model="nuevo.ram" label="Memoria RAM"  :dense="dense" lazy-rules
                        filled :rules="[ val => val && val.length > 0 || 'Por favor rellene el campo']"  mask="##" prefix="RAM:" suffix="GB" @update:model-value="envioVar"/>
                  </div>
                </div>
              </div>
              <div class="col-12 col-sm-5 flex ">
                <div class="row justify-star q-mx-xl q-mb-md">
                  <span class="text-subtitle1 col-12">Titulo breve del anuncio</span>
                  <q-input class="col-12"  standout="bg-primary text-white"  v-model="nuevo.titulo"   :dense="dense" lazy-rules
                    filled :rules="[ val => val && val.length > 0 || 'Por favor rellene el campo']"
                    @update:model-value="envioVar" />
                    <q-input  standout="bg-primary text-white" prefix="Vendedor:" v-model="nuevo.vendedor" label="Vendedor del telefono"  :dense="dense" lazy-rules
                    filled :rules="[ val => val && val.length > 0 || 'Por favor rellene el campo']"
                    @update:model-value="envioVar"/>
                    <q-input
                      filled
                      v-model="nuevo.telefono"
                      label="Numero telefonico"
                      mask=" ####-####"
                      standout="bg-primary text-white"
                      lazy-rules
                      @update:model-value="envioVar"
                      :rules="[ val => val && val.length > 8 || 'Por favor rellene el campo']"
                    />
                    <span class="text-subtitle1 col-12">Descripcion</span>
                    <q-input
                        v-model="nuevo.descripcion"
                        filled
                        class="col-12"
                        clearable
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Por favor rellene el campo']"
                        color="primary"
                        label="Descripcion del Producto"
                        autogrow
                        @update:model-value="envioVar"
                      />
                </div>
              </div>
              <!-- Subir cosas -->
              <div class="col-12 col-sm-6 cuadrado">
                <div class="row flex justify-center">
                  <div class="q-pa-md col-8 ">
                    <q-file
                      v-model="fotos"
                      label="Selecciones las fotos"
                      filled
                      multiple
                      style="max-width: 400px"
                      accept=".jpg, image/*"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || 'Seleccione las imagenes']"
                      @update:model-value="envioVar ,obternerURL"
                    />
                  </div>
                </div>


                <div class="q-pa-md flex justify-center">
                  <q-carousel
                    animated
                    v-model="slide"
                    arrows
                    navigation
                    infinite
                    style="max-height: 200px; max-width: 300px; min-width: 300px; min-height: 200px;"
                    v-if="fotosURL.length>0"
                  >
                    <q-carousel-slide v-for="(img, id) in fotosURL" :key="id"  :name="id+1"  :img-src="img" />
                  </q-carousel>
                </div>
                <div class="row q-mb-md flex justify-center">
                  <q-btn icon="delete" label="Eliminar fotos" color="primary" @click="limpiarFotos" v-if="fotosURL.length>0" />
                </div>

              </div>
              <!-- Fin Subir cosas -->
              <div class="flex justify-center col-12 col-sm-4 ">

                  <div class="row q-mx-md ">
                    <div class=" col-12 ">
                      <div class="col-12 text-center q-mb-md">
                        <span class="text-h6 " >Precio </span>
                      </div>

                      <div class="col-12 q-mb-md">
                        <q-input
                          class=""
                          filled
                          v-model="nuevo.precio"
                          :prefix="'$'"
                          reverse-fill-mask
                          mask="#.##"
                          lazy-rules
                          @update:model-value="envioVar"
                          :rules="[ val => val && val.length > 0 || 'Por favor rellene el campo']"
                        />
                      </div>
                      <div class="col-12 flex justify-center q-mb-md" >
                        <div>
                          <q-btn icon="close"  label="Cancelar" v-close-popup type="reset" color="primary" flat class="q-mr-md" @click="limpiarFotos"  />
                          <q-btn v-if="!envioVar" icon="save" label="Guardar" type="submit" color="primary" />
                          <q-btn v-if="envioVar" icon="save" label="Guardar" type="submit, reset" color="primary" v-close-popup  />
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </q-form>
          <!-- Fin -->
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>



<script>
import { async } from "@firebase/util";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, uploadBytes, ref as ref2 } from "firebase/storage";
import { useQuasar } from 'quasar'
import { ref, computed } from 'vue'
import { db } from '../boot/firebase'

export default {
  setup () {
    const $q = useQuasar()
    const accept = ref(false)
    const fotosURL = ref([])
    const fotos = ref()
    const idArticulo = ref()
    const arrSistemas = ref()
    const contaImg = ref(0)
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const fecha = (`${year}-${month}-${day}`)
    const nuevo = ref({
      estado: 'nuevo', //ya
      marca: null, //ya
      modelo: null, //ya
      pantalla: null, //ya
      sistema: null, //ya
      rom: null, //ya
      ram: null, //ya
      titulo: null, //ya
      telefono: null, //ya
      vendedor: null, //ya
      precio: null,
      fecha: null, //ya
      descripcion: null, //ya
      fecha: fecha
    })
    function limpiarDatos () {
        nuevo.value.estado = 'nuevo'
        nuevo.value.marca = null
        nuevo.value.modelo = null
        nuevo.value.pantalla = null
        nuevo.value.sistema = null
        nuevo.value.rom = null
        nuevo.value.ram = null
        nuevo.value.titulo = null
        nuevo.value.vendedor = null
        nuevo.value.telefono = null
        nuevo.value.descripcion = null
        nuevo.value.precio = null
        arrSistemas.value = null
    }
    function limpiarFotos(){
      fotosURL.value = [],
      fotos.value = null
    }
    const subirArticulo = async function () {
      if (nuevo.value.marca && nuevo.value.modelo && nuevo.value.pantalla) {
        try {
          nuevo.value.sistema = arrSistemas.value.value
          const docRef = await addDoc(collection(db, "producto"), nuevo.value);
          idArticulo.value = docRef.id
          console.log("Document written with ID: ", docRef.id);
          subirImagen(idArticulo)
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      } else {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Necesitas agregar el Estado'
          })
      }
    }
    const subirImagen = function (idArticulo){
      console.log(" Estoy subiendo la imagen")
      const storage = getStorage()
      fotos.value.forEach( (foto) => {
        const storageRef = ref2(storage, idArticulo.value + '/' + foto.name )
        uploadBytes(storageRef, foto).then((snapshot) => {
          contaImg.value++
          eslaUltima()
        });
      });
    }
    function eslaUltima () {
      console.log("entre al final")
      if (contaImg.value === fotos.value.length) {
        $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Su articulo se guardo'
          })
        limpiarDatos()
        limpiarFotos()
      }
    }
    const envioVar = computed ( () => {
      if ( ( (fotos.value != ((null)) ) && nuevo.value.marca != ('' || null)) && (nuevo.value.modelo != ('' || null) ) && (nuevo.value.pantalla != ( '' || null)) && (arrSistemas.value != ('' || null)) && (nuevo.value.rom != ( '' || null)) && (nuevo.value.ram != ( '' || null)) && (nuevo.value.titulo != ( '' || null)) && (nuevo.value.vendedor != ( '' || null)) && (nuevo.value.telefono != ( '' || null))  && (nuevo.value.descripcion != ( '' || null)) && (nuevo.value.precio != ( '' || null)) ) {
          return true
        }
        return false
    })


    const obternerURL = computed ( () => {
      if (fotos.value) {
          fotos.value.forEach(element => {
              fotosURL.value.push(URL.createObjectURL(element))
          })
        }
        return fotos
    })

    return {
      nuevo,
      envioVar,
      limpiarDatos,
      arrSistemas,
      subirArticulo,
      limpiarFotos,
      fotos,
      fotosURL,
      text: ref(null),
      obternerURL,
      accept,
      dialog: ref(false),
      dense: ref(false),
      slide: ref(1),
      maximizedToggle: ref(true),
      options: [
        {
          label: 'IOS',
          value: 'ios'
        },
        {
          label: 'Android',
          value: 'android'
        },
        {
          label: 'Harmony Os',
          value: 'harmony'
        }
      ],
      onSubmit () {
        subirArticulo()
      },
      onReset () {
        limpiarDatos()
      }
    }
  }
};

</script>

<style>
  .cuadrado{
    border: 1px #8e79ba solid;
  }
</style>
