
import React, { Component } from 'react'
import './header.css'
import myLogo from "../img/logo.png"
import DrawerToggleButton from './DrawerToggleButton';
import {
  Link
} from 'react-router-dom'
import axios from 'axios'


class Header extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      usernameOrEmail: '',
      password: '',
      username: '',
      loginSwitch: false
    }
  }

  handleUsernameChange = (event)=>{
    this.setState({usernameOrEmail: event.target.value})
  }

  handlePasswordChange = (event)=>{
    this.setState({password: event.target.value})
  }

  handleSubmit = (event) =>{
    event.preventDefault()
    if(this.state.usernameOrEmail.trim() === ''){
      alert("Please enter a valid username/email.")
    }else if(this.state.password.trim() === ''){
      alert("Please enter your password.")
    }else{
      axios.post('', this.state)
        .then(response => {
          if(response.data === "message1"){
            alert("the username/email entered is not registered")
          }else if(response.data === "message3"){
            alert("Incorrect password. Try again.")
          }else{
            window.sessionStorage.setItem("isLoggedIn", true);
            window.sessionStorage.setItem("savedUsername", response.data.usernameshownUsers)
            window.sessionStorage.setItem("loginEmail", response.data.emailUsers)
            this.setState({
              loginSwitch: true
            })
          }
        })
        .catch(error =>{
          alert("Internet problem. If the problem persists, contact Felix.")
          console.log(error)
        }) 
    }
  }

  handleLogout = () =>{
    window.sessionStorage.clear();
    this.setState((prevState) => {
      return {loginSwitch: !prevState.loginSwitch};
    })
  }
  

  render() {
    let headerRightStuff = (
    <div className="toolbar__navigation-items-2">
    <ul>
      <form>
        <input className="input-box" type="text" placeholder="Username/Email" value={this.state.usernameOrEmail} onChange={this.handleUsernameChange}/>
        <input className="input-box" type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
        <button onClick={this.handleSubmit}>Login</button>
      </form>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/help">Help</Link></li>
    </ul>
    </div>)
    
    if(window.sessionStorage.getItem("isLoggedIn")){
      headerRightStuff = (
      <div className="toolbar__navigation-items-2">
        <ul>
          <p>Welcome {window.sessionStorage.getItem("savedUsername")}!</p>
        <button onClick={this.handleLogout}>Logout</button>
        </ul>
      </div>)

    }
    return (
    <header className="toolbar">
        <nav className="toolbar__navigation">
            <div className="toolbar__toggle-button">
              <DrawerToggleButton clicked={this.props.toggleButtonIsClicked}/>
            </div>
            {/* <div className="toolbar__logo"><Link to="/">MyLOGO</Link></div> */}
            <div className="toolbar__logo"><Link to="/"><img src={myLogo} alt={"myLogo"}></img></Link></div>
           
            <div className="toolbar__navigation-items">
                <ul>
                    <li><Link to="/home" >Home</Link></li>
                    <li><Link to="/about" onClick={this.props.clicked}>About</Link></li>
                    <li><Link to="/meme-gen">MemeGen</Link></li>
                    <li><Link to="/vote">Vote</Link></li>
                </ul>
            </div>
            <div className="spacer" />
            {headerRightStuff}
              
        </nav>
    </header>
    )
  }
}

export default Header