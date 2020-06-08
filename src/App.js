import React, { Component } from 'react';
import Post from './components/Post';
import axios from 'axios';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
  }

  fetchPosts() {
    const { setPosts } = this.props;
    axios.get('https://5ed9d9294378690016c6b3ec.mockapi.io/posts')
      .then(({ data }) => {
        setPosts(data);
      });
  }

  render() {
    const { items } = this.props.posts;
    return (
      <div>
        <div>
          <button onClick={() => this.fetchPosts()}>Загрузить посты</button>
          <h3>Регион: {this.props.regions.region}</h3>
          <ul>
            <li>
              <button
                onClick={() => this.props.changeRegion('ING')}
              >
                Ингушетия
              </button>
            </li>
            <li>
              <button
                onClick={() => this.props.changeRegion('DAG')}
              >
                Дагестан
              </button>
            </li>
          </ul>
        </div>
        {!items.length ? (
          <span>Loading...</span>
        ) : (
            items.map(({ title, description, image }, key) => (
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

const state = props => {
  return {
    loading: true,
    ...props,
  };
};

const actions = dispatch => ({
  setPosts: data =>
    dispatch({
      type: 'SET_POSTS',
      payload: data,
    }),
  changeRegion: data =>
    dispatch({
      type: 'CHANGE_REGION',
      payload: data,
    }),
});


export default connect(state, actions)(App);

