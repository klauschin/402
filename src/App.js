import React, { Component } from "react";
//import GoogleMapReact from "google-map-react";
import CurrentPosition from "./components/CurrentLocation";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

class MainMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: null,
        lng: null
      }
    };
    this.getLocation = this.getLocation.bind(this);
    console.log("constructor");
  }
  getLocation() {
    console.log("getLocation");
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
  }

  componentWillMount() {
    this.getLocation();
    console.log("componentWillMount");
    console.log("Location lat = " + this.state.center.lat);
    console.log("Location lng = " + this.state.center.lng);
  }
  render() {
    console.log("render");
    console.log("Location lat = " + this.state.center.lat);
    console.log("Location lng = " + this.state.center.lng);
    return (
      <Map
        google={this.props.google}
        zoom={15}
        center={{
          lat: this.state.center.lat,
          lng: this.state.center.lng
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCzykG6zbf03U4ZJsakjHnM5UCWAQPboFo"
})(MainMap);
