import React, { Component } from "react";

class NavBar extends Component {
  render() {
    console.log("NavBar - Rendered");
    return (
      <nav className="navbar">
        <a className="navbar-content" href="#">
          <h1>402</h1>
          <span className="navbar-span" />
        </a>
      </nav>
    );
  }
}

export default NavBar;
