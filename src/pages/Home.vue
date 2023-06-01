<template>
  <q-page class="flex home">
    <div class="row">
      
      <div v-for="n in 6"
      :key="n"
      class="col-6 item q-pa-md">
        <q-card class="my-card bg-dark card-item-store" flat bordered >
          <q-img src="https://source.unsplash.com/random/550x366/?fastfood" />

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
                to="/store/resturant">
                  Resturant
                </q-item>
              </div>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-caption text-white">
              Small plates, salads & sandwiches in an intimate setting.
            </div>
          </q-card-section>

          <!-- <q-separator /> -->

          <!-- <q-card-actions class="row justify-between">
            <q-btn-dropdown color="primary" label="" flat icon="menu" menu-self="bottom end">
              <q-list>

                <q-item clickable v-close-popup @click="onItemClick">
                  <q-item-section>
                    <q-item-label>Videos</q-item-label>
                  </q-item-section>
                </q-item>

              </q-list>
            </q-btn-dropdown>
            <span>rate: 4.5</span>
          </q-card-actions> -->
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
const location= ref(false)
</script>
