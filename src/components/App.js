import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

// Actions
import requestDog from '../actions/requestDog';
import requestDogSuccess from '../actions/requestDogSuccess';
import requestDogError from '../actions/requestDogError';

// Fetching API url
const fetchDog = () => {
  return (dispatch) => {
    dispatch(requestDog());
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(res => res.json())
      .then(
        data => dispatch(requestDogSuccess(data)),
        err => dispatch(requestDogError())
      );
  }
};

// Component
class App extends Component {

  componentDidMount() {
    this.props.dispatch(fetchDog());
  }

  render () {
    return (
      <div>
        <button onClick={() => this.props.dispatch(fetchDog())}>Show Dog</button>
          {this.props.loading
            ? <p>Loading...</p>
            : this.props.error
                ? <p>Error, try again</p>
                : <p><img src={this.props.url}/></p>}
      </div>
    )
  }
}

const ConnectedApp = connect((state) => {
  return state;
})(App);

export default ConnectedApp;
