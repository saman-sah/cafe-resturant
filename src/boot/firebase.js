import * as firebase from "firebase/app";
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  deleteUser,
  signOut 
} from "firebase/auth";
import { 
  getStorage, 
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll 
} from "firebase/storage";
import { 
  getDatabase, 
  ref, 
  onValue, 
  set,
  push,
  update,
  remove,
  onChildAdded,
  onChildChanged,
  onChildRemoved ,
  // off,
  get,
  child,
} from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCFPGIATsaLVMKpWdMA0Yw2fBE6IOyb8Cs",
  authDomain: "cafe-resturant-433b6.firebaseapp.com",
  projectId: "cafe-resturant-433b6",
  storageBucket: "cafe-resturant-433b6.appspot.com",
  messagingSenderId: "43707777248",
  appId: "1:43707777248:web:bb2cfa1e3cb438e8fed085"
};



let firebaseApp = firebase.initializeApp(firebaseConfig);
let auth= getAuth(firebaseApp);
let db= getDatabase(firebaseApp);
let storage= getStorage(firebaseApp)
export { 
    auth, 
    updateEmail,
    updatePassword,
    db, 
    deleteUser,
    ref, 
    onValue, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    set,
    push,
    update,
    remove,
    storage,
    storageRef,
    uploadBytes,
    getDownloadURL,
    onChildAdded,
    onChildChanged,
    onChildRemoved ,
    // off,
    get,
    child,
    deleteObject,
    listAll
    
}
