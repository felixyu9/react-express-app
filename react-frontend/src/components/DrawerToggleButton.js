import React from 'react'
import './header.css'

const DrawerToggleButton = props => (
    <button className="toggle-button" onClick={props.clicked}>
        <div className="toggle-button__line" />
        <div className="toggle-button__line" />
        <div className="toggle-button__line" />
    </button>
)

export default DrawerToggleButton