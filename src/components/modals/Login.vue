<template>
    <div class="q-pa-md">
        <div class="q-gutter-y-md" style="max-width: 600px">
            <q-card>
            <q-tabs
                v-model="tab"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="justify"
                narrow-indicator
            >
                <q-tab name="login" label="Login" />
                <q-tab name="register" label="Register" />
            </q-tabs>
  
            <q-separator />
  
            <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="login">

                    <!-- Login form -->
                    <form 
                    @submit.prevent="loginValidationForm" 
                    @reset="onReset"
                    class="q-gutter-md"
                    >

                        <!-- Email input field -->
                        <q-input 
                        outlined 
                        v-model="formData.email" 
                        type="email"
                        label="Email"  
                        class="q-my-md"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Please type your email']"
                        />

                        <!-- Password input field -->
                        <q-input 
                        :type="isPwd ? 'password' : 'text'"
                        outlined 
                        v-model="formData.password"                         
                        label="Password"
                        class="q-mb-md"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Please type your password']"
                        >
                            <template v-slot:append>
                                <q-icon
                                    :name="isPwd ? 'visibility_off' : 'visibility'"
                                    class="cursor-pointer"
                                    @click="isPwd = !isPwd"
                                />
                            </template>
                        </q-input>

                        <!-- Submit and Reset Buttons -->
                        <div class="row justify-end">
                            <q-btn 
                            color="primary" 
                            label="Login" 
                            type="submit"
                            v-close-popup
                            />
                            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />

                        </div>
                    </form>
                </q-tab-panel>
    
                <q-tab-panel name="register">

                    <!-- Register form -->
                    <form 
                    @submit.prevent="registerValidationForm" 
                    class="q-gutter-md"
                    >

                        <!-- Name input field -->
                        <q-input 
                        outlined 
                        v-model="formData.name" 
                        label="Name"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Please type your name']"
                        />

                        <!-- Email input field -->
                        <q-input 
                        outlined 
                        v-model="formData.email" 
                        type="email"
                        label="Email"  
                        class="q-my-md"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Please type your email']"
                        />

                        <!-- Password input field -->
                        <q-input 
                        :type="isPwd ? 'password' : 'text'"
                        outlined 
                        v-model="formData.password" 
                        label="Password"
                        class="q-mb-md"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Please type your password']"
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
                            <!-- Submit and Reset Buttons -->
                            <q-btn 
                            v-close-popup 
                            color="primary" 
                            label="Register" 
                            type="submit"
                            />
                        </div>
                    </form>
                </q-tab-panel>
            </q-tab-panels>
        </q-card>
      </div>
    </div>
  </template>

<script setup>
    import { reactive, ref } from "vue";
    import { useFirebaseStore } from 'stores/firebase'
    const storeFirebase= useFirebaseStore();
    const tab=ref('login')

    // FormData Object
    const formData= reactive({
        name: '',
        email: '',
        password:'',
        role: 'user'
    })
    const isPwd= ref(true)

    // submit login form - Function
    function loginValidationForm() {
        storeFirebase.login(formData)
    }

    // submit register form - Function
    function registerValidationForm() {
        storeFirebase.register(formData)
    }

    // Reset Form to empty Object - Function
    function onReset() {
        formData.name= ''
        formData.email= ''
        formData.password= ''
    }
</script>

<style>

</style>