<template>
  <div class="row">
    <div class="col-12 text-center">
      <span class="text-h4 text-primary">Descripcion</span>
    </div>
  </div>
  <div class="row justify-center q-my-sm">
    <div class="col-12 col-md-5">
      <q-card class="my-card q-ma-sm tamanio">
        <q-card-section >
          <ul >
              <li class="row " v-for="(value, propiedad) in arrayDetalleTeleFono" :key="value" >
                <span class="col-1 q-mr-lg">{{propiedad}}</span><span class="col-5">: {{ value }}</span>
              </li>
          </ul>
      </q-card-section>
      </q-card>
    </div>

    <div class="col-12 col-md-5 ">
      <q-card class="my-card q-ma-sm q-pa-md tamanio">
        <q-card-section class="q-ml-md">
          {{descripcion}}
        </q-card-section>
      </q-card>
    </div>
  </div>
    <div class="row    posicionamiento justify-center">
      <q-btn color="primary lt-md q-px-lg q-mr-sm " to="/" label=" Inicio " />
      <q-btn color="primary lt-md" label="Comprar" />
    </div>

</template>

<script>
export default {
  setup () {
    return {
      vendedor: 'Juan Perez',
      telefono: '77243727',
      precio: '$235.00',
      descripcion: 'Telefono en muy buenas condiciones, tiene dos cámaras, la caja esta abierta, pero con muy poco uso, practicamente nuevo, la compañia con la que estaba es Tigo, asi que el  chip debe ser tigo, viene con su caja original y con todos sus accesorios. Puedo mandar más fotos si desea por whatsapp',
      titulo: 'Iphone 6 pantalla de 8 pulgadas, 64Gb internos, 2Gb de Ram, Sólo Banda Tigo, Nuevo',
      arrayDetalleTeleFono:
          {
            Estado: 'Nuevo',
            Marca: 'Iphone',
            Modelo: '6 Plus',
            Pantalla: '7 Pulgadas',
            Sistema: 'IOS',
            ROM: '64 GB',
            RAM: '2 GB',
          },
  }
}

}
</script>

<style>
.tamanio{
min-width: 80%;
min-height: 95%;
}
.posicionamiento{
position: sticky;
bottom: 5px;
}
</style>
