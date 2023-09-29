import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs,
    addDoc, deleteDoc, doc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCfkYyKX8EKadAM-z1fYFKqteMiDBUecDE",
    authDomain: "assistant-c8baa.firebaseapp.com",
    projectId: "assistant-c8baa",
    storageBucket: "assistant-c8baa.appspot.com",
    messagingSenderId: "371204788315",
    appId: "1:371204788315:web:be9f132cdfa5a2b94eef7e"
  };

  // init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, 'books');

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books);
  })
  .catch(err =>{
    console.log(err.message)
  })

  // adding documents
  const addBookForm = document.querySelector('.add')
  addBookForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    addDoc(colRef, {
        title: addBookForm.title.value, 
        author: addBookForm.author.value,
    })
    .then(() =>{
        addBookForm.reset()
    })
  })

  // deleting documents
  const deleteBookForm = document.querySelector('.delete')
  deleteBookForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const docRef = doc(db, 'books', deleteBookForm.id.value)
    deleteDoc(docRef)
    .then(() =>{
        deleteBookForm.reset()
    })
  })
  