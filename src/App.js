import React, { Component } from "react";
import CurrentPosition from "./components/CurrentLocation";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import NavBar from "./components/navbar";
import axios from "axios";

const LoadingContainer = props => <div>Fancy loading container!</div>;

class MainMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 25.021799,
        lng: 121.532626
      },
      zoom: 7,
      infos: [],
      selectedPlace: {},
      showingInfoWindow: false,
      activeMarker: {}
    };
    this.getLocation = this.getLocation.bind(this);
    this.getStates = this.getStates.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
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

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  render() {
    console.log("render");
    //lat: 23.654667, lng: 120.953511
    console.log("Location lat = " + this.state.center.lat);
    console.log("Location lng = " + this.state.center.lng);
    console.log("資訊" + this.state.infos);
    return (
      <React.Fragment>
        <NavBar />
        <Map
          google={this.props.google}
          zoom={this.state.zoom}
          initialCenter={{
            lat: this.state.center.lat,
            lng: this.state.center.lng
          }}
          center={{ lat: this.state.center.lat, lng: this.state.center.lng }}
        >
          <Marker
            position={{
              lat: this.state.center.lat,
              lng: this.state.center.lng
            }}
            name={"Your Location"}
            icon={{
              url: "/img/spot-icon.svg",
              anchor: this.props.google.maps.Point(32, 32),
              scaledSize: this.props.google.maps.Size(20, 20)
            }}
          />
          <Marker
            position={{
              lat: this.state.center.lat,
              lng: this.state.center.lng
            }}
            name={"Your Location"}
            icon={{
              url: "/img/icons8-street-view.svg",
              anchor: this.props.google.maps.Point(32, 32),
              scaledSize: this.props.google.maps.Size(20, 20)
            }}
          />
          {this.state.infos.map(info => {
            return (
              <Marker
                key={info._id}
                position={{
                  lat: info.geo.coordinates[0],
                  lng: info.geo.coordinates[1]
                }}
                name={info.name}
                icon={{
                  url: "/img/spot-icon.svg",
                  anchor: this.props.google.maps.Point(32, 32),
                  scaledSize: this.props.google.maps.Size(20, 20)
                }}
                onClick={this.onMarkerClick}
              />
            );
          })}
          {this.state.infos.map(info => {
            return (
              <InfoWindow
                key={info._id}
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
              >
                <div>
                  <h1>{this.state.selectedPlace.name}</h1>
                </div>
              </InfoWindow>
            );
          })}
        </Map>
      </React.Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCzykG6zbf03U4ZJsakjHnM5UCWAQPboFo",
  LoadingContainer: LoadingContainer
})(MainMap);
