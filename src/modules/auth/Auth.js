import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authStart, logoutStart } from './Auth.actions';

const Auth = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const authenticate = () => {
    const data = { email, password, isRegister };
    dispatch(authStart(data));
  };

  return (
    <div>
      <button onClick={() => setIsRegister((p) => !p)}>
        Switch to {isRegister ? 'Login' : 'Register'}
      </button>
      <input
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder='Password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={authenticate}>
        {isRegister ? 'Register' : 'Login'}
      </button>
      <button onClick={() => dispatch(logoutStart())}>Logout</button>
    </div>
  );
};

export default Auth;
