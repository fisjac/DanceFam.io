import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const passwordsMatch = password === repeatPassword

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div className='errors'>
        {errors.map((error, ind) => (
          <div className='error' key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>First Name *</label>
        <input
          type='text'
          name='firstName'
          onChange={updateFirstName}
          value={firstName}
          required
        ></input>
      </div>
      <div>
        <label>Last Name *</label>
        <input
          type='text'
          name='lastName'
          onChange={updateLastName}
          value={lastName}
          required
        ></input>
      </div>
      <div>
        <label>User Name*</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          required
        ></input>
      </div>
      <div>
        <label>Email *</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          required
        ></input>
      </div>
      <div>
        <label>Password *</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          required
        ></input>
      </div>
      <div>
        <label>Confirm Password *</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required
        ></input>
      </div>
      <button type='submit' disabled={!passwordsMatch} className={`${passwordsMatch?'':'disabled'}`}>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
