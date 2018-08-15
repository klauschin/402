import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import CurrentPosition from './components/CurrentLocation';

const Marker = ({ text }) => <div><h1>{text}</h1></div>;

class MainMap extends Component {
  static defaultProps = {
    center: {
      lat: 25.0826312,
      lng: 121.561971899
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCzykG6zbf03U4ZJsakjHnM5UCWAQPboFo' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <CurrentPosition />
          <Marker
            lat={25.0826312}
            lng={121.561971899}
            text={'Taipei Taiwan'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default MainMap;