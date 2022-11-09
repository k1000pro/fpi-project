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
                    <q-radio v-model="estado" val="nuevo" label="Nuevo" />
                    <q-radio v-model="estado" val="usado" label="Usado" />
                  </div>
                  <!-- Inputs -->
                  <div class="col-12 col-sm-9">
                    <q-input  standout="bg-primary text-white" prefix="Marca:" v-model="marca" label="Marca del Telefono *"  :dense="dense" lazy-rules
                    filled :rules="[ val => val && val.length > 0 || 'Por favor rellene el campo']" />
                    <q-input standout="bg-primary text-white" prefix="Modelo:" v-model="modelo" label="Modelo del Telefono *"  :dense="dense" lazy-rules
                      filled :rules="[ val => val && val.length > 0 || 'Por favor rellene el campo']" />
                    <q-input
                          filled
                          standout="bg-primary text-white"
                          v-model="pantalla"
                          label="Pantalla"
                          prefix="Pantalla:"
                          suffix="Pulgadas"
                          mask="#.#"
                          input-class="text" :dense="dense" lazy-rules
                          :rules="[ val => val && val.length > 0 || 'Por favor rellene el campo']"
                        />
                      <q-select standout="bg-primary text-white" v-model="sistema" :options="options" prefix="Sistema:" label="Sistema Operativo"  :dense="dense" lazy-rules :rules="[ val => val || 'Por favor rellene el campo']" filled />
                      <q-input  standout="bg-primary text-white" v-model="rom" label="Almacenamiento interno"  :dense="dense" lazy-rules
                        filled :rules="[ val => val && val.length > 0 || 'Por favor rellene el campo']"  mask="###" prefix="ROM:" suffix="GB"/>
                        <q-input  standout="bg-primary text-white" v-model="ram" label="Memoria RAM"  :dense="dense" lazy-rules
                        filled :rules="[ val => val && val.length > 0 || 'Por favor rellene el campo']"  mask="##" prefix="RAM:" suffix="GB"/>
                  </div>
                </div>
              </div>
              <div class="col-12 col-sm-5 flex ">
                <div class="row justify-star q-mx-xl q-mb-md">
                  <span class="text-subtitle1 col-12">Titulo breve del anuncio</span>
                  <q-input class="col-12"  standout="bg-primary text-white"  v-model="titulo"   :dense="dense" lazy-rules
                    filled :rules="[ val => val && val.length > 0 || 'Por favor rellene el campo']" />
                    <q-input  standout="bg-primary text-white" prefix="Vendedor:" v-model="vendedor" label="Vendedor del telefono"  :dense="dense" lazy-rules
                    filled :rules="[ val => val && val.length > 0 || 'Por favor rellene el campo']" />
                    <q-input
                      filled
                      v-model="phone"
                      label="Numero telefonico"
                      mask=" #### - ####"
                      standout="bg-primary text-white"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || 'Por favor rellene el campo']"
                    />
                    <span class="text-subtitle1 col-12">Descripcion</span>
                    <q-input
                        v-model="descrippcion"
                        filled
                        class="col-12"
                        clearable
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Por favor rellene el campo']"
                        color="primary"
                        label="Descripcion del Producto"
                        autogrow
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
                      @update:model-value="obternerURL"
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
                          v-model="price"
                          :prefix="'$'"
                          mask="####.##"
                          lazy-rules
                          :rules="[ val => val && val.length > 0 || 'Por favor rellene el campo']"
                        />
                      </div>

                      <div class="col-12 flex justify-center q-mb-md" >
                        <div>
                          <q-btn icon="close"  label="Cancelar" v-close-popup type="reset" color="primary" flat class="q-mr-md" @click="limpiarFotos" />
                          <q-btn icon="save" label="Guardas" type="submit" color="primary" />
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
import { useQuasar } from 'quasar'
import { ref, computed } from 'vue'

export default {
  setup () {

    const descrippcion = ref(null)
    const $q = useQuasar()
    const estado = ref('nuevo')
    const marca = ref(null)
    const pantalla = ref(null)
    const accept = ref(false)
    const modelo = ref(null)
    const sistema = ref(null)
    const rom = ref(null)
    const ram = ref(null)
    const titulo = ref(null)
    const phone = ref(null)
    const vendedor = ref(null)
    const fotosURL = ref([])
    const fotos = ref()


    const obternerURL = computed ( () => {
      if (fotos.value) {
          fotos.value.forEach(element => {
              fotosURL.value.push(URL.createObjectURL(element))
          })
        }
        return fotos
    })



    return {
      fotos,
      fotosURL,
      price: ref(null),
      text: ref(null),
      modelo,
      obternerURL,
      descrippcion,
      titulo,
      rom,
      ram,
      estado,
      marca,
      pantalla,
      accept,
      dialog: ref(false),
      sistema,
      dense: ref(false),
      vendedor,
      slide: ref(1),
      phone,
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

        if (estado.value == false) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Necesitas agregar el Estado'
          })
        }
        else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
        }
      },

      onReset () {
        estado.value = 'nuevo'
        marca.value = null
        modelo.value = null
        pantalla.value = null
        sistema.value = null
        rom.value = null
        ram.value = null
        titulo.value = null
        vendedor.value = null
        phone.value = null
        descrippcion.value = null
      },
      limpiarFotos() {
        fotosURL.value = [],
        fotos.value = null
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
