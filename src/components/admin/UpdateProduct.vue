<template> 
    <div class="profile q-pa-md"  style="width: 700px; max-width: 96vw;">
        <q-form
        v-if="props.product"
        @submit.prevent="validationUpdateProduct"      
        class="bg-dark q-pa-lg column rounded-borders"
        >

        <!-- Title input field -->
        <q-input
            outlined    
            dark
            v-model="props.product.title"
            label="Title"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type title for product']"
        />

        <!-- Description input field -->
        <q-input
            outlined
            dark
            v-model="props.product.description"
            label="Description"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type description for product']"
        />

        <!-- Price input field -->
        <q-input
            dark 
            outlined            
            type="number"
            v-model.number="props.product.price"
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
        v-model="props.product.image"
        dark
        lazy-rules
        :rules="[
            val ? val => val.size < 250000 || 'Please select image less than 250KB' : '',
        ]"
        >
            <template v-slot:prepend>
                <q-icon name="attach_file" />
            </template>
            <q-avatar rounded>
                <q-img
                :src="props.product.image"
                />
            </q-avatar>
        </q-file>

        <!-- Category selection field -->
        <q-select class="q-mt-md" outlined 
        v-model="props.product.category" 
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
            <template v-if="props.product.recipes">

                <q-item dark
                v-for="(recipe, index) in props.product.recipes"
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
            </template>

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
        </div>
    </q-form>
</div>    
</template>

<script setup>
    import { ref } from "vue";
    import { useFirebaseStore } from 'stores/firebase'
    import { defineEmits } from 'vue'
    import { defineProps } from 'vue';
    const storeFirebase= useFirebaseStore();

    // Categories of products
    const typeOptions=ref(['fastfood', 'cold', 'hot'])
    
    // Const for added new recipe
    const newRecipe=ref('')

    // Props for getting product
    const props = defineProps({
        product: Object,
        productId: String
    });

    // emit for closing popup after submit form
    const emits = defineEmits([
        'close-popup'
    ])

    // submit add product form Function
    function validationUpdateProduct() {
        storeFirebase.updateProduct(props.product, props.productId);
        emits('close-popup')
    }

    // Add Recipe - Function
    function addRecipe() {
        if(!props.product.recipes) {
            props.product.recipes=[]
        }
        const indexToRemove = props.product.recipes.indexOf(newRecipe.value);
        if (indexToRemove !== -1) {
            console.log(newRecipe.value+ ' already added');
        }else {
            props.product.recipes.push(newRecipe.value);
        }
        newRecipe.value=''    
    }

    // Remove Recipe - Function
    function removeRecipe(recipeTitle) {
        const indexToRemove = props.product.recipes.indexOf(recipeTitle);
        if (indexToRemove !== -1) {
            props.product.recipes.splice(indexToRemove, 1);
        }
    }
</script>

<style>

</style>