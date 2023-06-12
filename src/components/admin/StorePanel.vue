<template>
    <q-card 
    v-if="storeFirebase.storeInfo"
    class="my-card bg-dark text-white" 
    flat 
    bordered
    >
        <q-img :src="storeFirebase.storeInfo.image" >
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

                <q-separator inset dark />

                <q-item v-ripple class="q-mt-md">
                    <q-btn 
                    padding="xs"
                    color="primary" 
                    icon="edit" 
                    label="Edit Store"
                    class="col q-mr-sm"
                    @click="updateStore(storeFirebase.storeInfo)"
                    />
                    <q-btn
                    padding="xs"
                    color="secondary"
                    icon="delete"
                    class="col q-ml-sm"
                    label="Delete Store"
                    @click="confirmDelete = true"
                    />
                </q-item>
                
            </q-list>
        </q-card-section>                    
    </q-card>

    <q-dialog v-model="confirmDelete" medium>
      <q-card style="min-height: 200px; width: 700px; max-width: 80vw;" class="column justify-around">
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="secondary" text-color="white" size="38px"/>
          <span class="q-ml-sm text-h6">You are sure?</span>
        </q-card-section>
        <q-card-section>
            <q-avatar icon="error" color="primary" text-color="white" size="38px"/>
          <span class="q-ml-sm text-caption2">This delete your account, your store and your products store</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn  label="Cancel" color="primary" v-close-popup />
          <q-btn label="Confirm" color="secondary" v-close-popup 
          @click="storeFirebase.deleteUser(storeFirebase.userInfo)"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Update Store Modal -->
    <q-dialog v-model="showModalEditStore" full-width>
        <UpdateStore 
        :store="storeEdited"
        @closePopup="showModalEditStore= false"
        />
    </q-dialog>
</template>

<script setup>
    import UpdateStore from '../modals/UpdateStore.vue'
    import { useFirebaseStore } from 'stores/firebase'
    import { ref } from 'vue';
    const storeFirebase= useFirebaseStore();
    const storeEdited= ref(null)
    const confirmDelete= ref(false)
    const showModalEditStore= ref(false)
    function updateStore(store) {
        storeEdited.value=store
        showModalEditStore.value = true
    }
</script>

<style>

</style>