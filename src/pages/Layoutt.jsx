
import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebarr from '../components/Sidebarr'

const Layoutt = () => {
  return (
    <div>
      
        {/* <Sidebarr/>  */}
   
        <Outlet /> 
    </div>
  )
}

export default Layoutt
