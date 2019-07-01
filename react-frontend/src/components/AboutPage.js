import React from 'react'
import ParticleComponent from './ParticleComponent';


function AboutPage() {
  return (
    <div>
      <ParticleComponent />
      <div className="home-and-about-content">
          <h1>About</h1>
          <p>This website is for the weekly MPR group lunch voting. 
            Participants need to log into the system to vote for where 
            they want to go for lunch on Friday. If you do not have an account already,
            please click "Sign Up" on the upper right corner to create one with your MPR email.
            An automatic email will be sent to participants at 9:30 AM every Tuesday as a reminder. 
            The result email will be sent to participants at 10:00 AM on Fridays to inform the resturant 
            choice of the week and remind everyone to meet at the bricks at noon.</p>
          <p>Log in to vote now, Quick!!!</p>
      </div>
    </div>
  )
}

export default AboutPage