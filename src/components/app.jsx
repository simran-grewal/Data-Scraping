import React, { Component } from "react";
import { Button, Input, Grid, Image, Header } from "semantic-ui-react";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Loader from './loader.jsx'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      images: [],
      imput: "",
      photoIndex: 0,
      isOpen: false,
      isCleaning: false,
      isInputEmpty: true
    };
  }

  setInputText(value) {
    this.setState({
      input: value
    }, () => {
      if (this.state.input.length > 0) {
        this.setState({ isInputEmpty: false })
      } else {
        this.setState({ isInputEmpty: true })
      }
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
        this.setState({ images: res.images, input: "", loading: false, isInputEmpty: true })
      })
      .catch((err) => {
        console.log(err)
        this.setState({
          images: []
        })
      });
  }


  showImage(image) {
    console.log(image)
    const { images } = this.state
    this.setState({ isOpen: true, photoIndex: images.indexOf(image) })
  }

  getImages(images) {
    if (images.length == 0) {
      return (
        <Header color={"grey"}>
          Search for a Instagram profile or a hashtag
        </Header>
      )
    }
    return images.map((image) => (
      <Grid.Column style={{ marginBottom: "3rem" }} key={image}>
        <div onClick={() => this.showImage(image)} className="image-animation__container-block">
          <Image style={{ cursor: "pointer" }} width="three" src={image} />
          <div className="image-animation__inner-block">
            <div className="image-animation__slider-top-right"></div>
          </div>
        </div>
      </Grid.Column>
    ))
  }

  showLightBox(photoIndex, images) {
    return (
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

  clearDatabase() {
    this.setState({ isCleaning: true })
    fetch("http://localhost:5000/clear_db", {
      method: "GET",
      credentials: 'same-origin',
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
      .then((res) => {
        this.setState({ isCleaning: false })
      })
      .catch((err) => {
        console.log(err)
        this.setState({ isCleaning: false })
      });
  }

  render() {
    const { photoIndex, isOpen, images } = this.state;
    return (
      <div>
        <div className="app-container">
          <div className="app-search">
            <div className="app-search__container">
              <Input value={this.state.input} onChange={(e) => { this.setInputText(e.target.value) }} focus placeholder='Search...' />
              <Button disabled={this.state.isInputEmpty && true} loading={this.state.loading && true} style={{ width: '10rem' }} primary onClick={() => { this.search() }}>Search</Button>
            </div>
            <div className="app-search__button-container">
              <Button loading={this.state.isCleaning && true} negative color="red" onClick={() => { this.clearDatabase() }} style={{ width: '10rem' }}>Clear DB</Button>
            </div>
          </div>

          {this.state.loading ? <Loader /> : (
            <div style={{ alignSelf: "center" }}>
              {isOpen && this.showLightBox(photoIndex, images)}
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
