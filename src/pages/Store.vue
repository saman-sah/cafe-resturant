<template>
    <q-page class="q-pa-md store" v-if="storeFirebase.products">
        <q-banner inline-actions rounded class="text-dark bg-primary q-mb-md">
            <strong><span class="text-secondary">{{ storeFirebase.storeInfo.title }}</span>
                 has 
                <span v-if="storeFirebase.productsCount">{{ storeFirebase.productsCount }}</span> 
                products
            </strong>                    
            <template v-slot:action>
                <q-icon name="store" size="md" ></q-icon>
            </template>
        </q-banner>
        <!-- Tabs -->
        <q-tabs        
        v-model="category"
        inline-label
        dense        
        active-color="primary"
        class="bg-dark text-white shadow-2 q-pa-sm flex" 
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
                v-for="(product, key) in storeFirebase.products" 
                :key="key">                
                    <q-card-section horizontal>
                        <q-img
                        class="col-4"
                        :src="product.image"
                        />

                        <q-card-section class="q-pa-md title bg-dark col-8 column justify-between" style="min-height: 100%;" >
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
                            <q-item class="title-price row justify-between items-center q-pa-none">
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
            </q-tab-panel>

            <!-- Fast Food Pnel -->
            <q-tab-panel name="fastfood">
                <template v-for="(product, key) in storeFirebase.products" 
                :key=" key">
                
                    <q-card class="my-card q-mb-md bg-dark" 
                    v-if="product.category== 'fastfood'">                
                        <q-card-section horizontal>
                            <q-img
                            class="col-4"
                            :src="product.image"
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
                                        @click="showRecipeModal = true" />
                                    </div>
                                </q-item>
                            </q-card-section>
                        </q-card-section>
                    </q-card>
                </template>                    
            </q-tab-panel>

            <!-- Hot Drinks Pnel -->
            <q-tab-panel name="hot">
                <template v-for="(product, key) in storeFirebase.products" 
                :key="key">
                    <q-card class="my-card q-mb-md bg-dark" 
                    v-if="product.category== 'hot'"
                    >                
                        <q-card-section horizontal>
                            <q-img
                            class="col-4"
                            :src="product.image"
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
                                        @click="showRecipeModal = true" />
                                    </div>
                                </q-item>
                            </q-card-section>
                        </q-card-section>
                    </q-card>
                </template>
            </q-tab-panel>

            <!-- Cold Drinks Pnel -->
            <q-tab-panel name="cold">
                <template 
                v-for="(product, key) in storeFirebase.products" 
                :key="key">                
                    <q-card 
                    class="my-card q-mb-md bg-dark" 
                    v-if="product.category== 'cold'"
                    >                
                        <q-card-section horizontal>
                            <q-img
                            class="col-4"
                            :src="product.image"
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
                                        @click="recipes=product.recipes && (showRecipeModal = true)" />
                                    </div>
                                </q-item>
                            </q-card-section>
                        </q-card-section>
                    </q-card>
                </template>
            </q-tab-panel>
        </q-tab-panels>
        <!-- Recipe Modal -->
        <q-dialog v-model="showRecipeModal">
            <Recipe :recipes="recipes"/>
        </q-dialog>
    </q-page>     
</template>

<script setup>
    import Recipe from '../components/modals/Recipe.vue'
    import { useFirebaseStore } from 'stores/firebase'
    import { onBeforeMount, ref } from "vue";
    const storeFirebase= useFirebaseStore();
    const category=ref('allProducts')
    const showRecipeModal= ref(false)
    const recipes= ref([])
    onBeforeMount(() => {
        const storeId=ref(storeFirebase.route.params.id)
        storeFirebase.getStoreProducts(storeId.value)
    })
    function showRecipes(productRecipes) {
        // console.log('recipes');
        // console.log(productRecipes);
        this.recipes=productRecipes
        this.showRecipeModal = true
    }
</script>

<style scope lang="scss">
.q-tabs__content {
    justify-content: space-around;
}
</style>