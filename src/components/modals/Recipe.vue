<template>
    <div class="q-pa-md bg-white column list-recipe-modal">
        <div class="row justify-between  title-product">
            <div class="title text-h6">
                Recipe Title
            </div>
            <q-btn icon="close" flat round dense v-close-popup />
        </div>
        
        <!-- List of product's recipe -->
        <q-list padding >
            <q-item v-for="(recipe, key) in props.recipes"
            :key="key"
            v-ripple 
            class="q-my-md q-pa-none bg-dark text-white rounded-borders"
            style="border: 1px solid #ccc">
                <q-item-section class="q-pl-md text-subtitle2">
                    {{ recipe }}
                </q-item-section>
            </q-item>
      </q-list>
    </div>
  </template>
<script setup>
    import { defineProps } from 'vue';

    // Props for getting recipes
    const props = defineProps({
        recipes: Object
    });    
</script>

<style>

</style>