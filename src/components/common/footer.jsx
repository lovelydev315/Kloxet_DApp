import React, { Component } from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import newsLetter from "../../services/newsLetter";
import footer_logo from "../../images/footer_logo.png";

class Footer extends Component {
  state = {
    account: { email: "" },
    error: {},
    successMessage: ""
  };
  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email")
  };

  validate = () => {
    const { account } = this.state;
    const result = Joi.validate(account, this.schema, { abortEarly: false });

    if (!result.error) return null;

    const error = {};
    for (let item of result.error.details) {
      error[item.path[0]] = item.message;
    }
    return error;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const error = { ...this.state.error };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) error[input.name] = errorMessage;
    else delete error[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, error });
  };
  handleSubmit = async () => {
    console.log(this.state.account);
    try {
      const { data } = await newsLetter.subscripeNewsletter(this.state.account);
      this.setState({
        successMessage: data.title
      });
    } catch (ex) {
      alert("You are already subscribed");
    }
  };
  render() {
    const { account, error, successMessage } = this.state;
    return (
      <footer>
        <div className="footerTopArea">
          <div className="container">
            <div className="footerLogoArea">
              <img src={footer_logo} alt="footer_logo" />
            </div>
            <div className="newsLetterArea">
              <h5>Newsletter</h5>
              <p>Signup for our upcoming newsletter</p>
              <div className="emailSignUp">
                <input
                  type="text"
                  className="emailSignupField"
                  id="email"
                  name="email"
                  value={account.email}
                  placeholder="Email"
                  onChange={this.handleChange}
                />
                <button
                  onClick={this.handleSubmit}
                  disabled={this.validate()}
                  className="emailSubscribeButton"
                >
                  Subscribe
                </button>
              </div>
              <div className="invalid-feedback">{error.email}</div>
              <div className="success">{successMessage}</div>
            </div>
            <div className="contactUs">
              <h5>Contact Us</h5>
              <p>services@kloxet.com</p>
              <ul className="socialMedia">
                <li>
                  <a
                    href="https://www.facebook.com/Kloxet/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-facebook" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/kloxetofficial/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-instagram" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="clear" />
        <ul className="terms">
          <li>
            <Link to="/termsandcondition">Terms &amp; Conditions</Link>
          </li>
          <li>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </li>
          <li>
            <Link className="last-child" to="/">
              Fashion Blog
            </Link>
          </li>
        </ul>
        <p className="copyRightText">
          Copyright &copy; 2019 kloxet.All Rights Reserved.
        </p>
      </footer>
    );
  }
}

export default Footer;
