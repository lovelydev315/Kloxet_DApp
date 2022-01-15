import React, { Component } from "react";
import no_extra_cost from "../../images/no_extra_cost.png";
import pricing_img2 from "../../images/pricing_img2.png";
import pricing_img3 from "../../images/pricing_img3.png";

class HomePricing extends Component {
  state = {};
  render() {
    return (
      <div className="pricingArea">
        <div className="container">
          <h3>Pricing</h3>
          <div className="underline" />
          <div className="row">
            <div className="col-sm">
              <div className="pricingHomeSection noBorder">
                <div className="imageAreaPricing">
                  <img
                    className="opacity70"
                    src={no_extra_cost}
                    alt="no_extra_cost"
                  />
                </div>
                <div className="pricingTextArea">
                  <h5>
                    NO
                    <br />
                    EXTRA COST
                  </h5>
                  <p>There is no styling fees just one flat rate.</p>
                </div>
              </div>
            </div>
            <div className="col-sm">
              <div className="pricingHomeSection">
                <div className="imageAreaPricing">
                  <img
                    className="opacity50"
                    src={pricing_img2}
                    alt="pricing_img2"
                  />
                </div>
                <div className="pricingTextArea">
                  <h5>
                    YOU'LL <br />
                    GET TO KEEP IT
                  </h5>
                  <p>Unlike the Others, you'll get to keep what you get!</p>
                </div>
              </div>
            </div>
            <div className="col-sm">
              <div className="pricingHomeSection">
                <div className="imageAreaPricing">
                  <img
                    className="opacity50"
                    src={pricing_img3}
                    alt="pricing_img3"
                  />
                </div>
                <div className="pricingTextArea">
                  <h5>
                    PRICED <br />
                    FOR YOUR POCKET
                  </h5>
                  <p>Why paying so much for 1 item when you can get 5.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePricing;
