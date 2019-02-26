import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return(
      <div className="home-container">
        <h1>Welcome to Mealplanner!</h1>
        <p>Take it away, Zakk</p>
        <p>Love, Ben & Mimi 💖</p>

        <br/>
        <a href="/recipe-page">Check out the recipe page</a>
      </div>
    )
  }
}

export default Home;