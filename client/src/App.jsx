import React from 'react'
import NavBar from './containers/NavBar'
import Chat from './containers/Chat'
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";


const App = () => {

  const deleteAllData = async () => {
    const db = getFirestore();
    const collections = ['messages']; // replace with your collection names

    for (const collectionName of collections) {
      const querySnapshot = await getDocs(collection(db, collectionName));
      querySnapshot.forEach((document) => {
          deleteDoc(doc(db, collectionName, document.id));
      });
    }
    const file_name = sessionStorage.getItem("filename");
    const response = await fetch(`http://127.0.0.1:8000/delete?file_name=${file_name}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    sessionStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
}


  return (
    <div className=''>
      <div>
        <div className='relative flex flex-col h-screen justify-between items-center'>
          <div className=''>
            <NavBar />
          </div>
          <div className='absolute top-[20vh] pb-32 left-1/2 transform -translate-x-1/2'>
            <Chat className="" />
          </div>
          <div className='fixed bottom-10 right-10' onClick={deleteAllData}>
            <div className='p-2 rounded-lg cursor-pointer border-2 border-gray-400'>Reset</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
