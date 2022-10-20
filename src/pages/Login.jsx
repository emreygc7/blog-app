import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../config/firebase";
import { useNavigate } from 'react-router-dom'
import { useUser } from "../contexts/UserContext";
import Header from "../components/Header";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
 
    const { email, setEmail, password, setPassword, setIsAuth } = useUser()

    const auth = getAuth(app)
    const navigate = useNavigate()

    const formSubmit = async (e) => {
        e.preventDefault()
        try {
            const call = await signInWithEmailAndPassword(auth, email, password)
            const response = call.user; 
            localStorage.setItem("isAuth", true)
            setIsAuth(true)
            navigate("/")
        } catch (error) {
            if(error.message.includes("user-not-found")){
                toast.error("User not found. Please make sure you typed it correctly.")
            }else if(error.message.includes("wrong-password")){
                toast.error("Wrong password. Please try again.")
            }else if(error.message.includes("too-many-requests")){
                toast.error("You have entered the wrong password multiple times. Wait for a while to try again.")
            }
            console.log(error);
        }
    }

    return (
        <section className="bg-gray-50">
            <Header />
            <Toaster />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Login
                        </h1>
                        <p>mail: admin@gmail.com password: admin123</p>
                        <form className="space-y-4 md:space-y-6" onSubmit={formSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required onChange={e => setPassword(e.target.value)} />
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Login