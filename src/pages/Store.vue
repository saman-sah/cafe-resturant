<template>
    <q-page class="q-pa-md store" v-if="storeFirebase.products">
        <q-banner inline-actions rounded class="text-white bg-red q-mb-md">
            <strong>Title</strong>
           <p> You have lost connection to the internet. This app is offline.</p>
            <template v-slot:action>
                <span v-if="storeFirebase.productsCount">{{ storeFirebase.productsCount }}</span>
            </template>
        </q-banner>
        <!-- Tabs -->
        <q-tabs        
        v-model="category"
        inline-label
        dense
        
        active-color="primary"
        class="bg-dark text-white shadow-2 q-pa-sm flex justify-around" 
        >
            <q-tab name="allProducts" icon="border_all" label="All Products" />
            <q-tab name="fastfood" icon="fastfood" label="FastFood" />
            <q-tab name="hot" icon="local_fire_department" label="Hot" />
            <q-tab name="cold" icon="icecream" label="Cold" />
        </q-tabs>





        <!-- Panles -->
        <q-tab-panels v-model="category" animated class="shadow-5">

            <!-- Fast Food Pnel -->
            <q-tab-panel name="allProducts">
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
                                <span class="text-h6 text-white">$10.00</span>
                            </q-item>
                            <div class="description row">
                                <div class="text-caption text-white ">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </div>
                            </div>                    
                        </q-card-section>
                    </q-card-section>
                </q-card>                  
            </q-tab-panel>

            <!-- Fast Food Pnel -->
            <q-tab-panel name="fastfood">
                <template v-for="(product, key, index) in storeFirebase.products" 
                :key="key">
                <q-card class="my-card q-mb-md bg-dark" 
                v-if="product.type== 'fastfood'">                
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
                                    <span class="text-h6 text-white">$10.00</span>
                                </q-item>
                                <div class="description row">
                                    <div class="text-caption text-white ">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </div>
                                </div>                    
                            </q-card-section>
                        </q-card-section>
                    </q-card>
                </template>                    
            </q-tab-panel>

            <!-- Hot Drinks Pnel -->
            <q-tab-panel name="hot">
                <template v-for="(product, key, index) in storeFirebase.products" 
                :key="key">
                    <q-card class="my-card q-mb-md bg-dark" 
                    v-if="product.type== 'hot'"
                    >                
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
                                    <span class="text-h6 text-white">$10.00</span>
                                </q-item>
                                <div class="description row">
                                    <div class="text-caption text-white ">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </div>
                                </div>                    
                            </q-card-section>
                        </q-card-section>
                    </q-card>
                </template>
            </q-tab-panel>

            <!-- Cold Drinks Pnel -->
            <q-tab-panel name="cold">
                <template 
                v-for="(product, key, index) in storeFirebase.products" 
                :key="key">
                    <q-card 
                    class="my-card q-mb-md bg-dark" 
                    v-if="product.type== 'cold'"
                    >                
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
                                    <span class="text-h6 text-white">$10.00</span>
                                </q-item>
                                <div class="description row">
                                    <div class="text-caption text-white ">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </div>
                                </div>                    
                            </q-card-section>
                        </q-card-section>
                    </q-card>
                </template>
            </q-tab-panel>
        </q-tab-panels>        
    </q-page>     
</template>

<script setup>
import { useFirebaseStore } from 'stores/firebase'
import { onBeforeMount, ref } from "vue";
const storeFirebase= useFirebaseStore();
const category=ref('allProducts')
onBeforeMount(() => {
    const storeId=ref(storeFirebase.route.params.id)
    storeFirebase.getStoreProducts(storeId.value)
})
</script>

<style>

</style>