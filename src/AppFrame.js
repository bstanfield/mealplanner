
import React, { Component } from 'react';
import Nav from './components/Nav';

class AppFrame extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Nav />
        {this.props.content}
      </div>
    );
  }
}

export default AppFrame;