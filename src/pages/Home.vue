<template>
  <q-page class="home">

    <div class="row justify-between" v-if="storeFirebase.stores">

      <!-- List of Stores -->
      <div v-for="(store, key) in storeFirebase.stores"
      :key="key"      
      class="item q-pa-sm q-mb-sm col-xs-6 col-sm-4 col-md-4 col-lg-3" >
        <q-card class="my-card bg-dark card-item-store" flat bordered >

          <!-- Store Image -->
          <q-img :src="store.image" />

          <q-card-section class="q-py-sm">

            <!-- Store Location -->
            <q-btn
              round
              color="secondary"
              icon="place"
              class="absolute"
              size="sm"
              style="top: -15px; right: 3px; transform: translateY(-50%);"
              @click="location= !location"
            />

            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis text-primary store-title ">
                
                <!-- Store title - Link to store -->
                <q-item
                clickable
                min-height="30px"
                tag="a"
                :to="'/store/'+ store.slug + '/' + key"
                class="q-pa-none"
                >
                  {{ store.title }}
                </q-item>
              </div>
            </div>
          </q-card-section>

          <!-- Store Description -->
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
<style scope lang="scss">
  .store-title {
      .q-item {
        min-height: 30px;
      }
  }
</style>