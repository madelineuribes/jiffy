import React, { Component } from 'react';

const Header = () => (
  <div className="header grid">
    <h1 className="title">Jiffy</h1>
  </div>
);

class App extends Component {

  handleChange = event => {
    const { value } = event.target;
    if (value.length > 2) {

    }
  };

  // when we have two or more characters
  // and we pressed enter, we want to run a search 

  handleKeyPress = event => {
    console.log(event.key);
  };

  render() {
    return (
      <div className="page">
        <Header />
        <div className='search grid'>
          {}
          <input className='input grid-item' placeholder="Type something" onChange={this.handleChange}
            onKeyPress={this.handleKeyPress} />
        </div>
      </div>
    );
  }
}

export default App;
