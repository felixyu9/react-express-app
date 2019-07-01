import React, { Component } from 'react'
import ResultPlotHolder from './ResultPlotHolder';

class VotedPage extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       voteSubmitSwitch: false
    }
  }

  voteClickHandler = () =>{
    this.forceUpdate();
    this.setState((prevState) => {
      console.log(this.state.voteSubmitSwitch)
      return {voteSubmitSwitch: !prevState.voteSubmitSwitch}
    })
  }
  


  render() {
    return (
      <div className="vote-page-wraper">
      <div className="vote-content">
            <h1>MPR Lunch Group Voting System</h1>
            
            <div className="right-content">
              <h2>Current Voting Results:</h2>
              <ResultPlotHolder parentStateUpdated ={this.voteSubmitSwitch}/>
            </div>
            <div className="left-content">
              <h2>Where do you want to go for lunch this Friday?</h2>
              <p>Your vote has been recorded.<br/>Thank you for voting!</p>
            </div>
      </div>
       </div>
    )
  }
}

export default VotedPage
