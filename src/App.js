import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }


  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCzykG6zbf03U4ZJsakjHnM5UCWAQPboFo' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <div style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <h2>Latitude: {this.state.latitude}</h2>
            <h2>Longitude: {this.state.longitude}</h2>
            {this.state.error ? <p>Error: {this.state.error}</p> : null}
          </div>

        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;