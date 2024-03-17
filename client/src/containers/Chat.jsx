import React, {useState, useEffect} from 'react'

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, orderBy, limit, addDoc, serverTimestamp , onSnapshot} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';


const firebaseConfig = {

  apiKey: "AIzaSyDhWLrGySNIbXZNsQdiwqEUtgdObROJLCo",

  authDomain: "chatapp-1-fda9c.firebaseapp.com",

  projectId: "chatapp-1-fda9c",

  storageBucket: "chatapp-1-fda9c.appspot.com",

  messagingSenderId: "526117462949",

  appId: "1:526117462949:web:03431d4dda981270237e4c",

  measurementId: "G-NKR17QNQ44"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const Chat = () => {
    const msgRef = collection(db, 'messages');
    const q = query(msgRef, orderBy("createdAt"), limit(25))

    const [messages] = useCollectionData(q, { idField: 'id' });

    const [formvalue, setFormValue] = useState('');
    const [messageList, setMessageList] = useState([]);


    const sendHumanMessage = async(e) => {
        e.preventDefault();
        const newMessage = {
          text: formvalue,
          createdAt: serverTimestamp(),
          user: "human"
      };
        await addDoc(msgRef, newMessage);
        setFormValue('');
    }

    useEffect(() => {
      const unsubscribe = onSnapshot(query(msgRef, orderBy("createdAt")), (snapshot) => {
          setMessageList(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      });
      console.log(messageList);
      
      return () => unsubscribe();
  }, [msgRef]);


  return (
    <div className=''>
      <div className='bg-black/10 '>
        <div>
          <div className='pt-10'>
            <div className='mb-10'>
              {messageList.map((msg) => (
                <div className='relative flex justify-between' key={msg.id}>
                  {msg.user == "bot"?(
                    <div className='flex flex-start mr-auto ml-10'>
                      {msg.text}
                      </div>
                  ) :(
                    <div className='flex flex-end ml-auto mr-10'>

                      {msg.text}
                      </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='bg-black/5'>
          <form onSubmit={sendHumanMessage} className=' w-72 md:w-[40vw]'>
              <input className='bg-black/20 h-10 w-[90%]' value={formvalue} onChange={(e) => setFormValue(e.target.value)} />
              <button type='submit'>Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chat
