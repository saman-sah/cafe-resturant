<template>
    <!-- Login Dropdown links -->
    <q-btn-dropdown
    v-if="storeFirebase.user"  
    class="glossy"
    color="primary"
    label="Account"
    flat
    >
        <div class="row no-wrap q-pa-sm bg-dark text-white">
            <div class="column">
                <div class="text-subtitle2 text-center q-mb-md">
                    {{ storeFirebase.userInfo.name }}
                </div>
                <q-separator inset dark />
                <q-list>
                    <!-- My Profile link -->
                    <q-item 
                    clickable 
                    v-close-popup 
                    tag="a" 
                    to="/account/profile"
                    class="q-py-none"
                    >
                        <q-item-section>
                            <q-item-label>Profile</q-item-label>
                        </q-item-section>
                    </q-item>

                    <!-- My Store link -->
                    <q-item v-if="storeFirebase.userInfo && storeFirebase.userInfo.role=='admin'" 
                    clickable 
                    v-close-popup  
                    tag="a" 
                    :to="'/store/'+ storeFirebase.storeInfo.slug + '/' + storeFirebase.storeInfo.storeId"
                    class="q-py-none"
                    >
                        <q-item-section>
                            <q-item-label>My Store</q-item-label>
                        </q-item-section>
                    </q-item>
                    
                </q-list>
            </div>

            <q-separator vertical inset class="q-mx-sm" />

            <div class="column items-center justify-around">
                <!-- User avatar -->
                <q-avatar size="72px">
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                </q-avatar>

                <!-- Logout button -->
                <q-btn
                @click="storeFirebase.logOut()"
                color="primary"
                label="Logout"
                push
                size="sm"
                v-close-popup
                />
            </div>
        </div>
    </q-btn-dropdown>

    <!-- User Loged out  -->
    <q-btn
    v-else 
    @click="loginToggle= !loginToggle"
    flat
    >
        Login
    </q-btn>
    
    <!-- Login Modal Component -->
    <q-dialog v-model="loginToggle">
        <Login />
    </q-dialog>
</template>

<script setup>
    import { ref } from 'vue';
    import Login from '../modals/Login.vue'
    import { useFirebaseStore } from 'stores/firebase'
    const storeFirebase= useFirebaseStore();
    const loginToggle= ref(false)
</script>

<style>

</style>