import React, { Component } from "react";
import { Link } from "react-router-dom";
import banner_homepage from "../../images/banner_homepage.jpg";

class HomeBanner extends Component {
  state = {};
  render() {
    return (
      <div className="bannerHome">
        <div className="container">
          <div className="leftTextArea">
            <p className="monthlyPrice">
              <span>Only</span>
              $20/Month
            </p>
            <p className="bestJewelry">
              The Best Jewelry <span>Monthly Box!</span>
            </p>
            {!this.props.user && (
              <Link to="/quiz">
                <button className="getStratedButton">Get Started</button>
              </Link>
            )}
          </div>
          <div className="bannerImageArea">
            <img src={banner_homepage} alt="banner" />
          </div>
        </div>
      </div>
    );
  }
}

export default HomeBanner;
