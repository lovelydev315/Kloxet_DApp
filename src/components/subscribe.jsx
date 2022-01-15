import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import _ from "lodash";
import subscribtion from "../services/subscribtion";
import Joi from "joi-browser";
import order from "../services/order";
import StylesDefineYouBest from "./common/styleDefinesYou";
import CheckoutForm from "./CheckoutForm";
import HeaderCommon from "./common/header-login";
import Footer from "./common/footer";

import subscribe_img from "../images/subscribe-image-1000x560.jpg";
//import stripe_image from "../images/powered_by_stripe.svg";

class Subscribe extends Component {
  state = {
    subscribed: false,
    couponCode: "",
    couponCodeApplied: false,
    validCouponDetails: {},
    finalAmount: "",
    couponMessageError: "",
    couponMessageSuccess: "",
    subscribtionPlans: [],
    selectedPlan: {},
    selectedPlanIndex: 0,
    promoDiscountAmount: 0,
    finalPaybleAmount: "",
    openPromo: false,
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
    formValid: false,
    submitting: false
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
      console.log(ex);
      this.setState({
        orderDetails: {},
        shippingSuccessMessage: "",
        shippingErrorMessage: "Something went wrong, please try again"
      });
    }
  };

  async componentDidMount() {
    try {
      const { data } = await subscribtion.getSubscribtionPlan();
      this.setState({
        subscribtionPlans: data.plans,
        selectedPlan: data.plans[0],
        finalPaybleAmount: data.plans[0].price
      });
    } catch (ex) {}
  }

  handleSubscription = () => {
    this.setState({
      subscribed: true
    });
  };

  validateCouponForm = () => {
    const { couponCode } = this.state;
    if (couponCode !== "") {
      return false;
    } else {
      return true;
    }
  };

  validateSubscribeButton = () => {
    const { selectedPlan } = this.state;
    if (!_.isEmpty(selectedPlan)) {
      return false;
    } else {
      return true;
    }
  };

  handleSelectPlan = plan => {
    const index = this.state.subscribtionPlans.indexOf(plan);
    console.log(index);

    const selectedPlan = plan;
    this.setState({ selectedPlan, selectedPlanIndex: index });
  };

  couponCode = e => {
    const couponCode = e.currentTarget.value;
    this.setState({ couponCode });
    this.validateCouponForm();
  };

  openPromo = () => {
    this.setState({ openPromo: true });
  };

  validatePromoCode = async e => {
    this.setState({ submitting: true });
    e.preventDefault();
    /* if (this.validateCouponForm()) {
      alert("Enter your coupon");
      return;
    }
    if (this.validate() !== null) {
      alert("Enter your Address");
      return;
    } */
    try {
      const { data } = await order.validatePromoCode(
        this.props.user,
        this.state.couponCode
      );
        
      this.setState({
        couponCodeApplied: true,
        openPromo: false,
        validCouponDetails: data,
        couponMessageError: "",
        submitting: false
      });

      this.calculateDiscount();
      
    } catch (ex) {
      console.log(ex);
      this.setState({
        couponMessageError: "Invalid Promo Code!"
      });
    }
    /* try {
      const { user } = this.props;
      const {
        addressDetails,
        selectedPlan,
        promoDiscountAmount,
        promocode,
        finalPaybleAmount,
        couponCodeApplied
      } = this.state;

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
      try {
        const { data } = await order.validatePromoCode(
          this.props.user,
          this.state.couponCode
        );

        this.setState({
          couponCodeApplied: true,
          openPromo: false,
          validCouponDetails: data,
          couponMessageError: ""
        });
        try {
          const { data } = await order.applyPromoCode(this.state.couponCode);
          console.log(data);
          this.calculateDiscount();
        } catch (ex) {
          console.log(ex);
        }
      } catch (ex) {
        console.log(ex);
        this.setState({
          couponMessageError: "Invalid Promo Code!"
        });
      }
    } catch (ex) {
      console.log(ex);
      this.setState({
        orderDetails: {},
        shippingSuccessMessage: "",
        shippingErrorMessage: "Something went wrong, please try again"
      });
    } */
  };

  handleRemovePromo = () => {
    const { selectedPlan } = this.state;
    this.setState({
      couponCodeApplied: false,
      openPromo: true,
      validCouponDetails: {},
      couponMessageError: "",
      couponCode: "",
      finalPaybleAmount: selectedPlan.price
    });
  };

  //removePromoCode = () => {};

  calculateDiscount = () => {
    const { validCouponDetails, selectedPlan } = this.state;
    if (validCouponDetails.discountType === "Percentage") {
      const discount = (selectedPlan.price * validCouponDetails.amount) / 100;

      let finalPaybleAmount = selectedPlan.price - discount;

      this.setState({ promoDiscountAmount: discount, finalPaybleAmount });
    } else {
      const flatDiscount = selectedPlan.price - validCouponDetails.amount;
      let finalPaybleAmount = selectedPlan.price - flatDiscount;

      this.setState({ promoDiscountAmount: flatDiscount, finalPaybleAmount });
    }
  };

  couponButtonValidation = () => {
    if (
      //this.validate() === null &&
      !this.validateCouponForm() &&
      !this.state.submitting
    ) {
      console.log("valid ");
      return false;
    } else {
      console.log("not valid ");
      return true;
    }
  };

  render() {
    const {
      couponMessageError,
      selectedPlan,
      subscribed,
      subscribtionPlans,
      couponCodeApplied,
      validCouponDetails,
      couponCode,
      selectedPlanIndex,
      promoDiscountAmount,
      finalPaybleAmount,
      openPromo,
      addressDetails,
      error,
      shippingSuccessMessage,
      shippingErrorMessage,
      checked
    } = this.state;
    const { user } = this.props;
    return (
      <React.Fragment>
        <HeaderCommon />
        <div className="subscribeArea">
          {!subscribed && (
            <div className="mainSubscribeArea">
              <div className="subscribe_img">
                <img src={subscribe_img} alt="Subscribe img" />
              </div>

              <div className="subscribe_right">
                <h1>
                  Choose Your
                  <br />
                  <span>Subscription</span> Plan
                </h1>
                <div className="commonPlanAreaMain">
                  {subscribtionPlans.map((plan, index) => (
                    <div key={plan._id} className="commonPlanArea">
                      <label
                        className={selectedPlanIndex === index ? "active" : ""}
                        htmlFor={plan.subscriptionId}
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          name="subscribtionRadio"
                          id={plan.subscriptionId}
                          value={plan.price}
                          onChange={() => this.handleSelectPlan(plan)}
                        />
                        <p className="planText">
                          <span className="price">${plan.price}/</span>
                          {plan.interval}
                        </p>
                        <p className="planDetails">
                          Receive 4 to 5 fashion jewelery items on the 15th of
                          each month.Delivered straight to your mail box
                        </p>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="subscriptionForm">
                  <button
                    onClick={this.handleSubscription}
                    disabled={this.validateSubscribeButton()}
                    className="subscribe_button"
                  >
                    proceed
                  </button>
                </div>
                <p className="termsSubs">
                  * Cancel Anytime, No Obligations & Renews Automatically. FREE
                  SHIPPING!
                </p>
              </div>
            </div>
          )}

          {subscribed && (
            <div className="container">
              <div className="row">
                <div className="col-sm-8">
                  <div className="card shippingAddress">
                    <React.Fragment>
                      <div className="card-title">
                        Shipping & Billing Address
                      </div>
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
                          <form>
                            <fieldset disabled={shippingSuccessMessage}>
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
                                    className={
                                      "billingArea " +
                                      (checked ? "hide" : "show")
                                    }
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

                              {/* <button
                  onClick={this.handleShipAddress}
                  className="stripeButton floatRight"
                  disabled={this.validate()}
                >
                  Next
                </button> */}
                            </fieldset>
                          </form>

                          {/* {shippingSuccessMessage && (
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
            )} */}
                        </React.Fragment>
                      </div>
                    </React.Fragment>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="card styleDefinesYou">
                    <StylesDefineYouBest
                      selectedPlan={selectedPlan}
                      user={user}
                      promocode={couponCode}
                      promoDiscountAmount={promoDiscountAmount}
                      finalPaybleAmount={finalPaybleAmount}
                      couponCodeApplied={couponCodeApplied}
                    />
                    <div className="card">
                      <div className="card-title textLeft noBGcard">
                        Payment Details
                        <span className="stripePowerlogo">
                          <i className="fa fa-cc-visa"></i>
                          <i className="fa fa-cc-amex"></i>
                          <i className="fa fa-cc-diners-club"></i>
                          <i className="fa fa-cc-discover"></i>
                          <i className="fa fa-cc-mastercard"></i>
                        </span>
                      </div>
                      <div className="card-body">
                        <div className="stripeArea">
                          <StripeProvider apiKey="pk_test_MKEzrZ9DbMw1aLwuAqisd1fp">
                            <div className="example">
                              <div className="subscriptionForm">
                                {!couponCodeApplied && (
                                  <h3 onClick={this.openPromo}>
                                    Do you have a Promo code?
                                  </h3>
                                )}
                                <form className="form-inline couponCodeApply">
                                  {couponMessageError && (
                                    <div
                                      className="invalid-feedback"
                                      onClick={this.removePromoCode()}
                                    >
                                      <i className="fa fa-times" />{" "}
                                      {couponMessageError}
                                    </div>
                                  )}
                                  {couponCodeApplied && (
                                    <React.Fragment>
                                      <div className="valid-feedback showMSG">
                                        <p>
                                          <i className="fa fa-check" />{" "}
                                          <span>
                                            {validCouponDetails.promocode}
                                          </span>{" "}
                                          - Applied successfully{" "}
                                          <span className="amountDiscount">
                                            - ${promoDiscountAmount}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="couponApplied">
                                        <p>
                                          {validCouponDetails.amount}
                                          {validCouponDetails.discountType ===
                                          "Percentage"
                                            ? "% off on your order"
                                            : " USD off on your order"}
                                          <span
                                            className="couponRemoved"
                                            onClick={this.handleRemovePromo}
                                          >
                                            Remove
                                          </span>
                                        </p>
                                      </div>
                                    </React.Fragment>
                                  )}
                                  {openPromo && (
                                    <React.Fragment>
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="couponCode"
                                        placeholder="Coupon Code"
                                        onChange={this.couponCode}
                                        value={couponCode}
                                      />
                                      <button
                                        type="submit"
                                        onClick={this.validatePromoCode}
                                        disabled={this.couponButtonValidation()}
                                        className="apply_copuponButton"
                                      >
                                        Apply
                                      </button>
                                    </React.Fragment>
                                  )}
                                </form>
                              </div>
                              <Elements>
                                <CheckoutForm
                                  finalPaybleAmount={finalPaybleAmount}
                                  allData={this.state}
                                  formValid={this.validate()}
                                  user={user}
                                />
                              </Elements>
                            </div>
                          </StripeProvider>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </React.Fragment>
    );
  }
}

export default Subscribe;
