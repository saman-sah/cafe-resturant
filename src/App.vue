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

    // Check user Logged in - initial functions
    storeFirebase.handleAuthStateChange(); 

    // Getting Stores
    storeFirebase.getStoresFirebase(); 

    // Set ref for ajax topbar loading
    storeFirebase.setBar(bar.value);
  })
</script>

