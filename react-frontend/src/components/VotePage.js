import React, { Component } from 'react'
import RestaurantOptions from './RestaurantOptions';
import ResultPlotHolder from './ResultPlotHolder';
import axios from 'axios'

class VotePage extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       thisWeekHasVotes: false
    }
  }

  componentDidMount(){
    const checkVotesURL = ''
      axios.post(checkVotesURL)
        .then((response) =>{
          if(response.data === true){
            this.setState({
              thisWeekHasVotes: true
            })
          }
        })
        .catch(error =>{
          alert("Internet problem. If the problem persists, contact Felix.")
          console.log(error)
        }) 
  }
  

  render() {
    let plotHeader = <h2>Current Voting Result:</h2>
    if(!this.state.thisWeekHasVotes){
      plotHeader = <h2>Last Week's Result</h2>
    }
    return (
      <div className="vote-page-wraper">
      <div className="vote-content">
            <h1>MPR Lunch Group Voting System</h1>
            
            <div className="right-content">
              {plotHeader}
              <ResultPlotHolder />
            </div>
            <div className="left-content">
              <RestaurantOptions />
            </div>
      </div>
       </div>
    )
  }
}

export default VotePage
