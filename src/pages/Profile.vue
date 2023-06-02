<template>
  <q-page class="profile q-pa-md ">
    <q-card>
        <q-tabs
        v-model="tab"
        dense
        class="text-white bg-dark"        
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
        >
            <q-tab name="userProfile" label="User Profile" />
            <q-tab name="storeProfile" label="Store Profile" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="userProfile">
                <q-card class="my-card bg-dark text-white" flat bordered>

                    <q-card-section>
                        <q-list dense bordered padding class="rounded-borders">
                            <q-item v-ripple >
                                <q-item-section avatar>
                                    <q-icon color="primary" name="account_circle" />
                                </q-item-section>
                                <q-item-section class="q-py-md text-h6">
                                    Saman Sahraei
                                </q-item-section>
                            </q-item>

                            <q-separator inset dark />

                            <q-item v-ripple >
                                <q-item-section avatar>
                                    <q-icon color="primary" name="location_on" />
                                </q-item-section>
                                <q-item-section class="q-py-md">
                                    Email
                                </q-item-section>
                            </q-item>

                            <q-item v-ripple>
                                <q-item-section avatar>
                                    <q-icon color="primary" name="description" />
                                </q-item-section>
                                <q-item-section class="q-py-md">
                                    Password
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-card-section>
                </q-card>
            </q-tab-panel>

            <q-tab-panel name="storeProfile">
                <q-card class="my-card bg-dark text-white" flat bordered>
                    <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" >
                        <div class="absolute-top text-subtitle1 text-center">
                            Resturan/Cafe
                        </div>
                    </q-img>

                    <q-card-section>
                        <q-list dense bordered padding class="rounded-borders">
                            <q-item v-ripple >
                                <q-item-section avatar>
                                    <q-icon color="primary" name="storefront" />
                                </q-item-section>
                                <q-item-section class="q-py-md text-h6">
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
                    <q-item c
                    lickable 
                    tag="a" 
                    to="/account/add-product" 
                    v-ripple
                    class="bg-primary rounded-borders q-my-md text-center text-subtitle2"
                    >
                        <q-item-section>
                            Add Product 
                        </q-item-section>
                    </q-item>
            </q-tab-panel>
        </q-tab-panels>
    </q-card>   
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const tab=ref('userProfile')
</script>

<style>

</style>