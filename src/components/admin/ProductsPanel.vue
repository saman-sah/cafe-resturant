<template>
    <q-item 
    @click="addProductModal= true"
    clickable 
    tag="a"
    v-ripple
    class="bg-primary rounded-borders q-my-md text-center text-h6"
    >
        <q-item-section>
            Add New Product 
        </q-item-section>
    </q-item>
    <template v-if="storeFirebase.products">
        <q-card class="my-card q-mb-md bg-dark" 
        v-for="(product, key, index) in storeFirebase.products" 
        :key="key+index">                
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
                            padding="xs"
                            color="primary" 
                            icon="edit" 
                            @click="updateProduct(product, key)"
                            />
                            <q-btn
                            padding="xs"
                            color="secondary"
                            icon="delete"
                            class="q-ml-md"
                            @click="storeFirebase.deleteProduct(key, product.title)"
                            />
                        </div>
                    </q-item>
                </q-card-section>
            </q-card-section>
        </q-card>
    </template>



    <!-- Add Product Modal -->
    <q-dialog v-model="addProductModal" full-width>
      <AddProduct @closePopup="addProductModal= false"/>
    </q-dialog>             
    
    <!-- Update Product Modal -->
    <q-dialog v-model="updateProductModal" full-width>
        <UpdateProduct         
        :product="productEdited" 
        :productId="productId"
        @closePopup="updateProductModal= false"
        />
    </q-dialog> 
                                
</template>

<script setup>
    import AddProduct from './AddProduct.vue'
    import UpdateProduct from './UpdateProduct.vue'
    import { useFirebaseStore } from 'stores/firebase'
    import { ref } from 'vue'
    const storeFirebase= useFirebaseStore();
    const productEdited= ref(null)    
    const productId= ref(null)    
    const addProductModal= ref(false)
    const updateProductModal= ref(false)
    
    function updateProduct(product, updateProductId) {
        productEdited.value=product
        productId.value=updateProductId
        updateProductModal.value= true
    }
</script>

<style>

</style>