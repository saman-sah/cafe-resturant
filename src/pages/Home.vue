<template>
  <q-page class="flex">
    <div class="row">
      <div class="col-6 item q-pa-md">
        <q-card class="my-card" flat bordered>
          <q-img src="https://source.unsplash.com/random/550x366/?fastfood" />

          <q-card-section class="q-py-sm">
            <q-btn
              fab
              color="primary"
              icon="place"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%);"
              @click="details= !details"
            />

            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">
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
            <div class="text-caption text-grey">
              Small plates, salads & sandwiches in an intimate setting.
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions class="row justify-between">
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
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-6 item q-pa-md">
        <q-card class="my-card" flat bordered>
          <q-img src="https://source.unsplash.com/random/550x366/?cafe" />

          <q-card-section class="q-py-sm">
            <q-btn
              fab
              color="primary"
              icon="place"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%);"
              @click="details= !details"
            />

            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">
                <q-item
                clickable
                tag="a"
                to="/store/cafe"
                >
                  Cafe
                </q-item>
              </div>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-caption text-grey">
              Small plates, salads & sandwiches in an intimate setting.
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions class="row justify-between">
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
          </q-card-actions>
        </q-card>
      </div>
      
    </div>
    
  </q-page>

  <q-dialog v-model="details">
    <detailsStore />    
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import detailsStore from '../components/modals/Details.vue'
const details= ref(false)
</script>
