<template>
   <q-ajax-bar
    ref="bar"
    position="top"
    color="primary"
    size="10px"
    skip-hijack
  />
  <router-view />
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { useFirebaseStore } from 'stores/firebase'
  const storeFirebase= useFirebaseStore();
  const bar= ref(null)
  onMounted(()=> {
    storeFirebase.handleAuthStateChange(); 
    storeFirebase.getStoresFirebase(); 
    storeFirebase.setBar(bar.value);
  })
</script>

