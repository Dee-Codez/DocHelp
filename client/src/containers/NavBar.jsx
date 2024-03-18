import React, { useState , useEffect} from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { IoDocumentOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";


const NavBar = () => {


    let [isFile, setisFile] = useState(false);
    
    let [fileLoading, setFileLoading] = useState(false);
    let [file, setFile] = useState();
    let [fileName, setFileName] = useState();

    const handleFileChange = (e) => {
      if (e.target.files) {
        file = e.target.files[0];
        setFile(file);
      }
      console.log(file);
      
      handleUpload();
      
    };



    const handleUpload = async () => {
        if (file) {
          console.log("Uploading file...");
          fileLoading=true;
          setFileLoading(fileLoading);
      
          const formData = new FormData();
          formData.append("file", file);
      
          try {
            // You can write the URL of your server or any other endpoint used for file upload
            const result = await fetch("http://127.0.0.1:8000/uploadfile", {
              method: "POST",
              body: formData,
            });
      
            const data = await result.json();
            sessionStorage.setItem("filename", data.filename);
            fileLoading=false;
            setFileLoading(fileLoading);
            fileName = data.filename;
            setFileName(fileName);
            sessionStorage.setItem("filename", data.filename);
            isFile = true;
            setisFile(isFile);
            console.log(data);
          } catch (error) {
            console.error(error);
          }
        }
      };

      const clearResponse = async() => {
        const file_name = sessionStorage.getItem("filename");
        const response = await fetch(`http://127.0.0.1:8000/delete?file_name=${file_name}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        setisFile(false);
        sessionStorage.clear();
      }
    

    useEffect(() => {
        const nfile = sessionStorage.getItem("filename");
        if(nfile){
            setisFile(true)
            setFileName(nfile)
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
                <div className='flex lg:hidden'>
                {
                    <div className='flex'>
                        {isFile && <div className='mr-5'>
                            <div className='relative flex gap-2 mt-3 items-center hover:bg-black/30 rounded-lg p-1'>
                                <MdDelete size={30} onClick={clearResponse}  className='absolute p-1 opacity-0 hover:opacity-100'/>
                                <IoDocumentOutline size={30} className='text-[#0fa958] border border-[#0fa958] p-1' />
                            </div>
                        </div>}
                        <div onChange={handleFileChange} className='flex relative mt-3 mr-4 cursor-pointer'>
                            <input className='opacity-0 h-10 top-0 w-10 absolute left-0 ' type="file" />
                            <CiCirclePlus size={40} />
                        </div>
                    </div>
                }
                </div>
                {<div className='mr-4 hidden lg:flex'>
                    {isFile && <div className='relative cursor-pointer flex items-center justify-center'>
                        
                        <div className='flex z-10 gap-2 items-center hover:bg-black/30 rounded-lg p-1 max-w-[30vw] absolute top-3 right-8'>
                            <MdDelete size={30} onClick={clearResponse}  className='z-20 px-8 w-full  left-1/2 transform -translate-x-1/2  absolute opacity-0 hover:opacity-100'/>
                            <IoDocumentOutline size={30} className='text-[#0fa958] border border-[#0fa958] p-1' />
                            <div className='text-[#0fa958] text-sm truncate'>{fileName}</div>
                        </div>
                    </div>}
                    <div onChange={handleFileChange} className='flex relative gap-2 items-center px-6 py-1 hover:bg-black/20 cursor-pointer mt-3 border-2 rounded-lg border-black'>
                        
                        <input className='cursor-pointer opacity-0 h-10 top-0 w-44 absolute left-0 ' type="file" />
                        
                        {fileLoading?(<div>
                            <div className='animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#0fa958]'></div>
                        </div>):(<>
                            <CiCirclePlus size={25} />
                            <div className='font-bold -mt-[2px]'>Upload PDF</div>
                        </>
                        )}
                    </div>
                    
                </div>}

            </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
