import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { usePost } from '../contexts/PostContext'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import Header from '../components/Header'
import parse from 'html-react-parser';
import LoadingIcons from 'react-loading-icons'
import { BiTimeFive, BiPen } from 'react-icons/bi'


const SinglePost = () => {

    const { id } = useParams()
    const { singlePost, setSinglePost } = usePost()

    const getSinglePost = async () => {
        const docRef = doc(db, "posts", id) 
        const snapshot = await getDoc(docRef)
        setSinglePost(snapshot.data())
    }

    useEffect(() => {
        getSinglePost()
    },[id])
  
  return (
    <>
        <Header />
        <div className='flex justify-center'>
            {
                singlePost ? (
                    <div className='w-full border-l border-r flex flex-col p-8 items-center gap-6  md:w-3/4'>
                        <img src={singlePost.imgURL} alt="postimage" className='w-1/2 self-center rounded-md' />
                        <b className='text-base md:text-3xl text-center'>{singlePost.title}</b> 
                        <div className='flex ml-auto items-center justify-center gap-1 opacity-60 '>
                            <BiTimeFive /> 
                            <p>{new Date(singlePost.timestamp?.seconds * 1000).toString().substring(0,21)} </p>
                            <BiPen/>
                            <p>admin</p>
                        </div>
                        <div className='flex flex-col  gap-5  md:w-3/4 max-w-full overflow-auto break-all'>
                            {parse(singlePost.content)}
                        </div>
                    </div>
                ) : (<LoadingIcons.TailSpin stroke='#000' fill='blue' className='mt-10' />)
            }
        </div>
    </>

  )
}

export default SinglePost