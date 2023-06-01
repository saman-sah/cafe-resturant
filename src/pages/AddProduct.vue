<template>
    <q-page class="profile q-pa-md">
        <q-form
        @submit="onSubmit"
        @reset="onReset"        
        class="bg-dark q-pa-lg column rounded-borders"
        >
        <q-input
            outlined    
            dark     
            v-model="name"
            label="Title"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <q-input
            outlined    
            dark     
            v-model="name"
            label="Description"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
            dark 
            outlined            
            type="number"
            v-model="age"
            label="Price"
            lazy-rules
            :rules="[
            val => val !== null && val !== '' || 'Please type your age',
            val => val > 0 && val < 100 || 'Please type a real age'
            ]"
        />

        <q-file outlined v-model="model" dark>
            <template v-slot:prepend>
            <q-icon name="attach_file" />
            </template>
        </q-file>

        <q-select class="q-mt-md" outlined 
        v-model="model" 
        :options="options" 
        label="Type" 
        dark>
            <template v-slot:append>
            <q-icon name="checklist_rtl"  />
            </template>
        </q-select>

        <q-list class="shadow-2 rounded-borders q-mt-md bg-white q-pa-md">

            <q-item dark class="bg-dark rounded-borders q-mb-sm">
                <q-item-section avatar>
                    <q-icon color="primary" name="check" />
                </q-item-section>
                <q-item-section>Recipe item</q-item-section>
            </q-item>
            <q-item dark class="bg-dark rounded-borders q-mb-sm">
                <q-item-section avatar>
                    <q-icon color="primary" name="check" />
                </q-item-section>
                <q-item-section>Recipe item</q-item-section>
            </q-item>
            <q-item dark class="bg-dark rounded-borders q-mb-sm">
                <q-item-section avatar>
                    <q-icon color="primary" name="check" />
                </q-item-section>
                <q-item-section>Recipe item</q-item-section>
            </q-item>

            <q-item class="q-pa-none">
                <q-item-section>
                    <q-input 
                    v-model="text" 
                    label="Add New Recipe"  
                    outlined
                    :dense="dense"
                    >
                        <template v-slot:append>
                            <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />

                        <q-btn round dense flat icon="send" />
                        </template>
                    </q-input>
                </q-item-section>
                
            </q-item>
        </q-list>

        <q-toggle class="text-white q-mt-xl"  v-model="accept" label="I accept the license and terms" />

        <div>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
    </q-form>
    </q-page>    
</template>

<script setup>
</script>

<style>

</style>