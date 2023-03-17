import {initializeApp} from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import {getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs} from "firebase/firestore";

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
initializeApp(firebaseConfig);


// Auth providers
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

// Sign In
const auth = getAuth();
const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

const signInUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

// Sign Up
const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

// Sign Out
const signOutUser = async () => await signOut(auth);

// Auth state changed
const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

// Firestore
const db = getFirestore();

const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field = "title") => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    console.log(objectsToAdd);

    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object[field].toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log("success");
}

const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, "categories");
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const {title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});

    return categoryMap;
}

const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
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

export {
    auth,
    signInWithGooglePopup,
    signInUserWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
    onAuthStateChangedListener,
    signOutUser,

    db,
    createUserDocumentFromAuth,
    addCollectionAndDocuments,
    getCategoriesAndDocuments
};


