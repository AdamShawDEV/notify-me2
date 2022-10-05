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
    doc,
    setDoc,
    getDoc,
} from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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

const googleProvider = new GoogleAuthProvider();

async function signInWithGoogle(setError) {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        const docsnap = await getDoc(doc(db, "users", user.uid));
        if (!docsnap.exists()) {
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: user.displayName,
                authProvider: 'google',
                email: user.email,
            });
        }
    } catch (e) {
        setError(e);
    }
}


async function logInWithEmailAndPassword(email, password, setError) {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch(e) {
        setError(e);
    }
}

async function registerWithEmailAndPassword(name, email, password, setError) {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;
        await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        })
    } catch (e) {
        setError(e);
    }
}
async function sendPasswordReset(email, setError) {
    try {
        await  sendPasswordResetEmail(auth, email);
        // reset sent
    } catch (e) {
        setError(e);
    }
}

function logout() {
    signOut(auth);
}

export { auth, db, signInWithGoogle, logInWithEmailAndPassword, registerWithEmailAndPassword, sendPasswordReset, logout };