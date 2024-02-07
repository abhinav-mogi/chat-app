import React from 'react'
import Navibar from './NavBar/Navibar'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div>
      <div className="content-container">
         <Navibar/>
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default RootLayout