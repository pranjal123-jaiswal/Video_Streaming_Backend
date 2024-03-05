const firebase = require("firebase/compat/app")
const { initializeApp } = require("firebase/app");
const { getFirestore , collection  } = require("firebase/firestore");

// const { initializeApp, firestore } = require("firebase/compat/app");

const firebaseConfig = {
    apiKey: "AIzaSyD-HW0FQi81cqe5phIkJfccnH-fOgg84AM",
    authDomain: "video-streaming-4ec42.firebaseapp.com",
    databaseURL: "https://video-streaming-4ec42-default-rtdb.firebaseio.com",
    projectId: "video-streaming-4ec42",
    storageBucket: "video-streaming-4ec42.appspot.com",
    messagingSenderId: "346142192240",
    appId: "1:346142192240:web:16de9da9e334d14a373ab5",
    measurementId: "G-GE376FT3HK"
}; 

// Initialize Firebase
const app = initializeApp(firebaseConfig);  
const auth = getAuth(app)

module.exports = {
    auth
}
// const db = getFirestore(app)
// const videosCollectionRef = collection(db ,"Videos");
// module.exports = videosCollectionRef 