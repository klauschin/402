import React, { Component } from 'react';

class CurrentLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    return (
      <div style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <h4>Latitude: {this.state.latitude}</h4>
        <h4>Longitude: {this.state.longitude}</h4>
        {this.state.error ? <p>Error: {this.state.error}</p> : null}
      </div>
    )
  }
}
export default CurrentLocation;