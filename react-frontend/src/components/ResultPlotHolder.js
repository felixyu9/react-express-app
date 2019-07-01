import React, { Component } from 'react'
import {Bar} from 'react-chartjs-2'
import axios from 'axios'

class ResultPlotHolder extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      currentVotes: [],
      currentVoteMap: {},
      votersMap: new Map(),
      xArray: [],
      yArray: [],
      chartData: {
        labels: [],
        datasets:[
          {
            label: 'Votes',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.6)'
          }
        ] 
      }
    }
  }

  componentDidMount(){
    const votesURL = ''
    axios.get(votesURL)
      .then(response => {
        this.setState({
          currentVotes: response.data
        })
      })
      .then(() =>{
        this.setState({
          currentVoteMap: this.createVoteMap(this.state.currentVotes),
          votersMap: this.createVotersMap(this.state.currentVotes)
        })
      })
      .then(() => {
        this.setState({
          xArray: this.getXArray(this.state.currentVoteMap),
          yArray: this.getYArray(this.state.currentVoteMap)
        })
      })
      .catch(error =>{
        alert("Internet problem. If the problem persists, contact Felix.")
        console.log(error)
      })
  }

  createVoteMap(voteList){
    let map = new Map()
    for(let i = 0; i < voteList.length; i++){
      if(!map.has(voteList[i].choiceVotes)){
        map.set(voteList[i].choiceVotes, 1)
      }else{
        map.set(voteList[i].choiceVotes, map.get(voteList[i].choiceVotes) + 1)
      }
    }
    return map
  }

  createVotersMap(voteList){
    let map = new Map()
    for(let i = 0; i < voteList.length; i++){
      if(!map.has(voteList[i].choiceVotes)){
        map.set(voteList[i].choiceVotes, voteList[i].voterVotes)
      }else{
        map.set(voteList[i].choiceVotes, map.get(voteList[i].choiceVotes) + ", " + voteList[i].voterVotes)
      }
    }

    return map
  }

  getXArray(map){
    let xArray = []
    for (const k of map.keys()){
      xArray.push(k)
    }
    return xArray
  }

  getYArray(map){
    let yArray = []
    for(const v of map.values()){
      yArray.push(v)
    }
    return yArray
  }
  
  render() {
    let myVotersMap = this.state.votersMap;
    return (
      <div className="bar-chart">
        <Bar 
          data={
            {
              labels: this.state.xArray,
              datasets: [
                {
                  label: 'Votes',
                  data: this.state.yArray,
                  backgroundColor: 'rgba(255, 99, 132, 0.6)'
                }
              ]
            }
          }
          width={600}
          height={400}
          options={{
            maintainAspectRatio: true,
            legend:{
              display: false
            },
            scales:{
              yAxes: [{
                display: true,
                scaleLabel:{
                  display: true,
                  labelString: 'Votes',
                  fontSize: 15,
                  fontColor: '#FFFFFF'
                },
                ticks: {
                    beginAtZero: true,
                    steps: 4,
                    stepValue: 2,
                    fontSize: 15,
                    fontColor: '#FFFFFF',
                    callback: (value) => {if (value % 1 === 0) {return value;}}
                }
            }],

            xAxes:[{
              ticks: {
                fontSize: 15,
                fontColor: '#FFFFFF'
              }
            }],
            },
            tooltips: {
              callbacks: {
                  label: function(tooltipItem) {
                      return "Votes: " + Number(tooltipItem.yLabel) + "  |  Voters: " + myVotersMap.get(tooltipItem.xLabel)
                  }
              }
          }
          }}
        />   
      </div>
    )
  }
}

export default ResultPlotHolder
