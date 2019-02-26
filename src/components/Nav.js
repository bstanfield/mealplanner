import React, { Component } from 'react';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return(
      <div className="nav-container">
        <span className="emoji" role="img" aria-label="broccoli emoji"> 🥦🍗 </span>
        <div className="header">Mealplanner</div>
      </div>
    )
    // ...
  }
}

export default Nav; // Don’t forget to use export default!