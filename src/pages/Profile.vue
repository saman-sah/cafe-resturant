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
            <q-tab name="userProfile" label="User" />
            <q-tab v-if="storeFirebase.storeInfo" name="storeProfile" label="Store" />
            <q-tab v-if="storeFirebase.storeInfo" name="storeProducts" label="Products" @click.once="storeFirebase.getStoreProducts(storeFirebase.storeInfo.storeId)"/>
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>

            <!-- User Info -->
            <q-tab-panel name="userProfile">
                <q-card 
                v-if="storeFirebase.userInfo"
                class="my-card bg-dark text-white" 
                flat 
                bordered
                >
                    <q-card-section>
                        <q-list dense bordered padding class="rounded-borders">
                            <q-item v-ripple >
                                <q-item-section avatar>
                                    <q-icon color="primary" name="account_circle" />
                                </q-item-section>
                                <q-item-section class="q-py-md text-h6">
                                    {{ storeFirebase.userInfo.name }}
                                </q-item-section>
                            </q-item>

                            <q-separator inset dark />

                            <q-item v-ripple >
                                <q-item-section avatar>
                                    <q-icon color="primary" name="mail" />
                                </q-item-section>
                                <q-item-section class="q-py-md">
                                    Email: {{ storeFirebase.userInfo.email }}
                                </q-item-section>
                            </q-item>

                            <q-item v-ripple>
                                <q-item-section avatar>
                                    <q-icon color="primary" name="description" />
                                </q-item-section>
                                <q-item-section class="q-py-md">
                                    Role: {{ storeFirebase.userInfo.role }}
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-card-section>
                </q-card>
            </q-tab-panel>

            <!-- Store Info -->
            <q-tab-panel name="storeProfile">
                <q-card 
                v-if="storeFirebase.storeInfo"
                class="my-card bg-dark text-white" 
                flat 
                bordered
                >
                    <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" >
                        <div class="absolute-top text-subtitle1 text-center">
                            Resturan/Cafe
                        </div>
                    </q-img>

                    <q-card-section>
                        <q-list dense bordered padding class="rounded-borders">

                            <!-- Store Title -->
                            <q-item v-ripple >
                                <q-item-section avatar>
                                    <q-icon color="primary" name="storefront" />
                                </q-item-section>
                                <q-item-section class="q-py-md text-h6">
                                    {{ storeFirebase.storeInfo.title }}
                                </q-item-section>
                            </q-item>

                            <q-separator inset dark />

                            <!-- Store Description -->
                            <q-item v-ripple >
                                <q-item-section avatar>
                                    <q-icon color="primary" name="description" />
                                </q-item-section>
                                <q-item-section class="q-py-md">
                                    {{ storeFirebase.storeInfo.description }}
                                </q-item-section>
                            </q-item>

                            <!-- Store Location -->
                            <q-item v-ripple >
                                <q-item-section avatar>
                                    <q-icon color="primary" name="location_on" />
                                </q-item-section>
                                <q-item-section class="q-py-md">
                                    {{ storeFirebase.storeInfo.address }}
                                </q-item-section>
                            </q-item>
                           
                        </q-list>
                    </q-card-section>                    
                </q-card>
            </q-tab-panel>

            <!-- My Store Products -->
            <q-tab-panel name="storeProducts">
                <q-card class="my-card q-mb-md bg-dark" 
                v-for="(product, key, index) in storeFirebase.products" 
                :key="key">                
                    <q-card-section horizontal>
                        <q-img
                        class="col-4"
                        :src="'https://source.unsplash.com/random/160x120/?fast-food-'+index"
                        />

                        <q-card-section class="q-pa-md title bg-dark col-8" >
                            <q-item class="title-price row justify-between items-top q-pa-none"
                            clickable
                            flat
                            tag="a"
                            to="/store/resturant/title"
                            >
                                <span class="text-primary text-h6 ">
                                    {{ product.title }}
                                </span>
                                <span class="text-h6 text-white">${{ product.price }}</span>
                            </q-item>
                            <q-item class="title-price row justify-between items-top q-pa-none">
                                <div class="description row">
                                    <div class="text-caption text-white ">
                                        {{ product.description }}
                                    </div>
                                </div>
                                <div class="btn-recipe">
                                    <q-btn 
                                    color="secondary" 
                                    glossy 
                                    label="Recipe"
                                    @click="showRecipes(product.recipes)"/>
                                </div>
                            </q-item>
                        </q-card-section>
                    </q-card-section>
                </q-card>
                    <q-item 
                    @click="addProductModal= true"
                    clickable 
                    tag="a"
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
    <q-dialog v-model="addProductModal" full-width>
      <AddProduct @closePopup="addProductModal= false"/>
    </q-dialog>  
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import AddProduct from '../components/admin/AddProduct.vue'
import { useFirebaseStore } from 'stores/firebase'
const storeFirebase= useFirebaseStore();
const tab=ref('userProfile')
const addProductModal= ref(false)
</script>

<style>

</style>