<template> 
    <div class="profile q-pa-md"  style="width: 700px; max-width: 96vw;">
        <q-form
        @submit.prevent="validationAddProduct"      
        @reset="onReset" 
        class="bg-dark q-pa-lg column rounded-borders"
        >

        <!-- Title input field -->
        <q-input
            outlined    
            dark
            v-model="formData.title"
            label="Title"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type title for product']"
        />

        <!-- Description input field -->
        <q-input
            outlined
            dark
            v-model="formData.description"
            label="Description"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type description for product']"
        />

        <!-- Price input field -->
        <q-input
            dark 
            outlined            
            type="number"
            v-model.number="formData.price"
            label="Price"
            lazy-rules
            :rules="[
                val => val != null && val != '' || 'Please enter price',
                val => val > 0 && val < 2000000 || 'Please type a real price'
            ]"
        />

        <!-- Image upload field -->
        <q-file         
        outlined
        v-model="formData.imgUrl"
        dark
        lazy-rules
        :rules="[
            val => val.name != null || 'Please attach your image',
            val => val.size < 250000 || 'Please select image less than 250KB',
        ]"
        >
            <template v-slot:prepend>
                <q-icon name="attach_file" />
            </template>
        </q-file>

        <!-- Category selection field -->
        <q-select class="q-mt-md" outlined 
        v-model="formData.category" 
        :options="typeOptions" 
        label="Category" 
        dark
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Select Product Category']"
        >
            <template v-slot:append>
            <q-icon name="checklist_rtl"  />
            </template>
        </q-select>

        <!-- List of added recipes -->
        <q-list class="shadow-2 rounded-borders q-my-md bg-white q-pa-md">

            <q-item dark
            v-for="(recipe, index) in formData.recipes"
            :key="index"
            class="bg-dark rounded-borders row justify-between q-mb-sm">
                <q-item-section avatar>
                    <q-icon color="primary" name="check" />
                </q-item-section>
                <q-item-section>
                    {{ recipe }}
                </q-item-section>
                <q-item-section avatar>
                    <q-btn flat
                    @click="removeRecipe(recipe)"
                    >
                        <q-icon color="primary" name="close" />
                    </q-btn>
                </q-item-section>                
            </q-item>

            <!-- Input field for adding a new recipe -->
            <q-item class="q-pa-none">
                <q-item-section>
                    <q-input 
                    v-model="newRecipe" 
                    label="Add New Recipe"  
                    outlined
                    dense
                    >
                        <template v-slot:append>
                            <q-icon 
                            v-if="newRecipe !== ''" 
                            name="close" 
                            @click="newRecipe = ''" 
                            class="cursor-pointer" 
                            />
                            <q-btn 
                            @click="addRecipe()"
                            round dense flat 
                            icon="send" 
                            />
                        </template>
                    </q-input>
                </q-item-section>
                
            </q-item>
        </q-list>

        <!-- Submit and Reset Buttons -->
        <div>            
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
    </q-form>
</div>    
</template>

<script setup>
    import { reactive, ref } from "vue";
    import { useFirebaseStore } from 'stores/firebase'
    import { defineEmits } from 'vue'
    const storeFirebase= useFirebaseStore();

    // Categories of products
    const typeOptions=ref(['fastfood', 'cold', 'hot'])

    // Const for added new recipe
    const newRecipe=ref('')

    // emit for closing popup after submit form
    const emits = defineEmits([
        'close-popup'
    ])

    // FormData Object
    const formData=reactive({
        title:'',
        description:'',
        price: Number,
        imgUrl: '',
        recipes: [  
        ],
        category: ''
    })    

    // submit add product form - Function
    function validationAddProduct() {    
        storeFirebase.addProduct(formData)
        emits('close-popup')
    }
    
    // Add Recipe - Function
    function addRecipe() {
        const indexToRemove = formData.recipes.indexOf(newRecipe.value);
        if (indexToRemove !== -1) {
            console.log(newRecipe.value+ ' already added');
        }else {
            formData.recipes.push(newRecipe.value);
        }
        newRecipe.value=''    
    }

    // Remove Recipe - Function
    function removeRecipe(recipeTitle) {
        const indexToRemove = formData.recipes.indexOf(recipeTitle);
        if (indexToRemove !== -1) {
            formData.recipes.splice(indexToRemove, 1);
        }
    }

    // Reset Form to empty Object - Function
    function onReset() {
        formData.title= ''
        formData.description= ''
        formData.price= Number
        formData.imgUrl= {}
        formData.recipes= []
        formData.category= ''
    }
</script>

<style>

</style>