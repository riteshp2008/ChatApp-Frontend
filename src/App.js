import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import SetAvatar from './pages/SetAvatar'
import Chat from './pages/Chat'
import Protected from './ProtectedRoutes'


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  
  const storedUser = sessionStorage.getItem("chat-app-user");

  React.useEffect(() => {
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }
  , [storedUser]);
  return (
    <BrowserRouter>
      <Routes>
       
            <>
              <Route path="/" element={isLoggedIn ? <Chat /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/setAvatar" element={<Protected isLoggedIn={isLoggedIn}><SetAvatar /></Protected>} />
              <Route path="/chat" element={<Protected isLoggedIn={isLoggedIn}><Chat /></Protected>} />
              <Route path="/register" element={<Register />} />
            </>
      </Routes>
       
    </BrowserRouter>
  )
}
