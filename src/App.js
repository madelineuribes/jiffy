import React, { Component } from 'react';
import loader from './images/loader.svg';
import clearButton from './images/close-icon.svg';
import Gif from './Gif';

const randomChoice = arr => {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
};

const Header = ({ clearSearch, hasResults }) => (
  <div className="header grid">
    {hasResults ? (
      <button onClick={clearSearch}>
        <img src={clearButton} alt="clear button" />
      </button>
    ) : (<h1 className="title" onClick={clearSearch}>Jiffy</h1>
      )}
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
      loading: false,
      searchTerm: '',
      hintText: '',
      //array of gifs
      gifs: []
    };
  }

  // function that searches api using fetch and puts search term into query url
  searchGiphy = async searchTerm => {
    this.setState({
      loading: true
    })
    //fetch
    try {
      //use await keyword to wait for response to come back
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=47XQWNYAyTmR6PwYvVWYHtCmxLLQSg1v&q=
      ${searchTerm}
      &limit=25&offset=0&rating=g&lang=en`);
      //convert response into json
      const { data } = await response.json();

      //check if array is empty, throw error if it is
      if (!data.length) {
        throw `Nothing found for ${searchTerm}`
      }

      //grab random result from our images
      const randomGif = randomChoice(data);

      console.log({ randomGif });

      this.setState((prevState, props) => ({
        ...prevState,
        // use spread to take previous gifs and spread them out, adding new gif to the end
        gifs: [...prevState.gifs, randomGif],
        loading: false,
        hintText: `Hit enter to see more ${searchTerm}`
      }));

      // if fetch fails, catch it 
    } catch (error) {
      this.setState((prevState, props) => ({
        ...prevState,
        hintText: error,
        loading: false
      }));
    }
  };

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

  // reset state be clearing everything out and making it default
  clearSearch = () => {
    this.setState((prevState, props) => ({
      ...prevState,
      searchTerm: '',
      hintText: '',
      gifs: []
    }));
  };

  render() {
    const { searchTerm, gifs } = this.state;
    const hasResults = gifs.length;
    return (
      <div className="page">
        <Header clearSearch={this.clearSearch} hasResults={hasResults} />

        <div className='search grid'>

          {/*loop over our array of gif images from our state, create multiple videos from it*/}
          {this.state.gifs.map(gif => (
            <Gif {...gif} />
          ))}

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
