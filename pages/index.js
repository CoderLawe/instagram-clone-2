import Head from 'next/head'
import Feed from '../components/Feed';
import Header from '../components/Header';
// import Modals from '../components/Modals';
// import Modal from '../components/Modal';


import { useRecoilState } from "recoil";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useRef, useState } from "react";
import { ModalContext } from '../atoms/context/modalContext';
// import {Modals} from '../components/Modals'
import  Modal  from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { CameraIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline';
import { db, storage } from '../firebase';
import { useSession, signIn, signOut } from "next-auth/react"
import { serverTimestamp, addDoc, collection, updateDoc, doc } from '@firebase/firestore';
import { ref, getDownloadURL, uploadString } from "@firebase/storage";


const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 24,
  p: 4,


}

export default function Home() {
  const [open, setOpen] = useContext(ModalContext);
  const filePickerRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const captionRef = useRef(null);

  const {data:session} = useSession()


  const addImageToPost = (e) => {
      const reader = new FileReader();

      if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = (readerEvent) => {
          setSelectedFile(readerEvent.target.result)
        }
      }
  }

  const uploadPost = async () => {
    if(loading) return;

    setLoading(true);

    // Create a post and add it to the firestore 'posts' collection

    // Get the post id from the newly created post.

    // Upload the image to firebase storage with the post id
    // Get a download URL from storage to storage and update original post with image

    const docRef = await addDoc(collection(db, 'posts'), {
      username:  session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp()
    })

    console.log("New doc added with Id", docRef.id)

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, selectedFile,"data_url").then(async snapshot => {
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, 'posts', docRef.id),{
        image: downloadURL
      })
    })

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  }

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">

      {/* <Modals /> */}


   
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>


      {/* <Modals /> */}
         {/* MOdal start */}
          <Modal 
       open={open}
       onClose={handleClose}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
       >
         <Box 
         sx={style}
         className="bg-white text-gray-800 focus:outline-none"
         >
          <div className="block">
            
          { selectedFile ? (  

              <>
                <img src={selectedFile} className="w-full object-contain cursor-pointer" onClick={() => setSelectedFile(null)}alt=""/>
              </>

          ) : (

            <>
              <div onClick={() => filePickerRef.current.click()} className="flex justify-center p-3 bg-gray-300 mx-24 rounded-full">
                    <CameraIcon className="h-32 text-red-600 cursor-pointer  hover:text-red-500 transform transition-all duration-300 ease-out" aria-hidden="true"/>
                </div>
                  <div>
                    <input 
                    ref={filePickerRef}
                    type="file"
                    hidden
                    onChange={addImageToPost}
                    
                    />
                  </div>
            </>

          )}
          
          <div className="flex flex-col justify-center">
            <div className="text-center"> 
                <h3 className="text-gray-700 text-lg font-serif mt-5">Upload a Photo here</h3>
            </div>

          <div className="flex justify-center">
          <input ref={captionRef} className="focus:outline-none  border-none focus:ring-0 text-gray-400" placeholder="Please enter a caption here" type="text"  
            // onChange={(e) => setCaption(e.target.value)}
            />

          </div>
            
          </div>


              <div className="flex justify-center mt-4">
                  <button 
                  disabled={!setSelectedFile}
                  onClick={uploadPost}
                  className="bg-red-500 text-center disabled:cursor-not-allowed disabled:bg-gray-300
                   w-full py-3 text-white hover:shadow-lg 
                   hover:bg-red-600 transfrom transition-all duration-300 ease-out">{loading ?"Uploading" : "Upload Post"} </button>
              </div>
          </div>
         </Box>

       </Modal>

      {/* Modal end */}
      <Feed />


    </div>
  )
}
