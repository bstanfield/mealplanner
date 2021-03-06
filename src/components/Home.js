import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import '../index.scss';

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
      <div id="home-background">
        <div className="home-container">
          <h1 id="foodwise">foodwise</h1>
          {this.renderBlocks()}
          <p id="subtitle">meal planning made easy</p>
          <div id="buttoncontainer">
            <a href="/personas">
              <button className="homebtn1">Curated Vibe</button>
            </a>
            <a href="/survey">
              <button className="homebtn2">Customize</button>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Home);