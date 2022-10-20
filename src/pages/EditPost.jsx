import { useEffect, useRef } from 'react'
import ReactQuill from 'react-quill'
import { usePost } from '../contexts/PostContext'
import {doc, getDoc, updateDoc} from 'firebase/firestore'
import { db } from '../config/firebase'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import toast, { Toaster } from 'react-hot-toast'

const EditPost = () => {

  const { editingPost, setEditingPost, sending, setSending} = usePost()
  const formRef = useRef()
  const { id } = useParams()
  const navigate = useNavigate()
  
  const handleTextEditorChange = (value) =>{
    setEditingPost({...editingPost, content: value})
  }

  const getSinglePost = async () => {
    const docRef = doc(db, "posts", id) 
    const snapshot = await getDoc(docRef)
    setEditingPost(snapshot.data())
}

  useEffect(() =>{
    getSinglePost()
  }, [])


 
  const updatePost = async (e) => {
      e.preventDefault()
      setSending(true)
      const docRef = doc(db, "posts", id)
      await updateDoc(docRef, editingPost)
      toast.success("Post updated successfully.")
      setSending(false)
      setTimeout(() => {
        navigate("/")
      }, 1000);
  }

  return (
    <>
      <Header />
      <Toaster />
      <div className="relative bg-white w-3/4 m-auto  shadow ">
        <div className="py-6 px-6 lg:px-8">
          <h3 className="mb-4 text-xl font-medium text-gray-900 ">Update: {editingPost?.title}</h3>
          <form className="space-y-6" onSubmit={updatePost}  ref={formRef}>
            <div>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
                <input type="text" name="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Title.." required onChange={(e) => setEditingPost({...editingPost, title: e.target.value})} value={editingPost?.title}/>
            </div>
            <div>
            <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 ">Content</label>
            <ReactQuill value={editingPost?.content} onChange={handleTextEditorChange} />
            </div>
            <button type="submit" className="w-2/12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " disabled={sending}>Update Post</button>
          </form>
        </div>
      </div>
    </>

  )
}

export default EditPost