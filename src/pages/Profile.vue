<template>
  <q-page class="profile q-pa-md ">
    
    <q-card class="my-card bg-dark text-white" flat bordered>
        <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" >
            <div class="absolute-top text-subtitle1 text-center">
                Resturan/Cafe
            </div>
        </q-img>

        <q-card-section>
            <q-list dense bordered padding class="rounded-borders">
                <q-item v-ripple >
                    <q-item-section class="q-pa-md text-h6">
                        Resturan Name
                    </q-item-section>
                </q-item>

                <q-separator inset dark />

                <q-item v-ripple >
                    <q-item-section avatar>
                        <q-icon color="primary" name="location_on" />
                    </q-item-section>
                    <q-item-section class="q-py-md">
                        Location Number
                    </q-item-section>
                </q-item>

                <q-item v-ripple>
                    <q-item-section avatar>
                        <q-icon color="primary" name="description" />
                    </q-item-section>
                    <q-item-section class="q-py-md">
                        Description Test
                    </q-item-section>
                </q-item>
            </q-list>
        </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
</script>

<style>

</style>