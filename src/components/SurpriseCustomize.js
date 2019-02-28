import React, { Component } from 'react';
import * as R from 'ramda';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {} from '../actions';
import '../surprise.scss'

// const renderPersonas = (persona) => (
//   <a className="link-nostyle" href="/recipe-page">
//     <div className="persona"> 
//       <h2>{persona.name}</h2>
//       <ul>
//         {R.map(x => <li>{x}</li>, persona.descriptors)}
//       </ul>
//     </div>
//   </a>
// )

const renderSurpriseFilter = (imgURL) => (
  <div>
    <div class="circle">
      <img src="{imgURL}"></img>
    </div>
  </div>
)

class SurpriseCustomize extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { personas } = this.props;
    // const { imgURL } = this.props.surprise;
    return(
      <div>
        <h1>Recipe for Your Choices</h1>
        <br/>
        <br/>
        {R.map(renderSurpriseFilter, imgURL)}
        {/* {R.map(renderPersonas, surprisecust)} */}
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    surprisecust: state.surprisecust,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStatetoProps, mapDispatchToProps)(SurpriseCustomize);