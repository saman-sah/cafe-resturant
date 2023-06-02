<template>
    <div class="q-pa-md q-my-lg">
        <q-btn @click="storeFirebase.addProduct()">Add product</q-btn>
        <div class="q-gutter-y-md" >
            <form @submit.prevent="registerValidationForm" 
            class="bg-dark q-pa-lg column rounded-borders">
                <q-input 
                outlined 
                v-model="formData.name" 
                label="Name"
                dark
                />
                <q-input 
                outlined 
                v-model="formData.email" 
                label="Email"  
                class="q-my-md"
                dark
                />
                <q-input 
                outlined 
                v-model="formData.store.title" 
                label="Store Title"  
                class="q-my-md"
                dark
                />
                <q-input 
                outlined 
                v-model="formData.store.description" 
                label="Store Description"  
                class="q-my-md"
                dark
                />
                <q-input 
                outlined 
                v-model="formData.store.location" 
                label="Store Location"  
                class="q-my-md"
                dark
                />
                <q-input 
                outlined 
                v-model="formData.store.address" 
                label="Store Address"  
                class="q-my-md"
                dark
                />
                <q-input 
                outlined 
                v-model="formData.store.image" 
                label="Store Image"  
                class="q-my-md"
                dark
                />
                <q-input 
                :type="isPwd ? 'password' : 'text'"
                outlined 
                v-model="formData.password" 
                label="Password"
                dark
                class="q-mb-md"
                >
                    <template v-slot:append>
                        <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwd = !isPwd"
                        />
                    </template>
                </q-input>
                <div class="row justify-end">
                    <q-btn color="primary" label="Register" type="submit"/>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { useFirebaseStore } from 'stores/firebase'
const storeFirebase= useFirebaseStore();
const formData= reactive({
    role: 'admin',
    name:'',
    email:'',    
    password:'',
    store: {
        title: '',
        description: '',
        image: '',
        location: '',
        address:'',
    },
})
function registerValidationForm() {
    storeFirebase.register(formData)
}
</script>

<style>

</style>