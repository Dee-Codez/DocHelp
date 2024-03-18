import React, {useState, useEffect} from 'react'

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, orderBy, limit, addDoc, serverTimestamp , onSnapshot} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FaUser } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";

const firebaseConfig = {

  apiKey: "AIzaSyCsl1lHbvtATTRorxBwALI7wKvpQLJkDkg",

  authDomain: "chatapp-2-a510f.firebaseapp.com",

  projectId: "chatapp-2-a510f",

  storageBucket: "chatapp-2-a510f.appspot.com",

  messagingSenderId: "434989287246",

  appId: "1:434989287246:web:d19147d84f0c2431ff401f",

  measurementId: "G-SJ7MNCNRDZ"

};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Chat = () => {
    const msgRef = collection(db, 'messages');
    const q = query(msgRef, orderBy("createdAt"), limit(25))

    const [messages] = useCollectionData(q, { idField: 'id' });
    let text = "Hi";

    const [formvalue, setFormValue] = useState('');
    const [messageList, setMessageList] = useState([]);

    const fetchResponse = async() => {
      if(formvalue){
        text = formvalue
      }
      const response = await fetch(`http://127.0.0.1:8000/ask?question=${encodeURIComponent(text)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

      });
      const data = await response.json();
      console.log(data);
      sendBotMessage(data.ans);
    }

    const clearResponse = async() => {
      const response = await fetch(`http://127.0.0.1:8000`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
    }
    

    const sendHumanMessage = async(e) => {
        e.preventDefault();
        const newMessage = {
          text: formvalue,
          createdAt: serverTimestamp(),
          user: "human"
        };
        setFormValue('');
        if (!formvalue) {
          console.error('Cannot add message with undefined or empty text');
          return;
      }
        await addDoc(msgRef, newMessage);
    }

    const sendBotMessage = async(text) => {
      const newMessage = {
        text: text,
        createdAt: serverTimestamp(),
        user: "bot"
    };
    await addDoc(msgRef, newMessage);
    }

    useEffect(() => {
      const unsubscribe = onSnapshot(query(msgRef, orderBy("createdAt")), (snapshot) => {
          setMessageList(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      });
      console.log(messageList);
      return () => unsubscribe();
  }, []);

  let count =0;
  useEffect(() => {
    if(count==0){
      fetchResponse();

      count++;
    }
    
    
  }, []);



  return (
    <div className=''>
      <div className=' '>
        <div>
          <div className='pt-10'>
            <div className='mb-10'>
              {messageList.map((msg) => (
                <div className='relative flex justify-between' key={msg.id}>
                  {msg.user == "bot"?(
                    <div className='flex xl:max-w-[40vw] flex-start gap-2 mt-5 lg:mr-auto'>
                      <img className='w-8 h-8' src="/chatlogo.png" />
                      <div className=''>
                        {msg.text}
                      </div>
                    </div>
                  ) :(
                    <div className=' xl:max-w-[40vw] flex flex-end gap-2 lg:ml-auto mt-5'>
                      <div className='flex mt-1'>
                        <FaUser className='opacity-100 lg:opacity-0' size={20}/>
                      </div>
                      <div className=''>
                        {msg.text}
                      </div>
                      <div className='flex mt-1'>
                        <FaUser className='opacity-0 lg:opacity-100' size={20}/>
                      </div>
                      </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='border mb-10 border-gray-300 rounded-md shadow-lg shadow-black/10'>
          <form onSubmit={sendHumanMessage} className='relative w-72 sm:w-[84vw]'>
              <input placeholder='Send Message' className='h-10 outline-none w-[85%] md:w-[94%] pl-2' value={formvalue} onChange={(e) => setFormValue(e.target.value)} />
              <button type='submit' className='absolute top-2 right-4'><IoSendSharp size={20} /></button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chat
