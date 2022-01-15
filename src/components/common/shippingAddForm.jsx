import React, { Component } from "react";
import Joi from "joi-browser";
import order from "../../services/order";

class ShippingAddressForm extends Component {
  state = {
    addressDetails: {
      shippingName: "",
      shippingAddress: "",
      shippingCity: "",
      shippingState: "",
      shippingPostcode: "",
      shippingCountry: "USA",
      billingName: "",
      billingAddress: "",
      billingCity: "",
      billingState: "",
      billingPostcode: "",
      billingCountry: "USA"
    },
    error: {},
    orderDetails: {},
    shippingSuccessMessage: "",
    shippingErrorMessage: "",
    checked: false,
    formValid: false
  };

  schema = {
    shippingName: Joi.string()
      .required()
      .label("Shipping Name"),
    shippingAddress: Joi.string()
      .required()
      .label("Shipping Address"),
    shippingCity: Joi.string()
      .required()
      .label("Shipping City"),
    shippingState: Joi.string().required(),
    shippingPostcode: Joi.number()
      .required()
      .label("Shipping Postcode"),
    shippingCountry: Joi.string(),
    billingName: Joi.string()
      .required()
      .label("Billing Name"),
    billingAddress: Joi.string()
      .required()
      .label("Billing Address"),
    billingCity: Joi.string()
      .required()
      .label("Billing City"),
    billingState: Joi.string().required(),
    billingPostcode: Joi.number()
      .required()
      .label("Billing Postcode"),
    billingCountry: Joi.string()
  };

  handleCheck = () => {
    this.setState({ checked: !this.state.checked });
    const { addressDetails } = this.state;
    if (!this.state.checked) {
      let addressCopy = {
        shippingName: addressDetails.shippingName,
        shippingAddress: addressDetails.shippingAddress,
        shippingCity: addressDetails.shippingCity,
        shippingState: addressDetails.shippingState,
        shippingPostcode: addressDetails.shippingPostcode,
        shippingCountry: "USA",
        billingName: addressDetails.shippingName,
        billingAddress: addressDetails.shippingAddress,
        billingCity: addressDetails.shippingCity,
        billingState: addressDetails.shippingState,
        billingPostcode: addressDetails.shippingPostcode,
        billingCountry: "USA"
      };

      this.setState({
        addressDetails: addressCopy
      });
    } else {
      let addressCopy = {
        shippingName: addressDetails.shippingName,
        shippingAddress: addressDetails.shippingAddress,
        shippingCity: addressDetails.shippingCity,
        shippingState: addressDetails.shippingState,
        shippingPostcode: addressDetails.shippingPostcode,
        shippingCountry: "USA",
        billingName: "",
        billingAddress: "",
        billingCity: "",
        billingState: "",
        billingPostcode: "",
        billingCountry: "USA"
      };

      this.setState({
        addressDetails: addressCopy
      });
    }
  };

  validate = () => {
    const { addressDetails } = this.state;
    const result = Joi.validate(addressDetails, this.schema, {
      abortEarly: false
    });

    if (!result.error) {
      console.log("null");
      return null;
    }

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
    //console.log(error);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const error = { ...this.state.error };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) error[input.name] = errorMessage;
    else delete error[input.name];

    const addressDetails = { ...this.state.addressDetails };
    addressDetails[input.name] = input.value;
    this.setState({ addressDetails, error });
  };

  handleShipAddress = async () => {
    //e.preventDefault();

    try {
      const {
        user,
        selectedPlan,
        promoDiscountAmount,
        promocode,
        finalPaybleAmount,
        couponCodeApplied
      } = this.props;
      const { addressDetails } = this.state;

      console.log(addressDetails);

      const { data } = await order.createOrderSubscription(
        user,
        selectedPlan,
        addressDetails,
        promoDiscountAmount,
        promocode,
        finalPaybleAmount,
        couponCodeApplied
      );

      console.log(data);

      this.setState({
        orderDetails: data,
        shippingSuccessMessage: "Address saved please complete the payment",
        shippingErrorMessage: ""
      });
      localStorage.setItem("OID", data._id);
    } catch (ex) {
      this.setState({
        orderDetails: {},
        shippingSuccessMessage: "",
        shippingErrorMessage: "Something went wrong, please try again"
      });
    }
  };

  render() {
    const {
      addressDetails,
      error,
      shippingSuccessMessage,
      shippingErrorMessage,
      orderDetails,
      checked
    } = this.state;

    return (
      <React.Fragment>
        <div className="card-title">Shipping & Billing Address</div>
        <div className="card-body">
          <div className="row">
            <div className="col">
              {shippingSuccessMessage && (
                <div className="alert alert-success" role="alert">
                  {shippingSuccessMessage}
                </div>
              )}
              {shippingErrorMessage && (
                <div className="alert alert-danger" role="alert">
                  {shippingErrorMessage}
                </div>
              )}
            </div>
          </div>
          <React.Fragment>
            {!shippingSuccessMessage && (
              <form>
                <div className="row">
                  <div className="col-sm-12">
                    <h3>Shipping Address</h3>
                    <div className="row">
                      <div className="col">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Full Name"
                          name="shippingName"
                          value={addressDetails.shippingName}
                          onChange={this.handleChange}
                        />
                        <div className="invalid-feedback">
                          {error.shippingName}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Address"
                          name="shippingAddress"
                          value={addressDetails.shippingAddress}
                          onChange={this.handleChange}
                        />
                        <div className="invalid-feedback">
                          {error.shippingAddress}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="City"
                          name="shippingCity"
                          value={addressDetails.shippingCity}
                          onChange={this.handleChange}
                        />
                        <div className="invalid-feedback">
                          {error.shippingCity}
                        </div>
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="State"
                          name="shippingState"
                          value={addressDetails.shippingState}
                          onChange={this.handleChange}
                        />
                        <div className="invalid-feedback">
                          {error.shippingState}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Zip"
                          name="shippingPostcode"
                          value={addressDetails.shippingPostcode}
                          onChange={this.handleChange}
                        />
                        <div className="invalid-feedback">
                          {error.shippingPostcode}
                        </div>
                      </div>
                      <div className="col-sm">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Country"
                          name="shippingCountry"
                          value={addressDetails.shippingCountry}
                          onChange={this.handleChange}
                          disabled="disabled"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <h3>
                      <span className="checkBoxAdd">
                        <input
                          type="checkbox"
                          onChange={this.handleCheck}
                          defaultChecked={this.state.checked}
                        />{" "}
                        Use as my billing address{" "}
                      </span>
                    </h3>
                    <div
                      className={"billingArea " + (checked ? "hide" : "show")}
                    >
                      <h3>Billing Address </h3>
                      <div className="row">
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Full Name"
                            name="billingName"
                            value={addressDetails.billingName}
                            onChange={this.handleChange}
                          />
                          <div className="invalid-feedback">
                            {error.billingName}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Billing Address"
                            name="billingAddress"
                            value={addressDetails.billingAddress}
                            onChange={this.handleChange}
                          />
                          <div className="invalid-feedback">
                            {error.billingAddress}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Billing City"
                            name="billingCity"
                            value={addressDetails.billingCity}
                            onChange={this.handleChange}
                          />
                          <div className="invalid-feedback">
                            {error.billingCity}
                          </div>
                        </div>
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Billing State"
                            name="billingState"
                            value={addressDetails.billingState}
                            onChange={this.handleChange}
                          />
                          <div className="invalid-feedback">
                            {error.billingState}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Zip"
                            name="billingPostcode"
                            value={addressDetails.billingPostcode}
                            onChange={this.handleChange}
                          />
                          <div className="invalid-feedback">
                            {error.billingPostcode}
                          </div>
                        </div>
                        <div className="col-sm">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Country"
                            name="billingCountry"
                            value={addressDetails.billingCountry}
                            onChange={this.handleChange}
                            disabled="disabled"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={this.handleShipAddress}
                  className="stripeButton floatRight"
                  disabled={this.validate()}
                >
                  Next
                </button>
              </form>
            )}
            {shippingSuccessMessage && (
              <div className="savedAddress">
                <p>
                  <span>Name:</span> {orderDetails.shippingName}
                </p>
                <p>
                  <span>Address:</span> {orderDetails.shippingAddress}
                </p>
                <p>
                  <span>City & State:</span> {orderDetails.shippingCity},{" "}
                  {orderDetails.shippingState}
                </p>
                <p>PIN: {orderDetails.shippingPostcode}</p>
                <p>
                  <span>Country:</span>
                  {orderDetails.shippingCountry}
                </p>
              </div>
            )}
          </React.Fragment>
        </div>
      </React.Fragment>
    );
  }
}

export default ShippingAddressForm;
