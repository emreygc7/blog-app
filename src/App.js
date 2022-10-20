import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { useUser } from "./contexts/UserContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import SinglePost from "./pages/SinglePost";
import EditPost from './pages/EditPost'

const App = () => {

  const { isAuth } = useUser()
  
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!isAuth ? <Login /> : <Navigate to={"/"}/>} />
        <Route path="/create" element={!isAuth ? <Navigate to={"/"} /> : <CreatePost />} /> 
        <Route path="/post/:id" element={<SinglePost />} /> 
        <Route path="/edit/:id" element={!isAuth ? <Navigate to={"/"} /> : <EditPost />} />
        <Route path="/*" element={<h1>not found</h1>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


