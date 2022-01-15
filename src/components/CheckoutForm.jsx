import React, { Component } from "react";
import {
  /* CardNumberElement,
  CardExpiryElement,
  CardCVCElement, */
  injectStripe
} from "react-stripe-elements";
import CCUtil from '../ccutil';
//import _ from "lodash";
import order from "../services/order";

class CheckoutForm extends Component {
  /* state = {
    stripeButtonInvalid: true,
    submitting: false
  }; */
  constructor(props) {
    super(props);
    this.state = {
      stripeButtonInvalid: true,
      cardDetailsTouched: false, 
      cardDetailsValid: false,
      cardExpTouched: false,
      cardExpValid: false, 
      cvvTouched: false,
      cvvValid: false,
      submitting: false, 
      complete: false, 
      cardNum: '', 
      ccExpiryMonth: '', 
      ccExpiryYear: '', 
      cvcNum: ''
    };
    this.submit = this.submit.bind(this);
  }

  handleCardDetailsInput = (event, type, setDirty) => {
    this.setState({[type]: event.currentTarget.value, [setDirty]: true});
    //console.log(this.state);
  }

  validateCardNum = (event) => {
    //console.log(event);
    if(CCUtil.validateCreditCardNumber(this.state.cardNum)) {
      this.setState({cardDetailsValid: true});
    }else{
      this.setState({cardDetailsValid: false});
    }
  }
  validateCardExpiry = (event) => {
    //console.log(event);
    if(CCUtil.validateCardExpiry(this.state.ccExpiryMonth, this.state.ccExpiryYear)) {
      this.setState({cardExpValid: true});
    }else{
      this.setState({cardExpValid: false});
    }
  }

  validateCVVNum = (event) => {
    //console.log(event);
    if(CCUtil.validateCardCVV(this.state.cvcNum)) {
      this.setState({cvvValid: true});
    }else{
      this.setState({cvvValid: false});
    }
  }

  payButtonValidation = () => {
    // console.log(this.props.formValid);
    // console.log(this.state.stripeButtonInvalid);

    if (
      this.props.formValid === null &&
      this.state.cardDetailsValid && 
      this.state.cardExpValid &&
      this.state.cvvValid &&
      //this.state.stripeButtonInvalid === false &&
      !this.state.submitting
    ) {
      return false;
    } else {
      return true;
    }
  };

  ///

  async submit(ev) {
    // User clicked submit
    this.setState({ submitting: true });
    try {
      const { user } = this.props;
      const {
        selectedPlan,
        promoDiscountAmount,
        couponCode,
        finalPaybleAmount,
        couponCodeApplied,
        addressDetails
      } = this.props.allData;
      const cardDetails = {sourceNo: this.state.cardNum, sourceExpMonth: this.state.ccExpiryMonth, sourceExpYear: this.state.ccExpiryYear, sourceCvc: this.state.cvcNum};

      const { data } = await order.createOrderSubscription(
        user,
        selectedPlan,
        addressDetails,
        promoDiscountAmount,
        couponCode,
        finalPaybleAmount,
        couponCodeApplied,
        cardDetails
      );

      console.log(data);

      localStorage.setItem("OID", data._id);
      //let { token } = await this.props.stripe.createToken();
      //if (token) await order.updateSubscriptionOrder();
      this.setState({ submitting: false });
      window.location = "/";
    } catch (ex) {
      this.setState({ submitting: false });
    }
    /* if (this.props.allData.couponCodeApplied) {
      try {
         let { token } = await this.props.stripe.createToken();
        if (token) 
        await order.updateSubscriptionOrder();
        window.location = "/";
        return;
      } catch (ex) {
        console.log(ex);
      }
    } else {
      try {
        const { user } = this.props;
        const {
          selectedPlan,
          promoDiscountAmount,
          promocode,
          finalPaybleAmount,
          couponCodeApplied,
          addressDetails
        } = this.props.allData;
        const cardDetails = {sourceNo: this.state.cardNum, sourceExpMonth: this.state.ccExpiryMonth, sourceExpYear: this.state.ccExpiryYear, sourceCvc: this.state.cvcNum};

        const { data } = await order.createOrderSubscription(
          user,
          selectedPlan,
          addressDetails,
          promoDiscountAmount,
          promocode,
          finalPaybleAmount,
          couponCodeApplied,
          cardDetails
        );

        console.log(data);

        localStorage.setItem("OID", data._id);
        //let { token } = await this.props.stripe.createToken();
        //if (token) await order.updateSubscriptionOrder();
        window.location = "/";
      } catch (ex) {
        this.setState({ submitting: false });
      }
    } */
  }

  render() {
    /* const handleBlur = () => {
      console.log("[blur]");
    };
    const handleChange = change => {
      console.log(change);
      if (_.isEmpty(change.error)) {
        console.log("no error");
        this.setState({
          stripeButtonInvalid: false
        });
      } else {
        this.setState({
          stripeButtonInvalid: true
        });
      }
    };

    const handleFocus = () => {
      //console.log("[focus]");
    };
    const handleReady = () => {
      //console.log("[ready]");
    }; */

    const { 
      cardDetailsValid,
      cardDetailsTouched,
      cvvValid,
      cvvTouched,
      cardExpValid,
      cardExpTouched
    } = this.state;

    /* const createOptions = (fontSize, padding) => {
      return {
        style: {
          base: {
            fontSize,
            color: "#424770",
            letterSpacing: "0.025em",
            fontFamily: "Source Code Pro, monospace",
            "::placeholder": {
              color: "#aab7c4"
            },
            padding
          },
          invalid: {
            color: "#9e2146"
          }
        }
      };
    }; */

    return (
      <div className="checkout">
        
        <div className="row">
          <div className="form-group col">
            <label htmlFor="cardNum">Card number</label>
              <input type="tel" onChange={event => this.handleCardDetailsInput(event, 'cardNum', 'cardDetailsTouched')} onBlur={event => this.validateCardNum(event)} name="carNum" maxLength="16" className={"form-control" + ((cardDetailsTouched && !cardDetailsValid) ? ' is-invalid': '')} id="cardNum" placeholder="1111 1111 1111 1111"/>
              <small id="cardHelp" className="form-text text-muted">We'll never share your card details with anyone else.</small>
              {/* <CardNumberElement
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onReady={handleReady}
                {...createOptions(this.props.fontSize)}
              /> */}
          </div>
        </div>
        <div className="row">
          <div className="col-6 form-group">
            <label htmlFor="ccExpiryMonth">Month</label>
              <input type="tel" onChange={event => this.handleCardDetailsInput(event, 'ccExpiryMonth', 'cardExpTouched')} name="ccExpiryMonth" id="ccExpiryMonth" maxLength="2" className={"form-control" + ((cardExpTouched && !cardExpValid) ? ' is-invalid': '')} onBlur={event => this.validateCardExpiry(event)} placeholder="01"/>
          </div>
          <div className="col-6 form-group">
              <label htmlFor="ccExpiryYear">Year</label>
              <input type="tel" onChange={event => this.handleCardDetailsInput(event, 'ccExpiryYear', 'cardExpTouched')} name="ccExpiryYear" id="ccExpiryYear" maxLength="4" className={"form-control" + ((cardExpTouched && !cardExpValid) ? ' is-invalid': '')} onBlur={event => this.validateCardExpiry(event)} placeholder="2020"/>
              {/* <CardExpiryElement
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onReady={handleReady}
                {...createOptions(this.props.fontSize)}
              /> */}
          </div>
          </div>
          <div className="row">
          <div className="col-6 form-group">
            <label htmlFor="cvcNum">CVC</label>
              {/* <CardCVCElement
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onReady={handleReady}
                {...createOptions(this.props.fontSize)}
              /> */}
              <input type="text" className={"form-control" + ((cvvTouched && !cvvValid) ? ' is-invalid' : '')} onChange={event => this.handleCardDetailsInput(event, 'cvcNum', 'cvvTouched')} name="cvcNum" maxLength="3" id="cvcNum" onBlur={event => this.validateCVVNum(event)} />
          </div>
        </div>
        <button disabled={this.payButtonValidation()} onClick={this.submit}>
          Pay & Subscribe
        </button>
        
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
