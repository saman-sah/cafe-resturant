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
            <q-tab-panel name="userProfile" class="userProfile">
                <UserPanel />
            </q-tab-panel>

            <!-- Store Info -->
            <q-tab-panel name="storeProfile" class="storeProfile">
                <StorePanel />
            </q-tab-panel>

            <!-- My Store Products -->
            <q-tab-panel name="storeProducts" class="storeProducts">
                <ProductsPanel />
            </q-tab-panel>
        </q-tab-panels>
    </q-card> 
    
  </q-page>
</template>

<script setup>
    import UserPanel from '../components/admin/UserPanel.vue'
    import StorePanel from '../components/admin/StorePanel.vue'
    import ProductsPanel from '../components/admin/ProductsPanel.vue'
    import { useFirebaseStore } from 'stores/firebase'
    import { ref } from "vue";
    const storeFirebase= useFirebaseStore();
    const tab= ref('userProfile')

</script>

<style>

</style>