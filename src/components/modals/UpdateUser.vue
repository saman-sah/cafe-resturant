<template> 
    <div class="q-pa-md"  style="width: 700px; max-width: 96vw;">
        <q-form
        v-if="props.userInfo"
        @submit.prevent="validationUpdateUserInfo"      
        class="bg-dark q-pa-lg column rounded-borders"
        >
        
        <!-- User name input field -->
        <q-input 
        outlined 
        v-model="props.userInfo.name" 
        label="Name"  
        class="q-my-md"
        dark
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type your real name']"
        />

        <!-- User email input field -->
        <q-input 
        outlined 
        v-model="props.userInfo.email" 
        label="Email"  
        class="q-my-md"
        dark
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type your email']"
        />

        <!-- User Password input field -->
        <q-input 
        outlined 
        v-model="props.userInfo.password" 
        label="New Password"  
        class="q-my-md"
        dark
        lazy-rules
        :rules="[ val ? val => val && val.length > 6 || 'Your password have to be at least 6 charachter' : '']"
        />
       
        <!-- Store Image file input field -->
        <!-- <q-file
        outlined 
        v-model="props.store.image" 
        label="Store Image"  
        class="q-my-md"
        dark
        :rules="[
            val ? val => val.size < 250000 || 'Please select image less than 250KB' : '',
        ]"
        >
            <template v-slot:prepend>
                <q-icon name="attach_file" />
            </template>
            <q-avatar v-if="typeof props.store.image == 'string'" rounded>
                <q-img
                :src="props.store.image"
                />
            </q-avatar>
        </q-file> -->


        <!-- Submit and Reset Buttons -->
        <div>
            <q-btn label="Submit" type="submit" color="primary"/>
        </div>
    </q-form>
</div>    
</template>

<script setup>
    import { useFirebaseStore } from 'stores/firebase'
    import { defineEmits } from 'vue'
    import { defineProps } from 'vue';
    const storeFirebase= useFirebaseStore();

    // Props for getting product
    const props = defineProps({
        userInfo: Object,
    });

    // emit for closing popup after submit form
    const emits = defineEmits([
        'close-popup'
    ])

    // submit add product form Function
    function validationUpdateUserInfo() {
        storeFirebase.updateUserInfo(props.userInfo);
        emits('close-popup')
    }
</script>

<style>

</style>