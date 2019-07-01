import React, { Component } from 'react'
import axios from 'axios'

class HelpPage extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       isSubmitted: false,
       emailAddress: '',
       token: '',
       password: '',
       repeatPassword: '',
       passwordIsReset: false
    }
  }

  handleEmailAddressChange = (event) => {
    this.setState({emailAddress: event.target.value})
  }

  handleTokenChange = (event) =>{
    this.setState({token: event.target.value})
  }

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  handleRepeatPasswordChange = (event) => {
    this.setState({repeatPassword: event.target.value})
  }

  

  handleEmailEnterSubmit = (event) => {
    event.preventDefault();

    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(this.state.emailAddress.trim() === ''){
      alert("Please enter a MPR email address")
    }else if(!re.test(this.state.emailAddress.trim())){
      alert("Please enter a valid email address")
    } else if(!this.state.emailAddress.toLowerCase().includes('mpr')){
      alert("Please use your MPR email")
    } else{
      axios.post('', this.state)
      .then(response =>{
        if(response.data === "notFound"){
          alert("The email you entered is not registered. Please click \"Sign Up\" to create an accoutn.")
        }else{
          this.setState({
            isSubmitted: true
          })
        }
      })
      .catch(error =>{
        alert("Internet problem. If the problem persists, contact Felix.")
        console.log(error)
      })
    }
  }

  handlePasswordResetSubmit = (event) =>{
    event.preventDefault();

    if(this.state.token.trim() === ''){
      alert("Please Enter a token number.")
    }else if(this.state.token.trim().length !== 6){
      alert("The token should be a 6-digit number.")
    }else if(this.state.password.trim() === ''){
      alert("Please enter a non-empty password")
    }else if(this.state.password !== this.state.repeatPassword){
      alert("The passwords entered do not match. Please try again.")
    }else{
      axios.post('', this.state)
      .then(response => {
        if(response.data === "matched"){
          axios.post('', this.state)
          .then(response => {
            if(response.data === "done"){
              this.setState({
                passwordIsReset: true
              })
            }
          })
          .catch(error =>{
            alert("Internet problem. If the problem persists, contact Felix.")
            console.log(error)
          })
        }else{
          alert("The token entered is incorrect. Try again or contact Felix.")
        }
      })
      .catch(error =>{
        alert("Internet problem. If the problem persists, contact Felix.")
        console.log(error)
      })
    }
  }

  render() {
    let bg=require('../img/sign_up_background.png')
    let myContent = (
      <div className="signup-page-content" >
      <form onSubmit={this.handleEmailEnterSubmit} >
          <h1>Enter your Email to Reset Your Password</h1>
          <div>
              <input className="signup-input-box" type="text" placeholder="Email Address" value={this.state.emailAddress} onChange={this.handleEmailAddressChange}/>
          </div>
          <div>
                <button className="sign-up-button" type="submit">Submit</button>
          </div>
      </form>
      <div>
        <p>{this.state.signupMessage}</p>
      </div>
      </div>
    )

    if(this.state.isSubmitted){
      myContent = (
        <div className="signup-page-content" >
      <form onSubmit={this.handlePasswordResetSubmit} >
          <h1>A security token was sent to your email. Please enter this token to proceed.</h1>
          <div>
              <input className="signup-input-box" type="text" placeholder="Security Token" value={this.state.token} onChange={this.handleTokenChange}/>
          </div>
          <div>
              <input className="signup-input-box" type="password" placeholder="New Password" value={this.state.password} onChange={this.handlePasswordChange}/>
          </div>
          <div>
              <input className="signup-input-box" type="password" placeholder="Repeat New Password" value={this.state.repeatPassword} onChange={this.handleRepeatPasswordChange}/>
          </div>
          <div>
                <button className="sign-up-button" type="submit">Reset</button>
          </div>
      </form>
      </div>
      )

      if(this.state.passwordIsReset){
        myContent = (
        <div className="signup-page-content" >
          <h1>Your password has been reset</h1>
        </div>
        )
      }
    }


    
    return (
      <div className = "signup-background" style ={ { backgroundImage: "url("+bg+")", backgroundSize: 'cover',overflow: 'hidden', } }>
      {myContent}
      </div>
    )
  }
}

export default HelpPage
