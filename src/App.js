import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import SetAvatar from './pages/SetAvatar'
import Chat from './pages/Chat'
import Protected from './ProtectedRoutes'


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  
  const storedUser = localStorage.getItem("chat-app-user");

  React.useEffect(() => {
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }
  , []);
  return (
    <BrowserRouter>
      <Routes>
       
            <>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login  />} />
            <Route path="/setAvatar" element={<SetAvatar />} />
            {/* <Protected isLoggedIn={isLoggedIn}> */}
              <Route path="/chat" element={<Chat />} />
            {/* </Protected> */}
            </>
      </Routes>
       
    </BrowserRouter>
  )
}
