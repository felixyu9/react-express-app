import React, { Component } from 'react'
import axios from 'axios'

class SignUpPage extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       username: '',
       emailAddress: '',
       password: '',
       repeatPassword: '',
       token: '',
       signupStatus: 'preConfirmed'
    }
  }

  handleUsernameChange = (event)=>{
    this.setState({username: event.target.value})
  }

  handleEmailAddressChange = (event) => {
    this.setState({emailAddress: event.target.value})
  }

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  handleRepeatPasswordChange = (event) => {
    this.setState({repeatPassword: event.target.value})
  }

  handleTokenChange = (event) => {
    this.setState({token: event.target.value})
  }
  

  hangleContinue = (event) => {
    event.preventDefault();

    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(this.state.username.trim() === ''){
      alert("Please enter a valid username")
    }else if(this.state.username.trim().length > 20){
      alert("Username is too long. Max length is 20.")
    }else if(this.state.emailAddress.trim() === ''){
      alert("Please enter a MPR email address")
    }else if(!re.test(this.state.emailAddress.trim())){
      alert("Please enter a valid email address")
    } else if(!this.state.emailAddress.toLowerCase().includes('mpr')){
      alert("Please use your MPR email to create an account")
    } else if(this.state.password.trim() === ''){
      alert("Please enter a non-empty password")
    }else if(this.state.password !== this.state.repeatPassword){
      alert("The passwords entered do not match. Please try again.")
    }else{
      axios.post('', this.state)
      .then(response => {
        if(response.data === "message0"){
          alert("Internet connection problem. Try again later.")
        }else if(response.data === "message1"){
          alert("The email entered is not in the lunch group database. Please contact Alec to add it.")
        }else if(response.data === "message2"){
          alert("The username entered was already taken by someone else")
        }else if(response.data === "message3"){
          alert("The email entered is already associated with an existing account.")
        }else{
          this.setState({
            signupStatus: 'toEnterToken'
          })
        }
      })
      .catch(error =>{
        alert("Internet problem. If the problem persists, contact Felix.")
        console.log(error)
      }) 
    }
  }

  hangleConfirm = (event) =>{
    event.preventDefault();
    if(this.state.token.trim().length !== 6){
      alert("The security code should be a 6-digit number.")
    }else{
      axios.post('', this.state)
      .then(response => {
        if(response.data === 'message0'){
          alert("Internet connection problem. Try again later.")
        }else if(response.data === 'message1'){
          alert("The security code entered is not correct. Try again.")
        }else{
          this.setState({
            signupStatus: 'confirmed'
          })
        }
      })
    }

  }

  render() {
    let bg=require('../img/sign_up_background.png')

    let signUpPageContent =(
      <div className="signup-page-content" >
      <form onSubmit={this.hangleContinue} >
          <h1>Sign up Form</h1>
          <div>
              <input className="signup-input-box" type="text" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange}/>
          </div>
          <div>
              <input className="signup-input-box" type="text" placeholder="Email Address" value={this.state.emailAddress} onChange={this.handleEmailAddressChange}/>
          </div>
          <div>
              <input className="signup-input-box" type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
          </div>
          <div>
              <input className="signup-input-box" type="password" placeholder="Repeat Password" value={this.state.repeatPassword} onChange={this.handleRepeatPasswordChange}/>
          </div>
          <div>
                <button className="sign-up-button" type="submit">Continue</button>
          </div>
      </form>
      </div>
    )

    if(this.state.signupStatus === 'toEnterToken'){
      signUpPageContent = (
        <div className="signup-page-content">
        <form onSubmit={this.hangleConfirm} >
          <h1>Sign up Form</h1>
          <h2>A security code was sent to {this.state.emailAddress.toLowerCase().trim()}. Please enter the code to proceed.</h2>
          <div>
              <input className="signup-input-box" type="text" placeholder="Security Code" value={this.state.token} onChange={this.handleTokenChange}/>
          </div>
          <div>
                <button className="sign-up-button" type="submit">Confirm</button>
          </div>
      </form>
      </div>
      )
    }

    if(this.state.signupStatus === 'confirmed'){
      signUpPageContent = (
      <div className="signup-page-content">
         <h1>Sign up Form</h1>
         <h2>A new user, {this.state.username}, was created. Please log in to vote.</h2>
      </div>
      
      )
    }
    
    return (
      <div className = "signup-background" style ={ { backgroundImage: "url("+bg+")", backgroundSize: 'cover',overflow: 'hidden', } }>
        {signUpPageContent}
      </div>
    )
  }
}

export default SignUpPage
