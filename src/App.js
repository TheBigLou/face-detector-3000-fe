import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import ImageLinkForm from './components/image-link-form/ImageLinkForm';
import FaceRecognition from './components/face-recognition/FaceRecognition';
import ColorList from './components/color-list/ColorList';
import SignIn from './components/sign-in/SignIn';
import Register from './components/register/Register';
import './App.css';

// React App // 

const initialState = {
  init: true,
  input: '',
  imageUrl: '',
  validImage: true,
  boxes: [],
  regions: [],
  originalWidth: null,
  originalHeight: null,
  hasFace: true,
  colors: [],
  route: 'signIn',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;

    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  componentDidMount() {
    // Add the window resize event listener
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    // Remove the window resize event listener
    window.removeEventListener('resize', this.handleWindowResize);
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  // handle and validate inputs //

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  appendHttps = (url) => {
    const urlPattern = /^https?:\/\//i;
  
    if (!urlPattern.test(url)) {
      return `https://${url}`;
    }

    return url;
  }

  validateImageUrl = async (url) => {
    const response = await fetch('http://localhost:3000/validate-image', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: url
        })
    });
    if (response.ok) {
      const data = await response.json();
        if (data.isValid) {
          return true;
        } else {
          return false;
        }
      } else {
        console.log('Server-side error', response)
        return false;
    }
  }

  clearInput = () => {
    document.getElementById('input-field').value = '';
    this.setState({ input: ''})
  }

  revertImageState = () => {
    this.setState({
      init: true,
      imageUrl: '',
      boxes: [],
      regions: [],
      originalWidth: null,
      originalHeight: null,
      hasFace: true,
      colors: [],
      validImage: true
    })
  }

  // detect faces and redraw boxes if window is resized //

  getFaceLocations = (width, height, regions) => {
    let faceLocations = [];
    for (let i in regions) {
      faceLocations[i] = {
        leftCol: (regions[i].region_info.bounding_box.left_col) * width,
        topRow: (regions[i].region_info.bounding_box.top_row) * height,
        rightCol: width - ((regions[i].region_info.bounding_box.right_col) * width),
        bottomRow: height - ((regions[i].region_info.bounding_box.bottom_row) * height)
      }
    };
    return faceLocations;
  }

  calculateFaceLocation = (data) => {
    const image = document.getElementById('face-image');
    const width = Number(image.width);
    const height = Number(image.height);
    // Save original dimensions
    this.setState({ originalWidth: width, originalHeight: height });
    const regions = data.outputs[0].data.regions;
    this.setState({regions: regions});
    return this.getFaceLocations(width, height, regions);
  }

  updateFaceBoxes = () => {
    const image = document.getElementById('face-image');
    const width = Number(image.width);
    const height = Number(image.height);
    const faceLocations = this.getFaceLocations(width, height, this.state.regions);
    this.drawFaceBox(faceLocations);
  }
  
  handleWindowResize() {
    // Update the face boxes when the window is resized
    if (this.state.validImage && !this.state.init ) {
      this.updateFaceBoxes();
    }
  }

  drawFaceBox = (boxes) => {
    this.setState({boxes: boxes});
  }

  faceDetect = () => {
    fetch('http://localhost:3000/face-detect', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        imageUrl: this.state.imageUrl
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.status.code === 10000 && data.outputs[0].data.regions) {
        this.setState({ hasFace: true });
        this.drawFaceBox(this.calculateFaceLocation(data));
        fetch('http://localhost:3000/rank', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(data => this.setState(Object.assign(this.state.user, { entries: data })))
      } else if (data.status.code === 10000 && !data.outputs[0].data.regions) {
        this.setState({ hasFace: false });
      } else {
        console.log('Image URL invalid')
      }
    })
    .catch(error => console.log('error', error));
  }

  // color recognition //

  setColors = (data) => {
    this.setState({ colors: data.outputs[0].data.colors })
  }

  colorRecognition = () => {
    fetch('http://localhost:3000/color-recognition', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        imageUrl: this.state.imageUrl
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.status.code === 10000) {
        this.setColors(data);
      } else {
        return;
      }
    })
    .catch(error => console.log('error', error));
  }

  copyHex = async(hex) => {
    try {
      await navigator.clipboard.writeText(hex)
      .then(() => document.getElementById('copied-value').innerHTML = `Last copied: ${hex}`)
      .then(console.log('Last copied: ', hex));
    } catch (err) {
      console.long('Failed to copy', err)
    }
  }

  // take action on detect submit //

  callClarifai = () => {
    this.setState({ init: false })
    this.faceDetect();
    this.colorRecognition();
    this.clearInput();
  }

  onDetectSubmit = async (event) => {
    event.preventDefault();
    this.revertImageState();
    if (this.state.input) {
      // prepend https:// as needed
      const fixedUrl = this.appendHttps(this.state.input);
      
      // validate that this URL is an image
      const validImageUrl = await this.validateImageUrl(fixedUrl);
      if (validImageUrl) {
        this.setState({ imageUrl: fixedUrl }, () => {
          this.callClarifai();
        });
      } else {
        this.setState({ validImage: false });
      }
    }
  }

  // Routing //

  onRouteChange = (route) => {
    if (route === 'signIn') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  // render app

  render() {
    const {colors, init, imageUrl, boxes, isSignedIn, route, validImage, hasFace, input } = this.state;
    return (
      <div>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} userName={this.state.user.name} userEntries={this.state.user.entries} />
        { route === 'home'
        ? <React.Fragment>
        <ImageLinkForm onInputChange={this.onInputChange} onDetectSubmit={this.onDetectSubmit} validImage={validImage} hasFace={hasFace} init={init} input={input} />
      <ColorList colors={colors} copyHex={this.copyHex} init={init} />
      <FaceRecognition imageUrl={imageUrl} init={init} boxes={boxes} />
      </React.Fragment>
        : (
          route === 'signIn'
          ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        )}
      </div>
    );
  }
}

export default App;