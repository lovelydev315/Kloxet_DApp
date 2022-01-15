import React, { Component } from "react";
import { Element } from "react-scroll";
import benefit_img1 from "../../images/benefit_img1.jpg";
import benefit_img2 from "../../images/benefit_img2.jpg";
import benefit_img3 from "../../images/benefit_img3.jpg";

class BenefitHome extends Component {
  state = {};
  render() {
    return (
      <Element name="benefitArea" className="benefitArea">
        <div className="container">
          <h4>Lovely Benefits</h4>
          <div className="underline" />
          <div className="row">
            <div className="col-sm-4">
              <div className="benefirSection">
                <img src={benefit_img1} alt="benefit_img1" />
                <h5>
                  PERSONALIZED FASHION
                  <br /> COLLECTION
                </h5>
                <p>
                  Find Out which fashion jewelry best fit your style with your
                  personal fashion adviser.
                </p>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="benefirSection">
                <img src={benefit_img2} alt="benefit_img2" />
                <h5>
                  IT GETS BETTER AND
                  <br /> BETTER
                </h5>
                <p>
                  Your response helps your fashion adviser make better
                  selections that you will love.
                </p>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="benefirSection">
                <img src={benefit_img3} alt="benefit_img3" />
                <h5>YOURS TO KEEP</h5>
                <p>
                  Every Month you will get to keep 5 beautiful fashion Jewelry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Element>
    );
  }
}

export default BenefitHome;
