import { Sidebar } from 'lucide-react'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      
        <Sidebar/> 
   
        <Outlet /> 
    </div>
  )
}

export default Layout
