import React, { Component } from "react";
import { Button, Input, Grid, Image } from "semantic-ui-react";
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
    const image = "https://instagram.fyvr4-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c0.200.720.720a/s640x640/91079612_652551572188027_3532362714262387850_n.jpg?_nc_ht=instagram.fyvr4-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=z1F44o7_8xwAX_0Oe3s&oh=6a8f92c46d00d1a34a36432ebb3e8d2b&oe=5F1D6725"
    const image2 = "https://instagram.fyvr4-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/110001035_1169298433453376_577323075308718868_n.jpg?_nc_ht=instagram.fyvr4-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=eTE5SbNvpoUAX_GJ1oA&oh=fc93a59a11f1ad666174ad13810d56b7&oe=5F1D5CD0"
    const image3 = "https://instagram.fyvr4-1.fna.fbcdn.net/v/t51.12442-15/e35/c0.336.721.721a/s150x150/60832725_331174377574284_1808323100107134560_n.jpg?_nc_ht=instagram.fyvr4-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=fwV-kRKC1NQAX_uXGi9&oh=c05aea1c84ec73015556663310f4aa67&oe=5F1D53EC"
    return (
      <div>
        <div>

        </div>
        <div className="app-container">

          {this.state.loading ? (
            <div>Loading...</div>
          ) : (
              <div>
                <div className="app-search">
                  <Input value={this.state.input} onChange={(e) => { this.setInputText(e.target.value) }} focus placeholder='Search...' />
                  <Button style={{ width: "12rem" }} primary onClick={() => { this.search() }}>Search</Button>
                </div>
                <Grid>
                  <Grid.Row columns={3}>
                    <Grid.Column>
                      <Image width="three" src={image} />
                    </Grid.Column>
                    <Grid.Column>
                      <Image src={image} />
                    </Grid.Column>
                    <Grid.Column>
                      <Image src={image3} />
                    </Grid.Column>
                    <Grid.Column>
                      <Image src={image2} />
                    </Grid.Column>
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
