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
    onChildAdded,
    onChildChanged,
    onChildRemoved,
    update,
    remove,
    get,
    child,
    // storage Firebase
    storage,
    storageRef,
    uploadBytes,
    getDownloadURL,
    deleteObject
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
        products: {},
        productsCount: null,
        bar: null,
        loading: true,
    }),
    getters: {
       
    },
    actions: { 
        updateUserInfo(userInfo) {
            let userId= auth.currentUser.uid
            update(ref(db, 'users/' + userId),{
                name : userInfo.name,
                email : userInfo.email,
            })
        },
        
        // Update store
        updateStore(store) {
            let userId= auth.currentUser.uid
            update(ref(db, 'stores/' + userId),{
                address : store.address,
                description : store.description,
                location: store.location,
                title: store.title,
                slug : store.title.toLowerCase().replace(/[^\w-]+/g, "-"),
            })
            if(typeof store.image == 'object') {
                uploadBytes(storageRef(storage, 'stores/'+ userId ), store.image)
                .then((snapshot) => {
                    console.log('uploaded img');
                    // Get Uploaded store Image
                    getDownloadURL(storageRef(storage, 'stores/'+ userId ))
                    .then((url) => {
                        // Create Store with uploaded image
                        update(ref(db, 'stores/'+ userId ), {
                            image: url
                        })    
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
        },

        // Update product
        updateProduct(product, productId) {
            let userId= auth.currentUser.uid
            update(ref(db, 'products/' + userId + '/' + productId ),{
                category:product.category,
                description:product.description,
                price:product.price,
                title:product.title,
                recipes: product.recipes ? product.recipes : []
            });
            if(typeof product.image == 'object') {
                uploadBytes(storageRef(storage, 'products/'+ userId +'/'+ productId), product.image)
                .then((snapshot) => {
                    console.log('uploaded img');
                    // Get Uploaded store Image
                    getDownloadURL(storageRef(storage, 'products/'+ userId +'/'+ productId))
                    .then((url) => {
                        // Create Store with uploaded image
                        update(ref(db, 'products/'+ userId +'/'+ productId), {
                            image: url
                        })
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
        },

        // Delete Product
        deleteProduct(productId, ptoductTitle) {
            let userId= auth.currentUser.uid 
            remove(ref(db, 'products/' + userId +'/'+ productId))
                .then(()=> {
                    Notify.create({
                        message: ptoductTitle + ' was deleted',
                        color: 'secondary',
                        timeout: '1500'
                    })
                    deleteObject(storageRef(storage, 'products/'+ userId +'/'+ productId))
                    .then(() => {
                        console.log('product image deleted');
                    }).catch((error) => {
                        console.log('// Uh-oh, an error occurred!');                        
                    });
                    this.stopBar();
                })
        },

        // Get Stores
        getStoresFirebase() {
            onValue(ref(db, 'stores'), (snapshot) => {
                const data = snapshot.val();
                this.stores= data                
            });
        },

        // Add Product
        addProduct(formData) {
            console.log('formData');
            console.log(formData);
            this.startBar();
            let userId= auth.currentUser.uid 
            const productData = {
                title: formData.title,
                description: formData.description,
                price: formData.price,
                image: formData.imgUrl.name,
                category: formData.category,
                recipes: formData.recipes,
            };
            const dbProductRef = push(ref(db, 'products/' + userId));
            set(dbProductRef, productData)
            .then(() => {
                const productId = dbProductRef.key;
                // Upload Store Image 
                uploadBytes(storageRef(storage, 'products/'+ userId +'/'+ productId), formData.imgUrl)
                .then((snapshot) => {
                    console.log('uploaded img');
                    // Get Uploaded store Image
                    getDownloadURL(storageRef(storage, 'products/'+ userId +'/'+ productId))
                    .then((url) => {
                        // Create Store with uploaded image
                        update(ref(db, 'products/'+ userId +'/'+ productId), {
                            image: url
                        })
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

                Notify.create({
                    message: 'Product Added',
                    color: 'primary',
                    timeout: '1500'
                });

                // ...
            })
            .catch((error) => {
                console.error("Error adding object: ", error);
            });
        },

        // Get Store Product
        getStoreProducts(storeId) {
            this.productsCount=0;
            this.startBar();
            onChildRemoved(ref(db, 'products/'+ storeId), (snapshot) => {
                const product = snapshot.val();
                const productKey = snapshot.key;
                    if(product) {                                            
                        delete this.products[productKey];  
                        this.productsCount--                        
                    }
                    this.stopBar();
              });
            onChildAdded(ref(db, 'products/'+ storeId), (snapshot) => {
                console.log('On Child Added');
                const product = snapshot.val();
                const productKey = snapshot.key;
                    if(product) {                    
                        this.products[productKey]=product;  
                        this.productsCount++ 
                    }
                    this.stopBar();
              });
              onChildChanged(ref(db, 'products/'+ storeId), (snapshot) => {
                console.log('On Child Change');
                const product = snapshot.val();
                const productKey = snapshot.key;
                    if(product) {                    
                        this.products[productKey]=product;  
                        this.productsCount++ 
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

        // Login Firebase Auth
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

        //Logout Firebase Auth
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
    },
});
