import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC2GrsViu-C6YLXdgwETqtE6mL_eDd8d5w",
    authDomain: "notify-a9da2.firebaseapp.com",
    projectId: "notify-a9da2",
    storageBucket: "notify-a9da2.appspot.com",
    messagingSenderId: "565178451440",
    appId: "1:565178451440:web:2176847faca4397e0dc935",
    measurementId: "G-BW47CKQL7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

const googleProvider = new GoogleAuthProvider();

async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        const q = query(collection(db, "users"), where("uid", '==', user.uid));
        const docs = await getDocs(q);
        if (docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.id,
                name: user.displayName,
                authProvider: 'google',
                email: user.email,
            });
        }
    } catch (e) {
        console.log(e);
    }
}


async function logInWithEmailAndPassword(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch(e) {
        console.log(e);
    }
}

async function registerWithEmailAndPassword(name, email, password) {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;
        await addDoc(collection(db, 'users'), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        })
    } catch (e) {
        console.log(e);
    }
}
async function sendPasswordReset(email) {
    try {
        await  sendPasswordResetEmail(auth, email);
        // reset sent
    } catch (e) {
        console.log(e);
    }
}

function logout() {
    signOut(auth);
}

export { auth, db, signInWithGoogle, logInWithEmailAndPassword, registerWithEmailAndPassword, sendPasswordReset, logout };