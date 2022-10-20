import { createContext, useContext, useState } from 'react'
import { serverTimestamp } from 'firebase/firestore';


const postContext = createContext()

const PostContextProvider = ({ children }) => {
    
    const [newPost, setNewPost] = useState({
        title: "",
        content: "",
        imgPreview: "",
        id: "",
        timestamp: serverTimestamp()
    })
    const [postImage, setPostImage] = useState()
    const [postList, setPostList] = useState()
    const [singlePost, setSinglePost] = useState()
    const [editingPost, setEditingPost] = useState()
    const [sending, setSending] = useState(false)


    const postData = {
        newPost,
        setNewPost,
        postImage,
        setPostImage,
        postList,
        setPostList,
        singlePost,
        setSinglePost,
        editingPost,
        setEditingPost,
        sending,
        setSending
    }

    return (
        <postContext.Provider value={postData}>
            {children}
        </postContext.Provider>
  )
}

export const usePost = () => {
    const context = useContext(postContext)
    return context; 
}

export default PostContextProvider