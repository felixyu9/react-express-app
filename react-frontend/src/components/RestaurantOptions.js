import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom';

class RestaurantOptions extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         choice: '',
         typeInChoice: ''
      }
    }

    handleChoiceChange = (event) => {
        this.setState({
          choice: event.target.value
        });
    }

    handleTextBoxChange = (event) => {
        this.setState({
            typeInChoice: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if(window.sessionStorage.getItem("isLoggedIn") === null){
          alert("Please log in to vote.")
        } else if(this.state.choice === ""){
          alert("Please select one of the choices!")
        } else if (this.state.choice === 'other' &&  this.state.typeInChoice.trim().length ===0){
          alert("You chose \"Other\" but did not type in you choice")
        } else{
          axios.post('', {email: window.sessionStorage.getItem("loginEmail")})
            .then((response) => {
              if(response.data){
                alert("Dude, you already voted this week.")
              }else{
                window.sessionStorage.setItem("isVoted", true);
                const userChoice = this.state.choice === 'other' ? this.state.typeInChoice.trim() : this.state.choice
                axios.post('', {theVoter: window.sessionStorage.getItem("savedUsername").trim(), theEmail: window.sessionStorage.getItem("loginEmail").toLocaleLowerCase().trim(), theChoice: userChoice})
                  .then((response) =>{
                    if(window.sessionStorage.getItem("isVoted")){
                      this.props.history.push('/voted')
                      window.sessionStorage.removeItem('isVoted');
                    }
                  })
                  .catch(error =>{
                    alert("Internet problem. If the problem persists, contact Felix.")
                    console.log(error)
                  }) 
              }           
            })
            .catch(error =>{
              alert("Internet problem. If the problem persists, contact Felix.")
              console.log(error)
            })
        }
      }

  render() {
      let restaurantChoices = [
          {
            id: 1,
            name: "Myron Mixon's"
          },
          {
            id: 2,
            name: "Mai Thai"
          },
          {
            id: 3,
            name: "Nando's Peri Peri"
          },
          {
            id: 4,
            name: "Virtue"
          },
          {
            id: 5,
            name: "Union Street"
          },
          {
            id: 6,
            name: "Pizzeria Paradiso"
          },
          {
            id: 7,
            name: "Mia's Italian Kitchen"
          },
          {
            id: 8,
            name: "Indian Buffet $10.99"
          },
          {
            id: 9,
            name: "Chadwicks"
          },
          {
            id: 10,
            name: "Bilbo Baggins"
          },
          {
            id: 11,
            name: "Kisso Asian Bistro"
          }
        ]

        let restaurantList = restaurantChoices.map(restaurant =>
            <li key= {restaurant.id}>
            <label>
              <input
                className = "radio-buttons"
                type="radio"
                value= {restaurant.name}
                checked={this.state.choice === restaurant.name}
                onChange={this.handleChoiceChange}
              />
              {restaurant.name}
            </label>
          </li>
            )

    return (
      <div className="restaurant-choices">
        <form onSubmit={this.handleSubmit}>
            <h2>Where do you want to go for lunch this Friday?</h2>
            <ul>
                {restaurantList}
            <li>
            <label>
              <input
                className = "radio-buttons"
                type="radio"
                value= "other"
                checked={this.state.choice === "other"}
                onChange={this.handleChoiceChange}
              />
              Other:
            </label><input className="other-input-box" type="text" placeholder="Type in Your Choice" value={this.state.typeInChoice} onChange={this.handleTextBoxChange}/>
          </li>
            </ul>
            
            <button type="submit">Submit Vote</button>
            
        </form> 
        
      </div>
    )
  }
}

export default withRouter(RestaurantOptions)
