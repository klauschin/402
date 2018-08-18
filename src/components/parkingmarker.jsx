import React, { Component } from "react";

class ParkingMarker extends Component {
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

  getStates() {
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

  render() {
    return (
      <div>
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
              icon={{
                url:
                  "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
                anchor: this.props.google.maps.Point(32, 32),
                scaledSize: this.props.google.maps.Size(64, 64)
              }}
            />
          );
        })}
      </div>
    );
  }
}
export default ParkingMarker;
