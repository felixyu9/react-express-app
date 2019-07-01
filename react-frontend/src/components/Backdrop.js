import React from 'react'
import './header.css'

function Backdrop(props) {
  return (
    <div className="backdrop" onClick={props.clicked}/>
  )
}

export default Backdrop
