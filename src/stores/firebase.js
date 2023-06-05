import { defineStore } from 'pinia';
import { useRouter } from "vue-router";
import { useRoute } from 'vue-router'
// import { Notify } from 'quasar'
import _ from 'lodash'
import { 
    auth, 
    db,
    ref,
    set,
    push,
    onValue,
    update,
    remove,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from '../boot/firebase'
export const useFirebaseStore = defineStore('firebase', {
    state: () => ({
        user: null,
        route: useRoute(),
        router: useRouter(),
        userInfo: null,
        storeInfo: null,
        stores: null,
        products: null,
        productsCount: null,
        bar: null,
        loading: true,
    }),
    getters: {
       
    },
    actions: {  
        getStoresFirebase() {
            onValue(ref(db, 'stores'), (snapshot) => {
                const data = snapshot.val();
                this.stores= data                
            });
        },
        addRecipe() {
            let userId= auth.currentUser.uid 
            set(push(ref(db, 'products/'+ userId+ '/-NWzxxhVyFv1awcD9kb7/recipes' )),  
                ['fastfood', 'cold', 'hot']
            )
        },
        addProduct(formData) {
            let userId= auth.currentUser.uid 
            set(push(ref(db, 'products/'+ userId )), {
                title: formData.title,
                description: formData.description,
                price: formData.price,
                image: formData.imgUrl.name,
                category: formData.category,
                recipes: formData.recipes
            })
        },
        getStoreProducts(storeId) {
            onValue(ref(db, 'products/'+ storeId), (snapshot) => {
                const data = snapshot.val();  
                this.products=data;  
                this.productsCount= Object.keys(this.products).length  
                console.log('this.productsCount');     
                console.log(this.productsCount);     
            });
        },
        // Check User Logged In
        handleAuthStateChange() {
            auth.onAuthStateChanged(user=> {
                if(user) {
                    // this.startBar();
                    let userId= auth.currentUser.uid
                    this.user= user;
                    // if(currentPath.includes('login') ) {
                    //     this.router.push('/')  
                    // } 
                    onValue(ref(db, 'users/'+ userId), (snapshot) => {
                        const data = snapshot.val();
                        this.userInfo= {
                            name: data.name,
                            email: data.email,
                            role: data.role
                        }
                        if(data.role == 'admin') {
                            onValue(ref(db, 'stores/'+ userId), (snapshot) => {
                                const data = snapshot.val();
                                this.storeInfo= data;
                                this.storeInfo.storeId= userId;
                                console.log('this.storeInfo');
                                console.log(this.storeInfo);
                            })
                        }
                    })
                    // this.stopBar(); 
                }else {
                    let currentPath=this.route.path                     
                    this.user= null;
                    if(currentPath.includes('profile') ) {
                        this.router.push('/')
                    } 
                }
            })
        },
        //End--------- Check User Logged In


        login(userData) {
            // this.startBar();
            signInWithEmailAndPassword(auth, userData.email, userData.password)
            .then(response=> {
                this.user= response.user;
                // Notify.create({
                //     message: 'You are logged in',
                //     color: 'primary',
                //     timeout: '1500'
                // })
            })
            .catch(error=> {
                switch (error.code) {
                    case 'auth/user-not-found':
                        alert("User not Found")
                        break;
                    case 'auth/wrong-password':
                        alert("Wrong Password")
                        break;
                    
                    default:
                        alert("Something went Wrong")                      
                }
                return
            })
            // this.stopBar(); 
        },
        
        //Register Firebase Auth
        register(userData) {
            // this.startBar();
            console.log(userData);
            createUserWithEmailAndPassword(auth, userData.email, userData.password)
            .then(response=> {
                let userId= auth.currentUser.uid
                set(ref(db, 'users/'+ userId), {
                    name: userData.name,
                    email: userData.email,
                    role: userData.role
                })
                if(userData.store) {
                    set(ref(db, 'stores/'+ userId), {
                        address: userData.store.address,
                        description: userData.store.description,
                        image: userData.store.image,
                        location: userData.store.location,
                        title: userData.store.title,
                        slug: userData.store.title.toLowerCase().replace(/[^\w-]+/g, "-"),
                        products: {}
                    })
                }
                
                console.log('response register');
                console.log(response);
            })
            .catch(error=> {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        alert("Email already in use")
                        break;
                    case 'auth/invalid-email':
                        alert("Invalid Email")
                        break;
                    case 'auth/operation-not-allowed':
                        alert("Operation not allowes")
                        break;
                    case 'auth/weak-password':
                        alert("Week Password")
                        break;
                    
                    default:
                        alert("Something went Wrong")
                        
                }
                return
            })
            // this.stopBar(); 
            
        },

        //Register Firebase Auth
        logOut() {
            // this.startBar();
            signOut(auth).then(res=> {
                this.user= null;
                this.router.push('/')  
                // Notify.create({
                //     message: 'You are logged out',
                //     color: 'secondary',
                //     timeout: '1500'
                // });
            })    
            // this.stopBar(); 
        },
        //End--------- Logout Firebase Auth
        

        // setBar(bar) {
        //     this.bar = bar;
        // },
        // startBar() {
        //     if (this.bar) {
        //       this.bar.start();
        //     }
        // },
        // stopBar() {
        //     if (this.bar) {
        //       this.bar.stop();
        //     }
        // },
        // step2(params) {
        //     this.showModalStep2= true
        //     this.dataStep1= params;
        // }
      
    },
});
