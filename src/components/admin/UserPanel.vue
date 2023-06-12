<template>    
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
                <q-item v-ripple class="q-mt-md">
                    <q-btn 
                    padding="xs"
                    color="primary" 
                    icon="edit" 
                    label="Edit User"
                    class="col q-mr-sm"
                    @click="updateUserInfo(storeFirebase.userInfo)"
                    />
                    <q-btn
                    padding="xs"
                    color="secondary"
                    icon="delete"
                    class="col q-ml-sm"
                    label="Delete User"
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
        <q-card-section v-if="storeFirebase.userInfo && storeFirebase.userInfo.role== 'admin'">
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


    <!-- Update User Modal -->
    <q-dialog v-model="showModalEditUser" full-width>
        <UpdateUser
        :userInfo="userEdited"
        @closePopup="showModalEditUser= false"
        />
    </q-dialog>
</template>

<script setup>
    import UpdateUser from '../modals/UpdateUser.vue'
    import { useFirebaseStore } from 'stores/firebase'
    import { ref } from 'vue';
    const storeFirebase= useFirebaseStore();
    const userEdited= ref(null)
    const confirmDelete= ref(false)
    const showModalEditUser= ref(false)
    function updateUserInfo(userInfo) {
        userEdited.value=userInfo
        showModalEditUser.value = true
    }
</script>

<style>

</style>