import React, { useState } from 'react';
import { VERIFY_USER } from '../Events';

function LoginForm({ socket, setNewUser }) {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);

  function setUser({ user, isUser }) {
    if (isUser) {
      return setError("Nom d'utilisateur deja pris");
    }
    setError(null);
    setNewUser(user);
  }

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    console.log('🔥 Submit user');
    e.preventDefault();
    socket.emit(VERIFY_USER, name, setUser);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Nom :</label>
      <input type="text" name="name" value={name} onChange={handleChange} />
      <p>{error}</p>
    </form>
  );
}

export default LoginForm;
