import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import CurrentPosition from "./components/CurrentLocation";

const Marker = ({ text }) => (
  <div>
    <h1>{text}</h1>
  </div>
);

class MainMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: null,
        lng: null
      },
      zoom: 16,
      error: null
    };
  }

  componentWillMount() {
    console.log("componentWillMount");
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    console.log("Location lat =" + this.state.center.lat);
    console.log("Location lng =" + this.state.center.lng);
  }

  render() {
    console.log("render");
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCzykG6zbf03U4ZJsakjHnM5UCWAQPboFo" }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
          <CurrentPosition />
          <Marker lat={25.0826312} lng={121.561971899} text={"Taipei Taiwan"} />
        </GoogleMapReact>
      </div>
    );
  }
}

export default MainMap;
