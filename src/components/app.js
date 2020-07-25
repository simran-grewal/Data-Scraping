import React, { Component } from "react";
import { Button, Input, Grid, Image, Search, Loader, Segment } from "semantic-ui-react";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      images: [],
      imput: "",
      photoIndex: 0,
      isOpen: false,
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

  showImage(image) {
    console.log(image)
    const { images } = this.state
    this.setState({ isOpen: true, photoIndex: images.indexOf(image) })
  }

  getImages(images) {
    return images.map((image) => (
      <Grid.Column style={{ marginBottom: "3rem" }} key={image}>
        <Image style={{ cursor: "pointer" }} onClick={() => this.showImage(image)} width="three" src={image} />
      </Grid.Column>
    ))
  }
  render() {
    const { photoIndex, isOpen, images } = this.state;
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
                {isOpen && (
                  <Lightbox
                    mainSrc={images[photoIndex]}
                    nextSrc={images[(photoIndex + 1) % images.length]}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                    onMovePrevRequest={() =>
                      this.setState({
                        photoIndex: (photoIndex + images.length - 1) % images.length,
                      })
                    }
                    onMoveNextRequest={() =>
                      this.setState({
                        photoIndex: (photoIndex + 1) % images.length,
                      })
                    }
                  />
                )
                }
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
