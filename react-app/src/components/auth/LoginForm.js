import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';

import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(credential, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateCredential = (e) => {
    setCredential(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onLogin}>
      {+errors > 0  && <div>
        {errors.map((error, ind) => (
          <div className='error' key={ind}>{error}</div>
        ))}
      </div>}
      <div className='input-field'>
        <label htmlFor='credential'>Credential</label>
        <input
          name='credential'
          type='text'
          placeholder='Username/Email'
          value={credential}
          onChange={updateCredential}
        />
      </div>
      <div className='input-field'>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
      </div>
      <button type='submit'>Login</button>
      <button onClick={async ()=> {
        const response = await dispatch(login('Demo', 'password'));
        if (response.ok) {
          history.push('/');
        };
      }}>Log in as Demo User</button>
    </form>
  );
};

export default LoginForm;
