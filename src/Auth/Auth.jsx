import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthGuard = ({isAuthenticated, redirectPath='/login', children }) => {

  if(!isAuthenticated){
    return <Navigate to={redirectPath} replace />
  }else{
    return children? children: <Outlet/>
  }
}

export default AuthGuard