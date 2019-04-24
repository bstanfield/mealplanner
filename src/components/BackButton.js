import React, { Component } from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import * as R from 'ramda';

class BackButton extends Component {
  constructor(props) {
  super(props);
  this.state = {
    goBack: false,
  };
}


  render() {
    if (this.state.goBack) {
      if (R.isNil(this.props.backTo)) {
         return (
         <Redirect to={{
           pathname: "/"
         }} 
         />)
      }
      else { 
        return (
        <Redirect to={{
          pathname: `${this.props.backTo.pathname}`,
          search: `${this.props.backTo.search}`,
          state: {backTo: this.props.location},
        }} />
      );
      }
    }

    return (
      <button
        className="button icon-left"
        onClick={() => this.setState({goBack: true})}>
          {this.props.name? this.props.name : "Back"} 
      </button>
    )
  }
}

export default withRouter(BackButton);