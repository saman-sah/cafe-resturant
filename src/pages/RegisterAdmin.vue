<template>
    <div class="q-pa-md q-my-lg">
        <div class="q-gutter-y-md" >
            <form 
            @submit.prevent="registerValidationForm" 
            class="bg-dark q-pa-lg column rounded-borders"
            >

                <!-- Name input field -->
                <q-input 
                outlined 
                v-model="formData.name" 
                label="Name"
                dark
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type your name']"
                />

                <!-- Email input field -->
                <q-input 
                outlined 
                v-model="formData.email" 
                label="Email"  
                class="q-my-md"
                dark
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type your email']"
                />

                <!-- Store Title input field -->
                <q-input 
                outlined 
                v-model="formData.store.title" 
                label="Store Title"  
                class="q-my-md"
                dark
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type your store title']"
                />

                <!-- Store Description input field -->
                <q-input 
                outlined 
                v-model="formData.store.description" 
                label="Store Description"  
                class="q-my-md"
                dark
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type your store description']"
                />

                <!-- Store Location input field -->
                <q-input 
                outlined 
                v-model="formData.store.location" 
                label="Store Location"  
                class="q-my-md"
                dark
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type your store location']"
                />

                <!-- Store Address input field -->
                <q-input 
                outlined 
                v-model="formData.store.address" 
                label="Store Address"  
                class="q-my-md"
                dark
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type your store address']"
                />

                <!-- Store Image file input field -->
                <q-file
                outlined 
                v-model="formData.store.image" 
                label="Store Image"  
                class="q-my-md"
                dark
                :rules="[
                    val => val.name != null || 'Please attach your image',
                    val => val.size < 250000 || 'Please select image less than 250KB',
                ]"
                >
                <template v-slot:prepend>
                    <q-icon name="attach_file" />
                </template>
                </q-file>

                <!-- Password input field -->
                <q-input 
                :type="isPwd ? 'password' : 'text'"
                outlined 
                v-model="formData.password" 
                label="Password"
                dark
                class="q-mb-md"
                :rules="[
                    val => val != null || 'Please type your password',
                    val => val.length > 6 || 'Select stronger password',
                ]"
                >
                    <template v-slot:append>
                        <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwd = !isPwd"
                        />
                    </template>
                </q-input>

                <!-- Submit form button -->
                <div class="row justify-end">
                    <q-btn 
                    color="primary" 
                    label="Register" 
                    type="submit"
                    />
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
    import { reactive, ref } from "vue";
    import { useFirebaseStore } from 'stores/firebase'
    const storeFirebase= useFirebaseStore();
    const isPwd= ref(true)

    // FormData Object
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

    // Create Store - User form - Function
    function registerValidationForm() {
        storeFirebase.register(formData)
    }
</script>

<style>

</style>