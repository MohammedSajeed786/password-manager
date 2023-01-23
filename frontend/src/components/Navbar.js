import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { hover } from "@testing-library/user-event/dist/hover";
import "./navbar.css";
export default function Navbar() {
  const location = useLocation();
  let navigate = useNavigate();
  useEffect(() => {
    //  //console.log(location.pathname);
  }, [location]);
  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
  };
  return (
    // localStorage.getItem("token") ===null?<></>:
    // <div>{
    //   <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    //     <div className="container-fluid">
    //       <Link className="navbar-brand" to="#">
    //         Password-Manager
    //       </Link>
    //       <button
    //         className="navbar-toggler"
    //         type="button"
    //         data-bs-toggle="collapse"
    //         data-bs-target="#navbarSupportedContent"
    //         aria-controls="navbarSupportedContent"
    //         aria-expanded="false"
    //         aria-label="Toggle navigation"
    //       >
    //         <span className="navbar-toggler-icon"></span>
    //       </button>
    //       <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //           <li className="nav-item">
    //             <Link
    //               className={`nav-link ${
    //                 location.pathname === "/" ? "active" : ""
    //               }`}
    //               aria-current="page"
    //               to="/"

    //             >
    //               Home
    //             </Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link
    //               className={`nav-link ${
    //                 location.pathname === "/about" ? "active" : ""
    //               }`}
    //               to="/about"
    //             >
    //               About
    //             </Link>
    //           </li>
    //         </ul>

    //         {localStorage.getItem("token") ===null? (
    //           <>
    //             <Link
    //               className="btn btn-primary mx-2"
    //               to="/login"
    //               role="button"
    //             >
    //               Login
    //             </Link>
    //             <Link
    //               className="btn btn-primary mx-2"
    //               to="/signup"
    //               role="button"
    //             >
    //               Sign up
    //             </Link>
    //           </>
    //         ) : (
    //           <button className="btn btn-primary" onClick={logout}>
    //             Logout
    //           </button>
    //         )}
    //       </div>
    //     </div>
    //   </nav>}
    // </div>






    localStorage.getItem("token") === null ? (
      <></>
    ) : (
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="title navbar-brand">Password Manager</div>
         
        
           <ul  className="navbar-nav me-auto mb-2 mb-lg-0"> 
            <li  className="nav-item">
              <Link
                to="/"
                className={`routes ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li  className="nav-item">
              <Link
                to="/about"
                className={`routes ${
                  location.pathname === "/about" ? "active" : ""
                }`}
              >
                
                About
              </Link>
            </li>
          </ul>
           
          <button className="logout" onClick={logout}>
            logout
          </button>
          
          </div>
       </nav>
    )
  );
 }
