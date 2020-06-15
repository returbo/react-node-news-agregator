import React, { Component } from 'react';
import Post from './components/Post';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Item,
  Button,
} from 'semantic-ui-react';


class App extends Component {
  constructor(props) {
    super(props);
  }

  fetchPosts(resource) {
    const { setPosts } = this.props;
    axios.get(`https://5ed9d9294378690016c6b3ec.mockapi.io/${resource}`)
      .then(({ data }) => {
        setPosts(data);
      });
  }

  regionText(s) {
    switch (s) {
      case "ING":
        this.fetchPosts('magastimes');
        return "Ингушетия";
      case "DAG":
        this.fetchPosts('riadagestan');
        return "Дагестан";
      default:
        break;
    }
  }

  render() {
    const { posts, regions } = this.props;
    return (
      <Container>
        <Header as='h1'>Парсер новостей с magastimes.ru и riadagestan.ru</Header>
        <Header as='h2'>Регион: {this.regionText(regions.region)}</Header>
        <Button.Group>
          <Button onClick={() => this.props.changeRegion('ING')}>
            Ингушетия
            </Button>
          <Button onClick={() => this.props.changeRegion('DAG')}>
            Дагестан
            </Button>
        </Button.Group>
        <Item.Group divided>
          {regions.region === ""
              ? <div></div>
              : !posts.length
                ? <div class="ui active centered inline loader"></div>
                : (
                  posts.map((item, key) => (
                    <Post
                      key={key}
                      {...item}
                    />
                  ))
                )}
        </Item.Group>
      </Container>
    );
  }
}

const state = ({ posts, regions }) => {
  const sortedPosts = posts.items.length
    ? posts.items.sort((a, b) => a.parseViews - b.parseViews).reverse()
    : [];
  return {
    posts: sortedPosts,
    regions
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

