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
      hintText: '',
      gif: null
    };
  }

  // function that searches api using fetch and puts search term into query url
  searchGiphy = async searchTerm => {
    //fetch
    try {
      //use await keyword to wait for response to come back
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=47XQWNYAyTmR6PwYvVWYHtCmxLLQSg1v&q=
      ${searchTerm}
      &limit=25&offset=0&rating=g&lang=en`);
      //convert response into json
      const { data } = await response.json();

      this.setState((prevState, props) => ({
        ...prevState,
        gif: data[0]
      }));

      // if fetch fails, catch it 
    } catch (error) {

    }
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
      // call searchGiphy
      this.searchGiphy(value)
    }
  };

  render() {
    const { searchTerm, gif } = this.state;
    return (
      <div className="page">
        <Header />

        <div className='search grid'>

          {gif && <video className='grid-item video' autoPlay loop
            src={gif.images.original.mp4} />}

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
