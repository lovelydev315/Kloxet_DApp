import React, { Component } from "react";
import { Element } from "react-scroll";
import how1 from "../../images/how1.png";
import how2 from "../../images/how2.png";
import how3 from "../../images/how3.png";

class HowItWorksHome extends Component {
  state = {};

  render() {
    return (
      <Element name="howitworks" className="howItWorks">
        <div className="container">
          <h3>How it Works</h3>
          <div className="underline" />
          <div className="row">
            <div className="col-sm">
              <div className="howItWorksSection">
                <p className="number">1</p>
                <p className="firstText">
                  Get started with a fashion style quiz
                </p>
                <div className="howItWorksImageArea">
                  <img src={how1} alt="st1" />
                </div>
                <p>
                  Create a fashion style profile so your personal fashioner gets
                  the best of you.
                </p>
              </div>
            </div>
            <div className="col-sm">
              <div className="howItWorksSection">
                <p className="number">2</p>
                <p className="firstText">
                  Receive five personalizes pieces, delivered to your door
                </p>
                <div className="howItWorksImageArea">
                  <img src={how2} alt="st2" />
                </div>
                <p>
                  Try on and discover styles hand-picked to fit you, your budget
                  and your style.
                </p>
              </div>
            </div>
            <div className="col-sm">
              <div className="howItWorksSection">
                <p className="number">3</p>
                <p className="firstText">
                  Show off & rock it,let your friend know about kloxet
                </p>
                <div className="howItWorksImageArea">
                  <img src={how3} alt="st3" />
                </div>
                <p>
                  Refer a friend and receive 20% off your next Subscription!
                </p>
              </div>
            </div>
          </div>
        </div>
      </Element>
    );
  }
}

export default HowItWorksHome;
