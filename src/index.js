import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserContextProvider from './contexts/UserContext';
import PostContextProvider from './contexts/PostContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PostContextProvider>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </PostContextProvider>
);


