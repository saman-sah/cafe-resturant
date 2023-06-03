<template>
    <q-page class="q-pa-md store">
        <q-banner inline-actions rounded class="text-white bg-red q-mb-md">
            <strong>Title</strong>
           <p> You have lost connection to the internet. This app is offline.</p>
            <template v-slot:action>
                <span>20item</span>
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
            <q-tab name="fastfood" icon="fastfood" label="FastFood" />
            <q-tab name="hot" icon="local_fire_department" label="Hot" />
            <q-tab name="cold" icon="icecream" label="Cold" />
        </q-tabs>





        <!-- Panles -->
        <q-tab-panels v-model="category" animated class="shadow-5">

            <!-- Fast Food Pnel -->
            <q-tab-panel name="fastfood">
                <q-card class="my-card q-mb-md bg-dark" v-for="n in 4" :key="n">
                    <q-card-section horizontal>
                        <q-img
                        class="col-4"
                        :src="'https://source.unsplash.com/random/160x120/?fast-food-'+n"
                        />

                        <q-card-section class="q-pa-md title bg-dark col-8" >
                            <q-item class="title-price row justify-between items-top q-pa-none"
                            clickable
                            flat
                            tag="a"
                            to="/store/resturant/title"
                            >
                                <span class="text-primary text-h6 ">
                                    Title
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

            <!-- Hot Drinks Pnel -->
            <q-tab-panel name="hot">
                <q-card class="my-card q-mb-md bg-dark" v-for="n in 4" :key="n">
                    <q-card-section horizontal>
                        <q-img
                        class="col-4"
                        :src="'https://source.unsplash.com/random/160x120/?fast-food-'+n"
                        />

                        <q-card-section class="q-pa-md title col-8" >
                            <q-item class="title-price row justify-between items-top q-pa-none"
                            clickable
                            flat
                            tag="a"
                            to="/store/resturant/title"
                            >
                                <span class="text-primary text-h6 ">
                                    Title
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

            <!-- Cold Drinks Pnel -->
            <q-tab-panel name="cold">
                <q-card class="my-card q-mb-md bg-dark" v-for="n in 4" :key="n">
                    <q-card-section horizontal>
                        <q-img
                        class="col-4"
                        :src="'https://source.unsplash.com/random/160x120/?fast-food-'+n"
                        />

                        <q-card-section class="q-pa-md title col-8" >
                            <q-item class="title-price row justify-between items-top q-pa-none"
                            clickable
                            flat
                            tag="a"
                            to="/store/resturant/title"
                            >
                                <span class="text-primary text-h6 ">
                                    Title
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
        </q-tab-panels>        
    </q-page>     
</template>

<script setup>
import { useFirebaseStore } from 'stores/firebase'
import { onBeforeMount, ref } from "vue";
const storeFirebase= useFirebaseStore();
const category=ref('fastfood')
onBeforeMount(() => {
    const storeId=ref(storeFirebase.route.params.id)
    console.log('storeId.value');
    console.log(storeId.value);
})
</script>

<style>

</style>