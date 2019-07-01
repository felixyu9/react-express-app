import React, { Component } from 'react'
import trollHead from "../img/troll_head.png"

class MemeGen extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       topText: '',
       bottomText: '',
       randomImage: "https://i.imgflip.com/1bij.jpg",
       allMemeImages: []
    }
  }

  componentDidMount(){
    fetch("https://api.imgflip.com/get_memes")
    .then(response => response.json())
    .then(response => {
        const {memes} = response.data
        this.setState({allMemeImages: memes})  
    })
    .catch(error =>{
      alert("Internet problem. If the problem persists, contact Felix.")
      console.log(error)
    })
  }

  handleTopTextChange = (event) =>{
    this.setState({
      topText: event.target.value
    })
  }

  handleBottomTextChange = (event) =>{
    this.setState({
      bottomText: event.target.value
    })
  }

  handleSubmit = (event) =>{
    event.preventDefault()
    const imgNum = this.state.allMemeImages.length;
    const index = Math.floor((Math.random() * imgNum));
    const nextImage = this.state.allMemeImages[index].url;
    this.setState({
      randomImage: nextImage
    })
  }
  
  render() {
    return (
      <div className="meme-content">
        <div className="meme-header">
            <img src={trollHead} alt={"troll head"} />
            <h1>Random Meme Generator</h1>
        </div>
        <div>
          <p>**Make a meme and reply it to the group email :)**</p>
        </div>
        <form onSubmit={this.handleSubmit}>
        <input className="meme-input-box" type="text" placeholder="Top Text" value={this.state.topText} onChange={this.handleTopTextChange}/>
        <input className="meme-input-box" type="text" placeholder="Bottom Text" value={this.state.bottomText} onChange={this.handleBottomTextChange}/>
        <button>Change Image</button>
        </form>
        <div className="meme">
          <img src={this.state.randomImage} alt="" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    )
  }
}

export default MemeGen
