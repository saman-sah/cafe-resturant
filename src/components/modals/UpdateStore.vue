<template> 
    <div class="q-pa-md"  style="width: 700px; max-width: 96vw;">
        <q-form
        v-if="props.store"
        @submit.prevent="validationUpdateStore"      
        class="bg-dark q-pa-lg column rounded-borders"
        >

        <!-- Store Title input field -->
        <q-input 
        outlined 
        v-model="props.store.title" 
        label="Store Title"  
        class="q-my-md"
        dark
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type your store title']"
        />

        <!-- Store Description input field -->
        <q-input 
        outlined 
        v-model="props.store.description" 
        label="Store Description"  
        class="q-my-md"
        dark
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type your store description']"
        />

        <!-- Store Location input field -->
        <q-input 
        outlined 
        v-model="props.store.location" 
        label="Store Location"  
        class="q-my-md"
        dark
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type your store location']"
        />

        <!-- Store Address input field -->
        <q-input 
        outlined 
        v-model="props.store.address" 
        label="Store Address"  
        class="q-my-md"
        dark
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type your store address']"
        />

        <!-- Store Image file input field -->
        <q-file
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
        </q-file>


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
        store: Object,
    });

    // emit for closing popup after submit form
    const emits = defineEmits([
        'close-popup'
    ])

    // submit add product form Function
    function validationUpdateStore() {
        storeFirebase.updateStore(props.store);
        emits('close-popup')
    }
</script>

<style>

</style>