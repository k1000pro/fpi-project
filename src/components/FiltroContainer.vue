<template>
  <q-toggle v-model="value" color="primary" keep-color label="Nuevo" />

  <div class="column">
    <h6 class="text-dark q-mt-sm q-mb-none">Marca</h6>
    <div class="q-pa-md rounded-borders text-caption options-container">
      <q-option-group
        v-model="marca"
        :options="marcaOptions"
        color="primary"
        right-label
        size="xs"
      />
      
    </div>
    <h6 class="text-dark q-mt-md q-mb-none">Sistema</h6>
    <div class="q-pa-md rounded-borders text-caption options-container">
      <q-option-group
        v-model="sistema"
        :options="sistemaOptions"
        color="primary"
        right-label
        size="xs"
      />
    </div>
    <h6 class="text-dark q-mt-md q-mb-none">Pantalla</h6>
    <div class="q-pa-md rounded-borders text-caption options-container">
      <q-option-group
        v-model="pantalla"
        :options="pantallaOptions"
        color="primary"
        right-label
        size="xs"
      />
    </div>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      value: ref(true),
      marca: ref(""),
      marcaOptions: [
        {
          label: "Samsung",
          value: "samsung",
        },
        {
          label: "Huawei",
          value: "huawei",
        },
        {
          label: "Nokia",
          value: "nokia",
        },
        {
          label: "iPhone",
          value: "iphone",
        },
        {
          label: "Xiaomi",
          value: "xiaomi",
        },
      ],
      sistema: ref(),
      sistemaOptions: [
        {
          label: "Android",
          value: "android",
        },
        {
          label: "IOS",
          value: "ios",
        },
        {
          label: "Windows",
          value: "windows",
        },
      ],
      pantalla: ref(),
      pantallaOptions: [
        {
          label: "6.0''",
          value: "6.0",
        },
        {
          label: "5.5''",
          value: "5.5",
        },
        {
          label: "5.0''",
          value: "5.0",
        },
      ],
    };
  },
};
</script>
<style lang="sass">
li
    list-style: None
.q-list
    border-color: #8e79ba
.options-container
  border: solid #8e79ba 1px
</style>
