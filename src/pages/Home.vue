<template>
  <q-page class="home">
    
    <div class="row" v-if="storeFirebase.stores">
      <div v-for="(store, key) in storeFirebase.stores"
      :key="key"      
      class="col-6 item q-pa-sm q-mb-sm">
        <q-card class="my-card bg-dark card-item-store" flat bordered >
          <q-img :src="store.image" />

          <q-card-section class="q-py-sm">
            <q-btn
              round
              color="secondary"
              icon="place"
              class="absolute"
              size="md"
              style="top: 0; right: 12px; transform: translateY(-50%);"
              @click="location= !location"
            />

            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis text-primary">
                <q-item
                clickable
                tag="a"
                :to="'/store/'+ store.slug + '/' + key">
                  {{ store.title }}
                </q-item>
              </div>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-caption text-white">
              {{ store.description }}
            </div>
          </q-card-section>       
        </q-card>
      </div>
      
    </div>
    
  </q-page>

  <q-dialog v-model="location">
    <locationStore />    
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import locationStore from '../components/modals/Location.vue'
import { useFirebaseStore } from 'stores/firebase'
const storeFirebase= useFirebaseStore();
const location= ref(false)
</script>
