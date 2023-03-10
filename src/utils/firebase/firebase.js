import {initializeApp} from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from "firebase/auth";
import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2woyOtIDi5sUHP_G81O-H0JJ9nFWTpb4",
    authDomain: "crown-clothing-db-cf1fc.firebaseapp.com",
    projectId: "crown-clothing-db-cf1fc",
    storageBucket: "crown-clothing-db-cf1fc.appspot.com",
    messagingSenderId: "826279679741",
    appId: "1:826279679741:web:50e8b15098b84208309094"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Auth providers
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

// Sign In
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

// Sign Up
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

// Firestore
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;

    const userDocRef = doc(db, "users", userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {displayName, email, createdAt, ...additionalInformation});
        } catch (error) {
            console.log("error creating user", error.message);
        }
    }

    return userDocRef;
}


