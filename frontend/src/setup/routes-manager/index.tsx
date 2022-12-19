import { FC, useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom'

import Dashboard from '@/pages/dashboard';
import Main from '@/pages/main'
import SignIn from '@/pages/sign-in';

import { ProtectedRoutes } from './protectedRoute';
import NotFound from '@/pages/notfound';

import { AuthContext } from '../context-manager/authContext';
import { AuthContextType } from '../context-manager/model';

export const Views: FC = () => {
  const { setAccToken } = useContext(AuthContext) as AuthContextType;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch('http://localhost:4000/refresh_token', {
      method: "POST",
      credentials: "include"
    }).then(async res => {
      const { accessToken } = await res.json();
      if(accessToken){
        setAccToken();
      }
      console.log("app: ", accessToken);
    })
    setLoading(false);
  }, [])

  if(loading) return <div>loading...</div>

  return (

    <Routes>
      <Route path='/signin' element={<SignIn />} />
      <Route element={<ProtectedRoutes />}>
        <Route path='/' element={<Main />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
