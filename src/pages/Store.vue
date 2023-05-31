<template>
    <q-page class="q-pa-md">
        <!-- Tabs -->
        <q-tabs
        v-model="tab"
        inline-label
        class="bg-primary text-white shadow-2"
        >
            <q-tab name="fastfood" icon="mail" label="FastFood" />
            <q-tab name="hot" icon="alarm" label="Hot" />
            <q-tab name="cold" icon="movie" label="Cold" />
        </q-tabs>





        <!-- Panles -->
        <q-tab-panels v-model="tab" animated>

            <!-- Fast Food Pnel -->
            <q-tab-panel name="fastfood">
                <div class="text-h6">fastfood</div>
                <q-card class="my-card">
                    <q-card-section horizontal>
                        <q-img
                        class="col-4"
                        src="https://cdn.quasar.dev/img/parallax1.jpg"
                        />

                        <q-card-section class="q-px-md q-py-xs  title" >
                            <div class="type row">
                                <div class="text-overline">Overline</div>
                            </div>
                            <div class="title-price row justify-between">
                                <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
                                <div class="text-h5 q-mt-sm q-mb-xs">$10.00</div>
                            </div>
                            <div class="description row">
                                <div class="text-caption text-grey">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </div>
                            </div>                    
                        </q-card-section>
                    </q-card-section>
                </q-card>
            </q-tab-panel>

            <!-- Hot Drinks Pnel -->
            <q-tab-panel name="hot">
                <div class="text-h6">hot</div>
                <q-card class="my-card">
                    <q-card-section horizontal>
                        <q-img
                        class="col-4"
                        src="https://cdn.quasar.dev/img/parallax1.jpg"
                        />

                        <q-card-section class="q-pa-md title" >
                            <div class="type row">
                                <div class="text-overline">Overline</div>
                            </div>
                            <div class="title-price row justify-between">
                                <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
                                <div class="text-h5 q-mt-sm q-mb-xs">$10.00</div>
                            </div>
                            <div class="description row">
                                <div class="text-caption text-grey">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </div>
                            </div>                    
                        </q-card-section>
                    </q-card-section>
                </q-card>
            </q-tab-panel>

            <!-- Cold Drinks Pnel -->
            <q-tab-panel name="cold">
                <div class="text-h6">cold</div>
                <q-card class="my-card">
                    <q-card-section horizontal>
                        <q-img
                        class="col-4"
                        src="https://cdn.quasar.dev/img/parallax1.jpg"
                        />

                        <q-card-section class="q-pa-md title" >
                            <div class="type row">
                                <div class="text-overline">Overline</div>
                            </div>
                            <div class="title-price row justify-between">
                                <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
                                <div class="text-h5 q-mt-sm q-mb-xs">$10.00</div>
                            </div>
                            <div class="description row">
                                <div class="text-caption text-grey">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </div>
                            </div>                    
                        </q-card-section>
                    </q-card-section>
                </q-card>
            </q-tab-panel>
        </q-tab-panels>        
    </q-page>     
</template>

<script setup>
import { ref } from "vue";
const tab=ref('fastfood')
const lorem= ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.')
</script>

<style>

</style>