import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

export default function Chat() {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const fetchDataAndConnectSocket = async () => {
      try {
        const storedUser = localStorage.getItem("chat-app-user");
        if (!storedUser) {
          navigate("/login");
          return;
        }

        const user = JSON.parse(storedUser);
        setCurrentUser(user);

        if (!user.isAvatarImageSet) {
          navigate("/setAvatar");
          return;
        }

        socket.current = io(host);
        socket.current.emit("add-user", user._id);

        const { data } = await axios.get(`${allUsersRoute}/${user._id}`);
        setContacts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error or navigate to an error page
        navigate("/errorPage");
      }
    };

    fetchDataAndConnectSocket();
  }, [navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  function detectMob() {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }
  
  useEffect(() => {
    if (detectMob()) {
      setSidebar(true);
    }
  }, []);

  return (
    <>
      <Container>
        <div className="container">
          {sidebar ? (
            <span
            onClick={() => setSidebar(!sidebar)}
            >👨‍💻</span>
          ) : (
            <Contacts contacts={contacts} changeChat={handleChatChange} />
          )}

          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
    @media screen and (max-width: 600px) {
      grid-template-columns: 100%;
    }
  }
`;
