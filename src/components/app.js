import React, { Component } from "react";
import { Button, Input, Grid, Image, Search, Loader, Segment } from "semantic-ui-react";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      images: [],
      imput: "",
    };
  }
  // componentDidMount() {
  //   fetch("http://localhost:5000/getname", {
  //     method: "GET",
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(response.statusText);
  //       }
  //       return response.json();
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       this.setState(
  //         { name: res.name, posts: res.insta_data, loading: false },
  //         () => {
  //           console.log(this.state.name);
  //         }
  //       );
  //     })
  //     .catch((err) => console.log(err));
  // }

  // get_post(posts) {
  //   return posts.map((post) => {
  //     return <p key={post._id}>{post._id}</p>;
  //   });
  // }

  setInputText(value) {
    this.setState({
      input: value
    })
  }
  search() {
    this.setState({ loading: true })
    fetch("http://localhost:5000/get_posts", {
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
        this.setState({ images: res.images, input: "", loading: false })
      })
      .catch((err) => console.log(err));
  }

  getImages(images) {
    return images.map((image) => (
      <Grid.Column style={{ marginBottom: "3rem" }} key={image}>
        <Image width="three" src={image} />
      </Grid.Column>
    ))
  }
  render() {
    const image = "https://instagram.fyvr4-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c0.200.720.720a/s640x640/91079612_652551572188027_3532362714262387850_n.jpg?_nc_ht=instagram.fyvr4-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=z1F44o7_8xwAX_0Oe3s&oh=6a8f92c46d00d1a34a36432ebb3e8d2b&oe=5F1D6725"
    return (
      <div>
        <div>

        </div>
        <div className="app-container">

          {this.state.loading ? (
            <div className="loading">Loading&#8230;</div>
          ) : (
              <div>
                <div className="app-search">
                  <Input value={this.state.input} onChange={(e) => { this.setInputText(e.target.value) }} focus placeholder='Search...' />
                  <Button style={{ width: "12rem" }} primary onClick={() => { this.search() }}>Search</Button>
                </div>
                <Grid>
                  <Grid.Row columns={4}>
                    {Array.isArray(this.state.images) ? this.getImages(this.state.images) : <div>Images Not Found</div>}
                  </Grid.Row>
                </Grid>
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default App;
