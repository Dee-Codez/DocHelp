import React, { useState , useEffect} from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { IoDocumentOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const NavBar = ({file}) => {
    const [isFile, setisFile] = useState(false);
    

    const handleDelete = () => {
        console.log('delete');
        setisFile(false);
    }

    useEffect(() => {
        if(file){
            setisFile(true)
        }else{
            setisFile(false)
        }
    }, [])
    

  return (
    <div>
      <div>
        <div className='w-[100vw] shadow-xl shadow-black/5 h-16'>
            <div className='flex items-center justify-between'>
                <div className='flex mt-2 ml-4'>
                    <img src="/logo.png"/>
                </div>
                {<div className='mr-4 hidden lg:flex'>
                    {isFile && <div className='relative cursor-pointer flex items-center justify-center'>
                        
                        <div className='flex z-10 gap-2 items-center hover:bg-black/30 rounded-lg p-1 absolute top-3 right-8'>
                            <MdDelete size={90} onClick={handleDelete}  className='z-20 px-8 left-1/2 transform -translate-x-1/2  absolute opacity-0 hover:opacity-100'/>
                            <IoDocumentOutline size={30} className='text-[#0fa958] border border-[#0fa958] p-1' />
                            <div className='text-[#0fa958]'>{file}.pdf</div>
                        </div>
                    </div>}
                    <div className='flex gap-2 items-center px-6 py-1 hover:bg-black/20 cursor-pointer mt-3 border-2 rounded-lg border-black'>
                        <CiCirclePlus size={25} />
                        <div className='font-bold -mt-[2px]'>Upload PDF</div>
                    </div>
                    
                </div>}

            </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
