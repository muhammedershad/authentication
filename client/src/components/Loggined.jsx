import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const Loggined = () => {
    const user = useSelector((state) => state.user.user)
  return !user ? <Outlet /> : <Navigate to='/' /> 
}

export default Loggined