import React, { useState } from 'react';

function ChatContainer({ handleClick, user, logout, userList }) {
  // function sendMessage()
  return (
    <div>
      <h1>salut {user.name} !</h1>
      {Object.keys(userList).map((key) => {
        return userList[key].id !== user.id ? (
          <div key={userList[key].id}>
            {userList[key].name} ||{' '}
            {userList[key].action &&
              `${userList[key].name} a cliqué sur ${userList[key].action}`}
          </div>
        ) : null;
      })}
      <button name="click" onClick={handleClick}>
        click
      </button>
      <button name="clack" onClick={handleClick}>
        clack
      </button>
      <button onClick={logout}>Se déconnecter</button>
    </div>
  );
}

export default ChatContainer;
