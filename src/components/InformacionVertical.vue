<template>
  <div class="q-px-lg">
    <span class="text-h6 q-pt-md block ">{{ titulo }}</span>
    <span class="text-h4 q-py-md block ">${{ precio }}</span>
    <q-btn color="primary gt-sm" label="Comprar" />
    <legend
      class="row rounded-borders q-my-md justify-center q-mr-md q-py-md  shadow-2"
    >
      <span class="col-6 text-center text-subtitle2">
        <strong>Vendedor:</strong> {{ vendedor }}
      </span>
      <span class="col-6 text-center ">
        <strong>Teléfono:</strong> {{ telefono }}
      </span>
    </legend>
  </div>
</template>
<script>
import { ref} from "vue";
import { db, collection, getDocs} from "../boot/firebase";

export default {
  setup() {
    
    const currentPath = window.location.hash
    const id=currentPath.split("/").pop()
    return {
      vendedor: ref(""),
      telefono: ref(""),
      precio: ref(""),
      titulo:ref(""),

      async getProducto() {
        try {
          const productoCollection = collection(db, "producto");
          const productoSnapshot = await getDocs(productoCollection);
          productoSnapshot.forEach((res) => {
            if(res.id==id){
              this.vendedor=res.data().vendedor
              this.telefono=res.data().telefono
              this.precio=res.data().precio
              this.titulo=res.data().titulo

            }else{
            }

          });
        } catch (error) {
          console.log(error);
        }
      },
    };
  },
  created(){
    this.getProducto();
  }
};
</script>
<style>
legend {
  border: 1px #8e79ba solid;
  padding: 5px;
}
</style>
