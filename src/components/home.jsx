import React, { Component } from "react";
import HeaderCommon from "./common/header";
import HowItWorksHome from "./homecomponent/howitworks";
import SubscriptionBoxHome from "./homecomponent/subscriptionbox";
import BenefitHome from "./homecomponent/benefit";
import HomeBanner from "./homecomponent/homebanner";
import HomePricing from "./homecomponent/homepricing";
import Footer from "./common/footer";

class HomePage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <HeaderCommon user={this.props.user} location={this.props.location} />
        <HomeBanner user={this.props.user} />
        <HowItWorksHome user={this.props.user} />
        <SubscriptionBoxHome user={this.props.user} />
        <BenefitHome user={this.props.user} />
        <HomePricing user={this.props.user} />
        <Footer />
      </React.Fragment>
    );
  }
}

export default HomePage;
