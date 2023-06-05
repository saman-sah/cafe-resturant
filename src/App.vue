<template>
  <router-view />
</template>

<script setup>
  import { onMounted } from 'vue';
  import { useFirebaseStore } from 'stores/firebase'
  const storeFirebase= useFirebaseStore();
  // const bar= ref(null)
  onMounted(()=> {
    storeFirebase.handleAuthStateChange(); 
    storeFirebase.getStoresFirebase(); 
  })
</script>

