import React, { Component } from "react";
import { Link } from "react-router-dom";
import women_bangle from "../../images/women_bangle.jpg";
import ring from "../../images/ring.png";

class SubscriptionBoxHome extends Component {
  state = {};
  render() {
    return (
      <div className="subscriptionBoxArea">
        <div className="subscriptionWomenImage">
          <img src={women_bangle} alt="woment" />
        </div>
        <div className="subscriptionText">
          <h4>Jewelry Subscription Box</h4>
          <div className="subscriptionBoxAreaLine"> </div>
          <p>
            Hand-picked Fashion Jewelry Accessories That fits perfectly your
            Lifestyle, Taste & Budget. Our Professionals Fashion Stylists will
            select top Trending Jewelry Pieces based on your Personal Style and
            fashion look.
          </p>
          <p>
            Every Month You will receive 4 to 5 beautiful items for the simple
            cost of $20 and of course they are yours to keep and Rock!
          </p>
          {!this.props.user && (
            <Link to="/quiz">
              <button className="getStratedButton">Join Now</button>
            </Link>
          )}
        </div>
        <div className="fixedRingArea">
          <img src={ring} alt="ring" />
        </div>
      </div>
    );
  }
}

export default SubscriptionBoxHome;
