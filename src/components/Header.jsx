import { Link } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'

const Header = () => {

    const { isAuth, setIsAuth } = useUser()

    const userOut = async () => {
        try {
            await signOut(auth)
            localStorage.clear()
            setIsAuth(false)
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <header className=' shadow p-5 font-bold flex justify-between items-center w-full md:w-3/4 m-auto'>
        <Link to="/" className='font-body text-sm md:text-base'>BLOG DEMO</Link>
        <ul>
            <nav className='flex justify-center items-center gap-4'>
                {!isAuth ? null : <Link to={"/create"} className="md:text-base text-sm">Create Post</Link> }
                {!isAuth ? <Link to={"/login"} className="font-extralight md:text-base text-sm">Login</Link> : 
                            <Link to={"/"} onClick={userOut} className="font-extralight md:text-base text-sm">Logout</Link>} 
            </nav>
        </ul>
    </header>
  )
}

export default Header