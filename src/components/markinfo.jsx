import React, { Component } from 'react';

class MarkInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }


  componentDidMount() {
    let url = "http://localhost:3000/posts"
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        let posts = data.map((post, index) => {
          return (
            <div key={index}>
              <h3>{post.title}</h3>
              <p>Tags: {posts.tags}</p>
            </div>
          )
        })
        this.setState({ posts: posts });
      })
  }

  render() {
    return (
      <div>s
        {this.state.posts}
      </div>

    );
  }
}

export default MarkInfo;