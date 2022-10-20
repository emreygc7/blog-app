import { useEffect } from 'react'
import { useUser } from '../contexts/UserContext'
import { usePost } from '../contexts/PostContext'
import { db } from '../config/firebase'
import { collection, getDocs, orderBy, query, doc, deleteDoc } from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom'
import htmlToFormattedText from "html-to-formatted-text";
import toast, {Toaster} from 'react-hot-toast'
import { FiEdit, FiTrash2 } from 'react-icons/fi'


const PostList = () => {

    const { isAuth } = useUser()
    const { postList, setPostList } = usePost()
    const navigate = useNavigate()

    const getPosts = async () => {
        const colRef = collection(db, "posts")
        const q = query(colRef, orderBy("timestamp", "desc"))
        const snapshots = await getDocs(colRef, q)
        const documents = snapshots.docs.map(doc => doc.data())
        setPostList(documents)
    }

    useEffect(() => {
        getPosts()
    },[])

    const deletePost = async (id) => {
        try {
            const docRef = doc(db,"posts", id)
            await deleteDoc(docRef)
            getPosts()
            toast.success("Post successfully deleted.")
        } catch (error) {
            console.log(error);
        }
      
    }
  return (
    <div className='md:w-3/4 flex flex-col md:gap-2 justify-center items-baseline  m-auto border-l border-r '>
        <Toaster/>
       {
        postList?.map(post => (
            <div className=' flex w-full md:w-2/4 bg-white shadow-md border border-gray-200 rounded-lg mt-10' key={post.id}>
                <Link to={`/post/${post.id}`} className='flex'>
                    <img src={post.imgURL} className="w-32 h-auto md:w-64 md:h-auto object-contain md:object-fill" alt='img-error'/>
                    <div className='flex flex-col justify-between gap-2 break-words p-4'>
                        <h1 className='md:text-2xl font-bold text-xs'>{post.title}</h1>
                        <p className='font-light opacity-75 italic md:text-base text-xs'>{htmlToFormattedText(post.content.substr(0,150))}...</p>
                        <div className='flex'>
                            <span className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg md:text-sm px-3 py-2 text-center inline-flex items-center text-xs '>Read more</span>
                        </div>
                    </div>
                </Link>
                <div className='flex ml-auto mt-auto'>
                    {
                        isAuth ? <FiEdit className="md:text-xl text-l" color="#0f172a" cursor={"pointer"} onClick={() => navigate(`/edit/${post.id}`)}/> : null
                    }
                    {
                        isAuth ? <FiTrash2 className="md:text-xl text-l" color="red" cursor={"pointer"} onClick={() => deletePost(post.id)} /> : null
                    }
                </div>
            </div>
        ))
       }
    </div>
  )
}

export default PostList