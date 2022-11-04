import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = props => {
  console.log('in protected route')
  const user = useSelector(state => state.session.user)
  console.log('user is:', user)
  return (
    <Route {...props}>
      {(user)? props.children  : <Redirect to='/welcome' />}
    </Route>
  )
};


export default ProtectedRoute;
