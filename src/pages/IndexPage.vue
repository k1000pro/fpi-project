<template>
  <q-page padding>
    <div class="main-container row">
      <OrdenarContainer></OrdenarContainer>
      <div class="col-2 gt-sm fixed">
        <FiltroContainer></FiltroContainer>
      </div>
      <CardsContainer></CardsContainer>
      <PaginationContainer></PaginationContainer>
    </div>
  </q-page>
</template>

<script>
import OrdenarContainer from "../components/OrdenarContainer.vue";
import CardsContainer from "../components/CardsContainer.vue";
import FiltroContainer from "../components/FiltroContainer.vue";
import PaginationContainer from "../components/PaginationContainer.vue";

export default {
  components: {
    CardsContainer,
    FiltroContainer,
    PaginationContainer,
    OrdenarContainer,
  },
};
</script>
