import React, { Component } from "react";
import { Button, Input } from "semantic-ui-react";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      loading: true,
      input: ""
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
    return posts.map((post) => {
      return <p key={post._id}>{post._id}</p>;
    });
  }

  setInputText(value) {
    this.setState({
      input: value
    })
  }
  search() {
    fetch("http://localhost:5000/setname", {
      method: "POST",
      credentials: 'same-origin',
      body: JSON.stringify({ "name": this.state.input })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((res) => {
        console.log(res);
        this.setState({ input: "" })
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div className="app-container">
        {this.state.loading ? (
          <div>Loading...</div>
        ) : (
            <div className="app-search">
              <Input onChange={(e) => { this.setInputText(e.target.value) }} focus placeholder='Search...' />
              <Button primary onClick={() => { this.search() }}>Search</Button>
            </div>
          )}
      </div>
    );
  }
}

export default App;
