<template>
    <!-- Login Dropdown links -->
    <q-btn-dropdown
    v-if="storeFirebase.user"  
    class="glossy"
    color="primary"
    label="Account Settings"
    flat
    >
        <div class="row no-wrap q-pa-md bg-dark text-white">
            <div class="column">
                <div class="text-h6 q-mb-md">
                    Settings
                </div>
                <q-list>
                    <q-item clickable v-close-popup tag="a" to="/account/profile">
                        <q-item-section>
                        <q-item-label>Profile</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup  tag="a" to="/store">
                        <q-item-section>
                            <q-item-label>My Store</q-item-label>
                        </q-item-section>
                    </q-item>
                    
                </q-list>
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center">
                <q-avatar size="72px">
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                </q-avatar>
                <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>
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