<template> 
    <div class="profile q-pa-md"  style="width: 700px; max-width: 96vw;">
        <q-form
        v-if="props.product"
        @submit.prevent="validationUpdateProduct"      
        class="bg-dark q-pa-lg column rounded-borders"
        >
        <q-input
            outlined    
            dark
            v-model="props.product.title"
            label="Title"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type title for product']"
        />
        <q-input
            outlined
            dark
            v-model="props.product.description"
            label="Description"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type description for product']"
        />

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

        <q-list class="shadow-2 rounded-borders q-my-md bg-white q-pa-md">
            <template props.product.recipes>

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

        <!-- <q-toggle class="text-white q-mt-xl"  v-model="accept" label="I accept the license and terms" /> -->

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
    const props = defineProps({
        product: Object,
        productId: String
    });
    const emits = defineEmits([
        'close-popup'
    ])
    const storeFirebase= useFirebaseStore();
    const typeOptions=ref(['fastfood', 'cold', 'hot'])
    const newRecipe=ref('')
    function validationUpdateProduct() {
        storeFirebase.updateProduct(props.product, props.productId);
        emits('close-popup')
    }
    function addRecipe() {
        const indexToRemove = formData.recipes.indexOf(newRecipe.value);
        if (indexToRemove !== -1) {
            console.log(newRecipe.value+ ' already added');
        }else {
            formData.recipes.push(newRecipe.value);
        }
        newRecipe.value=''    
    }
    function removeRecipe(recipeTitle) {
        const indexToRemove = formData.recipes.indexOf(recipeTitle);
        if (indexToRemove !== -1) {
            formData.recipes.splice(indexToRemove, 1);
        }
    }
</script>

<style>

</style>