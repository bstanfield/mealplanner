import React, { Component } from 'react';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return(
      <a className="link-nostyle" href="/">
        <div className="nav-container">
          <h3>
            <span className="emoji" role="img" aria-label="broccoli emoji"> 🥗 </span>
            {` Mealplanner`}
          </h3>
        </div>
      </a>
    )
    // ...
  }
}

export default Nav; // Don’t forget to use export default!