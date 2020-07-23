import React, { Component } from "react";
import { Button } from "semantic-ui-react";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      loading: true,
    };
  }
  componentDidMount() {
    fetch("http://localhost:5000/getname", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((res) => {
        console.log(res);
        this.setState(
          { name: res.name, posts: res.insta_data, loading: false },
          () => {
            console.log(this.state.name);
          }
        );
      })
      .catch((err) => console.log(err));
  }

  get_post(posts) {
    console.log("Posts = ", posts);
    return posts.map((post) => {
      return <p key={post._id}>{post._id}</p>;
    });
  }
  render() {
    return (
      <div>
        {this.state.loading ? (
          <div>Loading...</div>
        ) : (
            <div>
              <button>
                Login
            </button>
              <Button primary>Primary</Button>
              {this.state.name}
              {this.get_post(this.state.posts)}
            </div>
          )}
      </div>
    );
  }
}

export default App;
