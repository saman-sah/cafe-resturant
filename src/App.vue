<template>
  <router-view />
</template>

<script setup>
  import { onBeforeMount } from 'vue';
  import { useFirebaseStore } from 'stores/firebase'
  const storeFirebase= useFirebaseStore();
  // const bar= ref(null)
  onBeforeMount(()=> {
    storeFirebase.handleAuthStateChange();    
  })
  // onMounted(() => {
  //   storeFirebase.setBar(bar.value);
  // })

</script>

