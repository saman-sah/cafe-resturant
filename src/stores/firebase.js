import { defineStore } from 'pinia';
import { useRouter } from "vue-router";
import { useRoute } from 'vue-router'
import { Notify } from 'quasar'
import { 
    // Auth Firebase
    auth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    // Database Firebase
    db,
    ref,
    set,
    push,
    onValue,
    update,
    remove,
    // storage Firebase
    storage,
    storageRef,
    uploadBytes,
    getDownloadURL,
} from '../boot/firebase'
export const useFirebaseStore = defineStore('firebase', {
    state: () => ({
        user: null,
        route: useRoute(),
        router: useRouter(),
        userInfo: null,
        storeInfo: {
            address: "",
            description: "",
            image: "",
            location: "",
            slug: "",
            storeId: "",
            title: ""
        },
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
        addProduct(formData) {
            this.startBar();
            let userId= auth.currentUser.uid 
            set(push(ref(db, 'products/'+ userId )), {
                title: formData.title,
                description: formData.description,
                price: formData.price,
                image: formData.imgUrl.name,
                category: formData.category,
                recipes: formData.recipes
            }).then (res=> {
                Notify.create({
                    message: 'Product Added',
                    color: 'primary',
                    timeout: '1500'
                })
                this.stopBar(); 
            })
        },
        getStoreProducts(storeId) {
            this.startBar();
            onValue(ref(db, 'products/'+ storeId), (snapshot) => {
                const data = snapshot.val();
                if(data) {                    
                    this.products=data;  
                    this.productsCount= Object.keys(this.products).length  
                }
                this.stopBar(); 
            });
        },
        // Check User Logged In
        handleAuthStateChange() {
            auth.onAuthStateChanged(user=> {
                if(user) {
                    this.startBar();
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
                        if(this.userInfo.role == 'admin') {
                            onValue(ref(db, 'stores/'+ userId), (snapshot) => {
                                const data = snapshot.val();                                
                                this.storeInfo.address = data.address
                                this.storeInfo.description = data.description
                                this.storeInfo.image = data.image
                                this.storeInfo.location= data.location
                                this.storeInfo.slug = data.slug
                                this.storeInfo.title= data.title
                                this.storeInfo.storeId= userId;
                            })
                        }
                    })
                    this.stopBar(); 
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
            this.startBar();
            signInWithEmailAndPassword(auth, userData.email, userData.password)
            .then(response=> {
                this.user= response.user;
                Notify.create({
                    message: 'You are logged in',
                    color: 'primary',
                    timeout: '1500'
                })
                this.stopBar(); 
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
            
        },
        
        //Register Firebase Auth
        register(userData) {
            this.startBar();
            createUserWithEmailAndPassword(auth, userData.email, userData.password)
            .then(response=> {
                let userId= auth.currentUser.uid

                // Create UserInfo in database
                set(ref(db, 'users/'+ userId), {
                    name: userData.name,
                    email: userData.email,
                    role: userData.role
                }).then(()=> {
                    if(userData.store) {
                        // Upload Store Image 
                        uploadBytes(storageRef(storage, 'stores/'+ userId), userData.store.image)
                        .then((snapshot) => {
                            console.log('uploaded img');
                            // Get Uploaded store Image
                            getDownloadURL(storageRef(storage, 'stores/'+ userId))
                            .then((url) => {
                                // Create Store with uploaded image
                                set(ref(db, 'stores/'+ userId), {
                                    address: userData.store.address,
                                    description: userData.store.description,
                                    image: url,
                                    location: userData.store.location,
                                    title: userData.store.title,
                                    slug: userData.store.title.toLowerCase().replace(/[^\w-]+/g, "-"),
                                    products: {}
                                })     
                                this.router.push('/')  
                                this.stopBar();                          
                            })
                            // Catch error for getting store image url
                            .catch((error) => {
                            switch (error.code) {
                                case 'storage/object-not-found':
                                break;
                                case 'storage/unauthorized':
                                break;
                                case 'storage/canceled':
                                break;
                                case 'storage/unknown':
                                break;
                            }
                            });                            
                        })
                    }
                }).catch(err=> {
                    console.log(err.message);
                })                
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
            
        },

        //Register Firebase Auth
        logOut() {
            this.startBar();
            signOut(auth).then(res=> {
                this.user= null;
                this.storeInfo= {
                    address: "",
                    description: "",
                    image: "",
                    location: "",
                    slug: "",
                    storeId: "",
                    title: ""
                }
                this.router.push('/')  
                Notify.create({
                    message: 'You are logged out',
                    color: 'secondary',
                    timeout: '1500'
                });
                this.stopBar(); 
            })    
            
        },
        //End--------- Logout Firebase Auth
        

        setBar(bar) {
            this.bar = bar;
        },
        startBar() {
            if (this.bar) {
              this.bar.start();
            }
        },
        stopBar() {
            if (this.bar) {
              this.bar.stop();
            }
        },
        step2(params) {
            this.showModalStep2= true
            this.dataStep1= params;
        }
      
    },
});
