import firebase from 'firebase'
import firestore from 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyCtVKgBwCtEkGUhKACTkhhHprVxJw4330A",
  authDomain: "tech-recipies-vuejs.firebaseapp.com",
  databaseURL: "https://tech-recipies-vuejs.firebaseio.com",
  projectId: "tech-recipies-vuejs",
  storageBucket: "",
  messagingSenderId: "999949132260",
  appId: "1:999949132260:web:f3cc4267ae424b1a"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
//firebaseApp.firestore().settings({ timestampsInSnapshots: true })

// export firestore database
export default firebaseApp.firestore()
