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
        <p>Take it away, y'all</p>
        <p>Love, Ben & Mimi 💖</p>

        <br/>
        <a href="/survey">Survey page</a><br />
        <a href="/personas">Personas page</a><br />
        <a href="/recipe-page">Check out the recipe details page</a>
      </div>
    )
  }
}

export default Home;