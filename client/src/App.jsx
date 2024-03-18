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
}

  return (
    <div className=''>
      <div>
        <div className='relative flex'>
          <div className='absolute top-0'>
            <NavBar />
          </div>
          <div className='absolute left-1/2 top-[30vh] transfrom -translate-x-1/2'>
            <Chat />
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
