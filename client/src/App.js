import React, { useEffect, useState, useRef } from 'react';
import socketIOClient from 'socket.io-client';

import LoginForm from './components/LoginForm';
import {
  USER_CONNECTED,
  USER_DISCONNECTED,
  LOGOUT,
  USER_ACTION,
} from './Events';
import ChatContainer from './components/ChatContainer';

const SERVER_URL = 'http://127.0.0.1:4001';
const SOCKET_IO_ENDPOINT = `${SERVER_URL}/jeurigolo`;

function AppContainer() {
  const [socket, setSocket] = useState(null);

  function initSocketIo() {
    const socketIo = socketIOClient(SOCKET_IO_ENDPOINT);
    setSocket(socketIo);
  }

  useEffect(() => {
    initSocketIo();
  }, []);

  return socket ? <App socket={socket} /> : 'chargement...';
}

function App({ socket }) {
  const [user, setUser] = useState(null);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    console.log('🔥 init SocketIo connection');
    socket.on(USER_CONNECTED, (userList) => {
      console.log('userList', userList);
      setUserList(userList);
    });
    socket.on(USER_ACTION, (userList) => {
      setUserList(userList);
    });
    socket.on(USER_DISCONNECTED, (userList) => {
      console.log('disconnet', userList);
      setUserList(userList);
    });
  }, []);

  function setNewUser(newUser) {
    console.log('🔥 setNewUser', newUser);
    socket.emit(USER_CONNECTED, newUser);
    setUser(newUser);
  }

  function logout() {
    console.log('🔥 logout');

    socket.emit(LOGOUT);
    setUser(null);
  }
  function handleClick(e) {
    const action = e.target.name;

    socket.emit(USER_ACTION, { action, user });
    console.log('e.target.name', { action, ...user });
  }

  return (
    <div style={appStyles}>
      {!user ? (
        <LoginForm socket={socket} setNewUser={setNewUser} />
      ) : (
        <ChatContainer
          socket={socket}
          user={user}
          userList={userList}
          logout={logout}
          handleClick={handleClick}
        />
      )}
    </div>
  );
}

const appStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor: 'slategrey',
  color: 'white',
};
export default AppContainer;
