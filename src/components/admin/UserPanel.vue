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
                    @click="storeFirebase.deleteUser(storeFirebase.userInfo)"
                    />
                </q-item>
            </q-list>
        </q-card-section>
    </q-card>

    
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
    const showModalEditUser= ref(false)
    function updateUserInfo(userInfo) {
        userEdited.value=userInfo
        showModalEditUser.value = true
    }
</script>

<style>

</style>