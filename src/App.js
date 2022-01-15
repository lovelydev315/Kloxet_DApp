import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import history from "./create-history";
//import Loader from "react-loader-spinner";
import auth from "./services/authServices";
import HomePage from "./components/home";
import Login from "./components/login/login";
import AboutUs from "./components/staticpages/aboutUs";
import Faq from "./components/staticpages/faq";
import GetStarted from "./components/getStarted";
import ContactUs from "./components/contactus";
import ForgotPassword from "./components/common/forgotPassword";
import TermsAndCondition from "./components/staticpages/termsandcondition";
import PrivacyPolicy from "./components/staticpages/privacypolicy";
import MyAccount from "./components/profile/myAccount";
import LogOut from "./components/logOut";
//import logo from "./logo.svg";
import "./App.css";
import Subscribe from "./components/subscribe";

class App extends Component {
  state = {
    user: {},
    pageLoaded: false
  };

  async componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user, pageLoaded: true });
    if (user) {
      try {
        await auth.getCurrentUserDetails();
      } catch (ex) {
        auth.removeJwtToken();
        window.location = "/";
      }
    }
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <Switch basename="/" history={history}>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={LogOut} />
          <Route
            path="/aboutus"
            render={props => <AboutUs user={user} {...props} />}
          />

          <Route
            path="/plan-subscribe"
            render={props => {
              if (!auth.getCurrentUser()) return <Redirect to="/login" />;
              return <Subscribe user={user} {...props} />;
            }}
          />

          <Route path="/faq" render={props => <Faq user={user} {...props} />} />

          <Route
            path="/contactus"
            render={props => <ContactUs user={user} {...props} />}
          />

          <Route
            path="/quiz"
            render={props => <GetStarted user={user} {...props} />}
          />

          <Route
            path="/forgotpassword"
            render={props => <ForgotPassword user={user} {...props} />}
          />

          <Route
            path="/termsandcondition"
            render={props => <TermsAndCondition user={user} {...props} />}
          />
          <Route
            path="/privacy-policy"
            render={props => <PrivacyPolicy user={user} {...props} />}
          />

          <Route
            path="/profile"
            render={props => {
              if (!auth.getCurrentUser()) return <Redirect to="/login" />;
              return <MyAccount user={user} {...props} />;
            }}
          />

          <Route
            exact
            path="/"
            render={props => <HomePage user={user} {...props} />}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
