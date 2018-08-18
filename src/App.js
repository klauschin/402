import React, { Component } from "react";
//import GoogleMapReact from "google-map-react";
import CurrentPosition from "./components/CurrentLocation";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import axios from "axios";

class MainMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: null,
        lng: null
      },
      zoom: 7,
      infos: []
    };
    this.getLocation = this.getLocation.bind(this);
    this.getStates = this.getStates.bind(this);
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
          zoom: 15,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  getStates() {
    console.log("getStates");
    axios
      .get("../data/parking.json")
      .then(res => {
        console.log(res.data);
        this.setState({
          infos: res.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getLocation();
    this.getStates();
    console.log("componentWillMount");
    console.log("Location lat = " + this.state.center.lat);
    console.log("Location lng = " + this.state.center.lng);
    console.log("資訊" + this.state.data);
  }
  render() {
    console.log("render");
    console.log("Location lat = " + this.state.center.lat);
    console.log("Location lng = " + this.state.center.lng);
    console.log("資訊" + this.state.infos);
    return (
      <Map
        google={this.props.google}
        zoom={this.state.zoom}
        initialCenter={{
          lat: 23.654667,
          lng: 120.953511
        }}
        center={{
          lat: this.state.center.lat,
          lng: this.state.center.lng
        }}
      >
        <Marker
          position={{
            lat: this.state.center.lat,
            lng: this.state.center.lng
          }}
          name={"Your Location"}
        />
        {this.state.infos.map(info => {
          console.log(info.geo.coordinates[0]);
          return (
            <Marker
              key={info._id}
              position={{
                lat: info.geo.coordinates[0],
                lng: info.geo.coordinates[1]
              }}
              name={info.name}
            />
          );
        })}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCzykG6zbf03U4ZJsakjHnM5UCWAQPboFo"
})(MainMap);
