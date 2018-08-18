import React, { Component } from "react";

class NavBar extends Component {
  render() {
    console.log("NavBar - Rendered");
    return (
      <nav className="navbar">
        <div className="navbar__content">
          <a className="navbar__content-a" href="#">
            <h1>402</h1>
          </a>
          <div className="user__section">
            <figure className="user__section-img">
              <img src="./img/IMG_5544.JPG" alt="user-img" />
            </figure>
            <span>Brian Chen</span>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
