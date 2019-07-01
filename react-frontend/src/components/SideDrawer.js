import React from 'react'
import './header.css'
import {Link} from 'react-router-dom'

function SideDrawer(props) {
    let drawerClasses = 'side-drawer'
    if(props.show){
        drawerClasses = 'side-drawer open'
    }
  return (
    <nav className={drawerClasses}>
        <ul>
            <li><h2>MPR Lunch Group</h2></li>
            <li><Link to="/home" onClick={props.clicked}>Home</Link></li>
            <li><Link to="/about" onClick={props.clicked}>About</Link></li>
            <li><Link to="/meme-gen" onClick={props.clicked}>MemeGen</Link></li>
            <li><Link to="/vote" onClick={props.clicked}>Vote</Link></li>
            <li>______________</li>
            <li><Link to="/login" onClick={props.clicked}>Login</Link></li>
            <li><Link to="signup" onClick={props.clicked}>Sign Up</Link></li>
            <li><Link to="help" onClick={props.clicked}>Help</Link></li>
        </ul>
    </nav>
  )
}

export default SideDrawer
