import {createContext, useContext, useState} from 'react'

const userContext = createContext()

const UserContextProvider = ({ children }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") || false)

    const userContextData = {
        email,
        setEmail,
        password,
        setPassword,
        isAuth,
        setIsAuth
    }

  return (
    <userContext.Provider value={userContextData}>
        {children}
    </userContext.Provider>
  )
}

export const useUser = () => {
    const context = useContext(userContext)
    return context
}

export default UserContextProvider