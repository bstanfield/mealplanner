import React, { Component } from 'react';

class Surprise extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return(
      <div className="home-container">
        <h1>Welcome to your surprise!</h1>
        <p>Take it away, y'all</p>
        <p>Love, Ben & Mimi 💖</p>
        <p>{ this.state.itp }</p>

        <br/>
        <a href="/survey">Survey page</a><br />
        <a href="/personas">Personas page</a><br />
        <a href="/recipe-page">Check out the recipe details page</a>
      </div>
    )
  }
}

export default Surprise;