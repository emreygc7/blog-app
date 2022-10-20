import { useRef }from 'react'
import { usePost } from '../contexts/PostContext'
import { uuidv4 } from '@firebase/util'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import Header from '../components/Header'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import  toast, { Toaster }  from 'react-hot-toast'
import LoadingIcons from 'react-loading-icons'

const CreatePost = () => {

    const { newPost, setNewPost, postImage, setPostImage, sending, setSending } = usePost()

    const formRef = useRef()

    const handleImage = (e) => {
        const imageAdress = e.target.files[0]
        const preview = URL.createObjectURL(imageAdress)
        setNewPost({...newPost, imgPreview: preview})
        setPostImage(imageAdress)
    }

    const sendPost = async (e) => {
        e.preventDefault()
        try {      
                if(postImage != undefined){
                    setSending(true)        
                    const storage = getStorage()
                    const metadata = {
                        contentType: 'image/jpeg'
                    }
                    const storageRef = ref(storage, 'postimages/' + postImage.name )
                    const upload = await uploadBytesResumable(storageRef, postImage, metadata)
                    const downloadUrl = await getDownloadURL(upload.metadata.ref)
                    await setDoc(doc(db,"posts",newPost.id), {...newPost, imgURL: downloadUrl})
                    setNewPost({              
                        title: "",
                        content: "",
                        imgPreview: "",
                        timestamp: serverTimestamp()
                    })
                    setPostImage(undefined)
                    formRef.current.reset()
                    toast.success("Blog post has been sent successfully.")
                    setSending(false)
            }else{
                toast.error("Please select a thumbnail.")
            }
        } catch (error) {
            console.log(error);
        }
  
    }

    const handleTextEditorChange = (value) =>{
        setNewPost({...newPost, content: value})
    }

  return (
    <>
        <Header /> 
        <Toaster /> 
        <div className="relative  w-3/4 m-auto  shadow ">
            <div className="py-6 px-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 ">Create a new Post</h3>
                <form className="space-y-6" onSubmit={sendPost} ref={formRef}>
                    <div>
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
                        <input type="text" name="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Title.." required onChange={(e) => setNewPost({...newPost, title: e.target.value, id: uuidv4()})}/>
                    </div>
                    <div>
                        
                    <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 ">Content</label>
                    <ReactQuill defaultValue={newPost.content} onChange={handleTextEditorChange} key={newPost.id} />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex items-start flex-col  w-full">
                            <label htmlFor="image" className='block mb-2 text-sm font-medium text-gray-900 '>Thumbnail</label>
                            <input type="file" name="" id="image" onChange={handleImage} accept=".jpg, .jpeg, .png" className="form-control block w-full px-2 py-1 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:border-blue-600 focus:outline-none"/>
                            {newPost.imgPreview ? <img src={newPost.imgPreview} className="m-auto w-96"/> : null}
                        </div>
                    </div>
                    <button type="submit" className={`${sending ? "w-20  text-white bg-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center": "w-20  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" }`} disabled={sending}>{sending ? "Sending..." : "Create"}</button>
                  
                </form>
            </div>
        </div>
        {
            sending ? <LoadingIcons.TailSpin /> : null
        }
    </>
  )
}

export default CreatePost