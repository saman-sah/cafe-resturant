<template>
    <div class="q-pa-md bg-white column" style="width: 700px; max-width: 96vw; height: 60vh; max-height: 80vh;">
        <div class="row justify-between  title-product">
            <div class="title text-h6">
                Recipe Title
            </div>
            <q-btn icon="close" flat round dense v-close-popup />
        </div>
        <q-list padding >
            <q-item v-for="(recipe, key) in props.recipes"
            :key="key"
            v-ripple 
            class="q-my-md q-pa-none bg-dark text-white rounded-borders"
            style="border: 1px solid #ccc">
                <q-item-section class="q-pl-md text-subtitle2">
                    {{ recipe }}
                </q-item-section>
                <!-- <q-item-section style="border-radius: 0 0 0 50px;"
                class="bg-white text-dark" avatar>
                    <strong class="q-pr-md q-pl-lg">20</strong>
                </q-item-section> -->
            </q-item>
      </q-list>
    </div>
  </template>
<script setup>
    import { defineProps } from 'vue';
    const props = defineProps({
        recipes: Object
    });
    
  // Access the props
  console.log('props.recipes');
  console.log(props.recipes);
</script>

<style>

</style>