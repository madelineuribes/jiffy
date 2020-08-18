import React, { Component } from 'react';
import loader from './images/loader.svg';

const Header = () => (
  <div className="header grid">
    <h1 className="title">Jiffy</h1>
  </div>
);

const UserHint = ({ loading, hintText }) => (
  <div className='user-hint'>
    {loading ? <img className="block mx-auto" src={loader} alt='' /> :
      hintText}
  </div>
);

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      hintText: ''
    };
  }

  handleChange = event => {
    const { value } = event.target;
    this.setState((prevState, props) => ({
      // take old props and spread them out here
      ...prevState,
      // then we overwrite the one we want after
      searchTerm: value,
      // set hint text only when we have more than 2
      hintText: value.length > 2 ? `Hit enter to search ${value}` : ''
    }));
  };

  // when we have 2 or more characters
  // and we pressed enter, we want to run a search 
  handleKeyPress = event => {
    const { value } = event.target
    if (value.length > 2 && event.key === 'Enter') {
      alert(`search for ${value}`);
    }
  };

  render() {
    const { searchTerm } = this.state;
    return (
      <div className="page">
        <Header />
        <div className='search grid'>
          {}
          <input className='input grid-item' placeholder="Type something" onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            value={searchTerm} />
        </div>
        <UserHint {...this.state} />
      </div>
    );
  }
}

export default App;
