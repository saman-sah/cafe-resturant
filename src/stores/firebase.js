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
        items: null,
        bar: null,
        loading: true,
    }),
    getters: {
    },
    actions: {  
        addProduct() {
            let userId= auth.currentUser.uid 
            set(push(ref(db, 'stores/'+ userId + '/products')), {
                title: "product1",
                description: "product1 description",
                price: 1000,
                image: "image",
                category: "category"
            })
        },
        // Check User Logged In
        handleAuthStateChange() {
            auth.onAuthStateChanged(user=> {
                if(user) {
                    // this.startBar();
                    let userId= auth.currentUser.uid 
                    // let currentPath=this.route.path
                    this.user= user;
                    console.log('user');
                    console.log(this.user);
                    // if(currentPath.includes('login') ) {
                    //     this.router.push('/')  
                    // } 
                    onValue(ref(db, 'users/'+ userId), (snapshot) => {
                        const data = snapshot.val();
                        this.items=data.items
                        this.getSortedItems;
                        this.userInfo= {
                            name: data.name,
                            email: data.email
                        }
                    });
                    // this.stopBar(); 
                }else {                       
                    this.user= null;
                    // this.router.replace('/login')  
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
            this.stopBar(); 
            
        },

        //Register Firebase Auth
        logOut() {
            // this.startBar();
            signOut(auth).then(res=> {
                this.user= null;
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
