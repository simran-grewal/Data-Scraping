import React, { Component } from "react";
import { Button, Input, Grid, Image } from "semantic-ui-react";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Loader from './loader.jsx'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      images: [],
      user: "",
      tags:"",
      photoIndex: 0,
      isOpen: false,
    };
  }

  setInputText(value) {
    this.setState({
      user: value
    })
  }
  setTagText(value) {
    this.setState({
      tags: value
    })
  }
  

  search() {
    this.setState({ loading: true })
    fetch("http://localhost:5000/get_posts", {
      method: "POST",
      credentials: 'same-origin',
      body: JSON.stringify({ "name": this.state.user, "tags":this.state.tags })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((res) => {
        this.setState({ images: res.images, input: "", loading: false })
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


  render() {
    const { photoIndex, isOpen, images } = this.state;
    return (
      <div>
        <div className="app-container">
          <div className="app-search">
            {/* <label>Enter Usernames seperated by space</label> */}
            <Input value={this.state.user} onChange={(e) => { this.setInputText(e.target.value) }} focus placeholder='Enter Usernames seperated by space' />
          </div>
          <div className="app-search">
            {/* <label>Enter Hashtags seperated by space</label> */}
            <Input value={this.state.tag} onChange={(e) => { this.setTagText(e.target.value) }} focus placeholder="Enter Hashtags seperated by space"/>
          </div>
          <div className="app-search">
            <Button style={{ width: "12rem" }} primary onClick={() => { this.search() }}>Search</Button>
          </div>

          {this.state.loading ? <Loader /> : (
            <div>
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
