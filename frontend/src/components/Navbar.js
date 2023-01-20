import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
        <Link className="navbar-brand" to="/">BookMarks</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
            </li>           
            </ul>
        </div>
    </div>
    </nav>
  )
}

export default Navbar
