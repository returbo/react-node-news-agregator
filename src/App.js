import React, { Component } from 'react';
import Post from './components/Post';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  componentWillMount() {
    axios.get('https://5ed9d9294378690016c6b3ec.mockapi.io/posts')
      .then(({ data }) => {
        console.info('SERVER DATA', data);
      });
  }

  render() {
    return (
      <div>
        {!this.state.data.length ? (
          <span>Loading...</span>
        ) : (
            this.state.data.map(({ title, description, image }, key) => (
              <Post
                key={key}
                title={title}
                description={description}
                image={image}
              />
            ))
          )}
      </div>
    );
  }
}

export default App;

