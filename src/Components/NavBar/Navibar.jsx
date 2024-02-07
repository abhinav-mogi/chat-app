import React,{useEffect, useState} from 'react'
import { NavLink, useNavigate } from "react-router-dom";

function Navibar() {
  const navigate=useNavigate();
  let [token,setToken]=useState(null)
  useEffect(()=>{
    const tokenn=localStorage.getItem("token");
    setToken(tokenn);
  },)
  const logoutUser=()=>{
    localStorage.clear();
    navigate('/Home')
  }
    
  return (
    <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <h1>Chat App</h1>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/"
              >
                Home
              </NavLink>
            </li>
            {token==null?( <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/register"
              >
                Register
              </NavLink>
            </li>):(
              <div></div>
            )}

            {token==null ? (<div>
              
             
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
    
              </div>
            ) : (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/login"
                  onClick={logoutUser}
                >
                  Logout
                </NavLink>
              </li>
            )}

            
          </ul>
        </div>
      </div>
    </nav>
    </div>
  )
}

export default Navibar