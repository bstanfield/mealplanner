import React, { Component } from 'react';

ReactGA.pageview("/");

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
      <div className="home-container">
        <h1>Welcome to Mealplanner!</h1>
        <h2>Do you want to start with a preset plan or customize your plan?</h2>
        {this.renderBlocks()}
        <br />
        <a href="/personas" className="link-nostyle" ><div className="plans">
          <h3>Preset</h3>
          <p>In a preset plan you get to choose from a set of generic personas. Based on who you choose, we recommend a recipe that you might like as well!</p>
        </div></a>
        <br />
        <a href="/survey" className="link-nostyle" ><div className="plans">
          <h3>Customize</h3>
          <p>By customizing your settings you get to specify preferences such as cooking experience, price range, and favorite cuisine. Your recommendations are tailored exactly to your profile.</p>
        </div></a>
        <br />
        <br />
        <hr />
        <a href="/survey">Survey page</a><br />
        <a href="/personas">Personas page</a><br />
        <a href="/surprise-customize">Customize Surprise Me</a><br />
        <a href="/recipe-page">Check out the recipe details page</a>
      </div>
    )
  }
}

export default Home;