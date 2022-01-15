import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Joi from "joi-browser";
import contactUsService from "../services/contactUs";
import HeaderCommon from "./common/staticHeader";
import Footer from "./common/footer";

class ContactUs extends Component {
  state = {
    contactDetails: {
      name: "",
      email: "",
      contactNumber: "",
      subject: "",
      message: ""
    },
    error: {},
    serverError: "",
    sucessMessage: "",
    messageSent: false
  };

  schema = {
    name: Joi.string()
      .required()
      .min(4)
      .label("Name"),
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    contactNumber: Joi.string()
      .required()
      .min(10)
      .label("Mobile"),
    subject: Joi.string()
      .required()
      .min(10)
      .label("Subject"),
    message: Joi.string()
      .required()
      .min(50)
      .label("Message")
  };

  validate = () => {
    const { contactDetails } = this.state;
    const result = Joi.validate(contactDetails, this.schema, {
      abortEarly: false
    });

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

    const contactDetails = { ...this.state.contactDetails };
    contactDetails[input.name] = input.value;
    this.setState({ contactDetails, error });
  };

  handleSubmit = async e => {
    e.preventDefault();
    console.log(this.state.contactDetails);

    try {
      const { data } = await contactUsService.contactUsService(
        this.state.contactDetails
      );
      console.log(data);
      this.setState({
        messageSent: true,
        contactDetails: {
          name: "",
          email: "",
          contactNumber: "",
          subject: "",
          message: ""
        }
      });
    } catch (ex) {
      console.log(ex.response.data);
    }
  };

  render() {
    const { contactDetails, error, messageSent } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Kloxet | Contact Us Page</title>
          <meta name="keywords" content="" />
          <meta name="description" content="" />
        </Helmet>
        <HeaderCommon user={this.props.user} location={this.props.location} />
        <div className="container">
          <div className="aboutUsContent contactUsForm">
            {messageSent && (
              <div className="alert alert-success">
                Thanks for contacting us, we will get back to you ASAP!
              </div>
            )}
            <h1>Contact Us</h1>
            <p>
              If you have questions or comments, please don’t hesitate to
              contact us.
            </p>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Full Name"
                  name="name"
                  value={contactDetails.name}
                  onChange={this.handleChange}
                />
                <div className="invalid-feedback">{error.name}</div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="name@example.com"
                  name="email"
                  value={contactDetails.email}
                  onChange={this.handleChange}
                />
                <div className="invalid-feedback">{error.email}</div>
              </div>

              <div className="form-group">
                <label htmlFor="contactNumber">Mobile</label>
                <input
                  type="text"
                  className="form-control"
                  id="contactNumber"
                  placeholder="Contact Number"
                  name="contactNumber"
                  value={contactDetails.contactNumber}
                  onChange={this.handleChange}
                />
                <div className="invalid-feedback">{error.contactNumber}</div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  placeholder="Subject"
                  name="subject"
                  value={contactDetails.subject}
                  onChange={this.handleChange}
                />
                <div className="invalid-feedback">{error.subject}</div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="5"
                  name="message"
                  value={contactDetails.message}
                  onChange={this.handleChange}
                />
                <div className="invalid-feedback">{error.message}</div>
              </div>
              <button
                type="submit"
                disabled={this.validate()}
                className="btn btn-primary loginButton contactUsButton"
              >
                Send
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default ContactUs;
