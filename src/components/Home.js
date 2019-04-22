import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderBlocks() {

  }

  render() {
    return(
      <div className="homebackground">
     <div className="home-container kiwi">
        <h1 id="foodwise">foodwise</h1>
        {this.renderBlocks()}
        <br />
        <p id="subtitle">meal planning made easy</p>
        <div id="buttoncontainer">
        <a href="/personas"><button className="homebtn1">Curated Vibe</button></a>
        <a href="/survey"><button className="homebtn2">Customize</button></a>
        </div>
        <br />
        <br />
      </div>
      </div>
    )
  }
}

export default Home;