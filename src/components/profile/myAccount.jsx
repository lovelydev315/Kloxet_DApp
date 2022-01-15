import Joi from "joi-browser";
import _ from "lodash";
import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Modal } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import profilePic from "../../images/profilepic.jpg";
import PhoneInput from "react-phone-input-2";
import arrow from "../../images/red_downArrow.png";
import auth from "../../services/authServices";
import BOMService from "../../services/bom";
import order from "../../services/order";
import Bom from "../common/Bom";
import Footer from "../common/footer";
import Loading from "../common/loading";
import HeaderCommon from "../common/staticHeader";
import "./profile.css";

class MyAccount extends Component {
  state = {
    tabNumber: 1,
    currentUserDetails: [],
    pageLoaded: false,
    profileEditMode: false,
    startDate: "",
    account: {
      firstName: "",
      lastName: "",
      avatar: null
    },
    mobile: "",
    shippingDetails: {
      name: "",
      address: "",
      city: "",
      pin: "",
      state: "",
      country: "USA"
    },
    dob: "",
    showDate: "",
    error: {},
    currentUserOrderDetails: [],
    bomYears: [],
    boms: [],
    isBOMModalVisible: false,
    selectedBOMItem: null,
    newlyAddedBOMComment: "",
    subscribed: false,
    editShippingADD: false,
    submitting: false,
    countries: ["us"]
  };

  schema = {
    firstName: Joi.string()
      .required()
      .label("Name"),
    lastName: Joi.string()
      .required()
      .label("Name"),
    avatar: Joi.any().label("Avatar")
  };

  loadUpdatedUserData = async () => {
    try {
      const { data: currentUserDetails } = await auth.getCurrentUserDetails();
      this.setState({
        currentUserDetails,
        pageLoaded: true
      });
    } catch (ex) {
      this.setState({ pageLoaded: true });
    }
  };

  loadUpdatedUserAdd = async () => {
    try {
      const { data } = await order.getCurrentUserOrder();

      const shippingDetailsData = {
        name: data.orderResponse[0].shippingName || "",
        address: data.orderResponse[0].shippingAddress || "",
        city: data.orderResponse[0].shippingCity || "",
        pin: data.orderResponse[0].shippingPostcode || "",
        state: data.orderResponse[0].shippingState || "",
        country: data.orderResponse[0].shippingCountry || ""
      };
      this.setState({
        shippingDetails: shippingDetailsData,
        currentUserOrderDetails: data.orderResponse,
        pageLoaded: true
      });
    } catch (ex) {
      this.setState({ pageLoaded: true });
    }
  };

  getCurrentDate(timestamp) {
    const dtObkj = new Date(timestamp);
    return dtObkj.toLocaleString();
  }

  async componentDidMount() {
    try {
      const { data: currentUserDetails } = await auth.getCurrentUserDetails();

      console.log(currentUserDetails);

      const accountData = {
        firstName: currentUserDetails.firstName || "",
        lastName: currentUserDetails.lastName || ""
      };
      const mobile = currentUserDetails.mobile || "";
      let dob = currentUserDetails.dob ? new Date(currentUserDetails.dob) : "";
      let showDateN = null;
      if (dob !== "") {
        showDateN = dob.toLocaleDateString();
      }
      let orderData = null,
        processedBomData = null,
        bomYears = null;
      try {
        const { data } = await order.getCurrentUserOrder();
        console.log(data);
        orderData = data;
      } catch (orderEx) {
        console.log(orderEx);
      }
      try {
        if (currentUserDetails.username) {
          const { data: bd } = await BOMService.getBOMForUser(
            currentUserDetails.username
          );
          const { bomDataSrc, bomYearsSrc } = this._processBOMData(bd);
          processedBomData = bomDataSrc;
          bomYears = bomYearsSrc;
        }
      } catch (bomEx) {
        console.log(bomEx);
      }

      if (orderData.orderResponse[0]) {
        const shippingDetailsData = {
          name: orderData.orderResponse[0].shippingName || "",
          address: orderData.orderResponse[0].shippingAddress || "",
          city: orderData.orderResponse[0].shippingCity || "",
          pin: orderData.orderResponse[0].shippingPostcode || "",
          state: orderData.orderResponse[0].shippingState || "",
          country: orderData.orderResponse[0].shippingCountry || ""
        };
        this.setState({
          currentUserDetails,
          account: accountData,
          mobile,
          dob,
          showDate: showDateN,
          currentUserOrderDetails: orderData.orderResponse,
          shippingDetails: shippingDetailsData,
          bomYears: bomYears,
          boms: processedBomData
        });
      } else {
        const shippingDetailsData = {
          name: "",
          address: "",
          city: "",
          pin: "",
          state: "",
          country: "USA"
        };
        this.setState({
          currentUserDetails,
          account: accountData,
          dob,
          showDate: showDateN,
          currentUserOrderDetails: orderData.orderResponse,
          shippingDetails: shippingDetailsData,
          bomYears: bomYears,
          boms: processedBomData
        });
      }

      //console.log(this.state.currentUserDetails);

      if (this.state.currentUserOrderDetails.length > 0) {
        this.setState({
          subscribed: true
        });
      } else {
        this.setState({
          subscribed: false
        });
      }
    } catch (ex) {
      console.log(ex);
    } finally {
      this.setState({
        pageLoaded: true
      });
    }
  }

  _processBOMData(bomData) {
    let processedBomData = {},
      bomYears = [];
    if (bomData.bomResult && bomData.bomResult instanceof Array) {
      bomData.bomResult.forEach(dataItem => {
        const monthYearParsed = dataItem.selectedMonthYear.split("-");
        if (dataItem.selectedMonthYear && monthYearParsed.length > 1) {
          const year = monthYearParsed[1];
          if (bomYears.indexOf(year) === -1) {
            bomYears.push(year);
          }
          if (!processedBomData[year]) {
            processedBomData[year] = [];
          }
          const monthName = BOMService.getMonthName(monthYearParsed[0]);
          const addedComment = "";
          const processedBomItem = Object.assign({}, dataItem, {
            monthName,
            year,
            addedComment
          });
          processedBomData[year].push(processedBomItem);
        }
      });
    }
    return { processedBomData, bomYears };
  }

  constructor(props) {
    super(props);

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleBOMModalClose = this.handleBOMModalClose.bind(this);
    this.openBOMModal = this.openBOMModal.bind(this);
    this.postBOMComment = this.postBOMComment.bind(this);
    this.updateSelectedBOMComment = this.updateSelectedBOMComment.bind(this);
    this.handleUploadAvatar = this.handleUploadAvatar.bind(this);
    this.handleUploadAvatar2 = this.handleUploadAvatar2.bind(this);
    this.handleDOBChange = this.handleDOBChange.bind(this);
  }

  registerLocale() {}

  handleDateChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleDOBChange(date) {
    this.setState({ dob: date });
  }

  handleTab = async currentTab => {
    this.setState({ tabNumber: currentTab });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  validate = () => {
    const { account } = this.state;
    const result = Joi.validate(account, this.schema, { abortEarly: false });

    //console.log(result);

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

    //console.log(this.state.account);
  };

  handleChange2 = ({ currentTarget: input }) => {
    const shippingDetails = { ...this.state.shippingDetails };
    shippingDetails[input.name] = input.value;
    this.setState({ shippingDetails });

    //console.log(this.state.account);
  };

  handleChange3 = value => {
    this.setState({
      mobile: value
    });
  };

  editProfile = () => {
    this.setState({ profileEditMode: true });
  };
  cancelEdit = () => {
    this.setState({ profileEditMode: false });
  };

  updateUserData = async () => {
    const { account, dob, mobile } = this.state;
    try {
      const { data } = await auth.updateCurrentUserData(account, mobile, dob);
      console.log(data);
      this.setState({ profileEditMode: false });
      this.loadUpdatedUserData();
    } catch (ex) {
      console.log(ex);
    }
    window.location = "/profile";
  };

  updateUserShippingAdd = async () => {
    this.setState({
      submitting: true
    });
    const { shippingDetails, currentUserOrderDetails } = this.state;

    try {
      const { data } = await auth.updateCurrentUserShipADD(
        shippingDetails,
        currentUserOrderDetails
      );

      console.log(data);

      this.setState({ editShippingADD: false });
      this.setState({
        submitting: false
      });
      this.loadUpdatedUserAdd();
    } catch (ex) {
      console.log(ex);
      this.setState({
        submitting: false
      });
    }
  };

  handleCancelSubscription = async () => {
    try {
      const { data } = await order.cancelSubscriptionOrder(
        this.state.currentUserOrderDetails[0].stripeSubcriptionId,
        this.state.currentUserOrderDetails[0]._id
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  handleBOMModalClose() {
    this.setState({
      isBOMModalVisible: false
    });
  }

  openBOMModal(bomItem) {
    this.setState({
      selectedBOMItem: bomItem,
      isBOMModalVisible: true
    });
  }

  updateSelectedBOMComment(event) {
    const addedComment = event.target.value;
    this.setState({
      newlyAddedBOMComment: addedComment
    });
  }

  async postBOMComment(event) {
    event.preventDefault();
    const { data: BOMItemUpdateResp } = await BOMService.postBOMItemComment(
      {
        newlyAddedBOMComment: {
          title: this.state.newlyAddedBOMComment,
          body: this.state.newlyAddedBOMComment,
          createdOn: Date.now()
        }
      },
      this.state.selectedBOMItem._id
    );
    if (BOMItemUpdateResp.title && BOMItemUpdateResp.BOMUpdateResult) {
      //this.setState({selectedBOMItem: BOMItemUpdateResp.bomItem});
      console.log("updated successfully");
      const { data: bomData } = await BOMService.getBOMForUser(
        this.state.currentUserDetails.username
      );
      const { processedBomData, bomYears } = this._processBOMData(bomData);

      this.setState({
        bomYears: bomYears,
        boms: processedBomData,
        selectedBOMItem: BOMItemUpdateResp.BOMUpdateResult,
        newlyAddedBOMComment: ""
      });
    }
  }

  handleUploadAvatar(event) {
    const fileData = event.target.files[0];
    const account = { ...this.state.account };
    account.avatar = fileData;
    this.setState({ account });
  }
  handleUploadAvatar2 = async event => {
    const fileData = event.target.files[0];
    const { account, dob, mobile } = this.state;
    account.avatar = fileData;
    this.setState({ account });
    try {
      const { data } = await auth.updateCurrentUserData(account, mobile, dob);
      console.log(data);
      this.setState({ profileEditMode: false });
      this.loadUpdatedUserData();
    } catch (ex) {
      console.log(ex);
    }
  };

  editShippingADD = () => {
    this.setState({
      editShippingADD: true
    });
  };

  cancelEditShipping = () => {
    this.setState({
      editShippingADD: false
    });
  };

  render() {
    const {
      tabNumber,
      account,
      showDate,
      error,
      currentUserOrderDetails,
      bomYears,
      boms,
      isBOMModalVisible,
      selectedBOMItem,
      newlyAddedBOMComment,
      subscribed,
      editShippingADD,
      shippingDetails,
      submitting
    } = this.state;
    //const { user } = this.props;
    const { currentUserDetails: user } = this.state;
    //if (user.dob) {
    //const dob = user.dob.toLocaleDateString();

    // const dob = user.dob.split("T")[0];
    // if (dob !== undefined) {
    //   const onlyDate = dob.split("-");
    //   const reArrangeDate =
    //     onlyDate[2] + "/" + onlyDate[1] + "/" + onlyDate[0];
    //   user.dob = reArrangeDate;
    // }
    //}

    return (
      <React.Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Kloxet | My Account page</title>
          <meta name="keywords" content="" />
          <meta name="description" content="" />
        </Helmet>
        <HeaderCommon user={this.props.user} location={this.props.location} />
        <div className="myAccountArea">
          <div className="container">
            <div className="myAccountTabArea">
              <ul className="myAccountTab">
                <li
                  onClick={() => this.handleTab(1)}
                  className={tabNumber === 1 ? "active" : ""}
                >
                  Your Profile
                  <span className="downArrow2">
                    <img src={arrow} alt="" />
                  </span>
                </li>
                <li
                  onClick={() => this.handleTab(2)}
                  className={tabNumber === 2 ? "active" : ""}
                >
                  Subscription & Purchses
                  <span className="downArrow2">
                    <img src={arrow} alt="" />
                  </span>
                </li>
                <li
                  onClick={() => this.handleTab(3)}
                  className={tabNumber === 3 ? "active" : ""}
                >
                  Shipping informations
                  <span className="downArrow2">
                    <img src={arrow} alt="" />
                  </span>
                </li>
                <li
                  onClick={() => this.handleTab(4)}
                  className={tabNumber === 4 ? "active" : ""}
                >
                  Order History
                  <span className="downArrow2">
                    <img src={arrow} alt="" />
                  </span>
                </li>
              </ul>
              <div className="myAccountTabContent">
                <div
                  className={
                    tabNumber === 1 ? "yourProfileTab active" : "yourProfileTab"
                  }
                >
                  <div className="profileTabRight">
                    <div className="row">
                      <div className="col-sm-3">
                        <div className="leftAreaProfile">
                          <input
                            type="file"
                            className="form-control avatarUpload"
                            id="avatar"
                            name="avatar"
                            onChange={this.handleUploadAvatar2}
                          />
                          {
                            <div className="rounderProfilePic">
                              {user.avatarFileUrl && (
                                <Image
                                  src={user.avatarFileUrl}
                                  alt="profile pic"
                                  roundedCircle
                                />
                              )}

                              {!user.avatarFileUrl && (
                                <Image
                                  src={profilePic}
                                  alt="profile pic"
                                  roundedCircle
                                />
                              )}
                            </div>
                          }
                          <p className="accountName">
                            Hello, {user.firstName} {user.lastName}
                          </p>
                          <div className="clearfix" />

                          <p className="naMeValuePair">
                            Email : <span>{user.email}</span>
                          </p>
                          <p className="naMeValuePair">
                            DOB : <span>{showDate}</span>
                          </p>

                          {user.mobile && (
                            <p className="naMeValuePair">
                              Mobile : <span>{user.mobile}</span>
                            </p>
                          )}
                          {!this.state.profileEditMode && (
                            <p className="naMeValuePair">
                              <button
                                className="reTakeQuizButton"
                                onClick={this.editProfile}
                              >
                                <i className="fa fa-pencil" />
                                Edit Profile
                              </button>
                            </p>
                          )}
                          {this.state.profileEditMode && (
                            <p className="naMeValuePair">
                              <button
                                className="cancelEditButton"
                                onClick={this.cancelEdit}
                              >
                                <i className="fa fa-undo" />
                                Cancel
                              </button>
                            </p>
                          )}
                        </div>
                      </div>
                      {!this.state.profileEditMode && (
                        <div className="col-sm">
                          {user.qna && (
                            <div className="rightAreaProfile">
                              <h3>
                                {!_.isEmpty(user.qna)
                                  ? "Your Quiz details"
                                  : "Please participate on Quiz"}
                              </h3>
                              {!this.state.pageLoaded && (
                                <div className="loadArea">
                                  <Loading />
                                </div>
                              )}
                              {user.qna.map(qna => (
                                <div key={qna._id} className="profileQNA">
                                  <p
                                    className="question"
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        qna.index + 1 + ". " + qna.question
                                    }}
                                  />

                                  <ul className="answer">
                                    {qna.answers.map(ans => (
                                      <li key={ans._id}>{ans.value}</li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                              <div
                                className={
                                  _.isEmpty(user.qna)
                                    ? "profileQNA center"
                                    : "profileQNA"
                                }
                              >
                                <p className="question">&nbsp;</p>
                                <Link to="quiz">
                                  <button className="reTakeQuizButton green">
                                    {_.isEmpty(user.qna)
                                      ? "Take Quiz"
                                      : "Retake Quiz"}
                                  </button>
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {this.state.profileEditMode && (
                        <div className="col-sm">
                          <div className="profileEditMainArea">
                            <div className="profileEdit">
                              <h3>Edit Profile</h3>
                              <form
                                onSubmit={this.handleSubmit}
                                encType="multipart/form-data"
                              >
                                <div className="row mb-3">
                                  <div className="col">
                                    <label htmlFor="firstName">
                                      First Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="firstName"
                                      name="firstName"
                                      value={account.firstName}
                                      onChange={this.handleChange}
                                      placeholder="First name"
                                    />
                                  </div>
                                  <div className="col">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="lastName"
                                      name="lastName"
                                      value={account.lastName}
                                      onChange={this.handleChange}
                                      placeholder="Last name"
                                    />
                                  </div>
                                  <div className="invalid-feedback">
                                    {error.firstName}
                                  </div>
                                </div>

                                <div className="input-group mb-2">
                                  <label>DOB</label>
                                  <DatePicker
                                    selected={this.state.dob}
                                    onChange={this.handleDOBChange}
                                    placeholderText="Date of birth"
                                    dateFormat="dd/MM/yyyy"
                                  />
                                  <div className="invalid-feedback">
                                    {this.state.dateError}
                                  </div>
                                </div>

                                <div className="input-group mb-3">
                                  <label
                                    className="mobileLevel"
                                    htmlFor="mobile"
                                  >
                                    Mobile
                                  </label>
                                  {/* <input
                                    type="number"
                                    className="form-control"
                                    id="mobile"
                                    name="mobile"
                                    placeholder="Mobile Number"
                                    value={account.mobile}
                                    onChange={this.handleChange}
                                  /> */}
                                  <PhoneInput
                                    defaultCountry={"us"}
                                    onlyCountries={this.state.countries}
                                    value={this.state.mobile}
                                    onChange={this.handleChange3}
                                    inputExtraProps={{
                                      name: "mobile",
                                      id: "mobile"
                                    }}
                                  />
                                  <div className="invalid-feedback">
                                    {error.mobile}
                                  </div>
                                </div>

                                <div className="input-group mb-3">
                                  <label className="mobileLevel">
                                    Upload your profile picture
                                  </label>
                                  <input
                                    type="file"
                                    className="form-control"
                                    id="avatar"
                                    name="avatar"
                                    onChange={this.handleUploadAvatar}
                                  />
                                </div>

                                <button
                                  onClick={this.updateUserData}
                                  type="submit"
                                  className="reTakeQuizButton"
                                  disabled={this.validate()}
                                >
                                  Update
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="row">
                      <div className="col-sm" />

                      <div className="col-sm-8" />
                    </div>
                  </div>
                </div>
                <div
                  className={
                    tabNumber === 2
                      ? "subscriptionTab active"
                      : "subscriptionTab"
                  }
                >
                  <div className="commonPlanAreaMain commonPlanAreaMain2">
                    {subscribed && <h3>Your Subscription Details </h3>}
                    {!subscribed && (
                      <div>
                        <p>
                          You are not subscribed to any plan yet, please
                          complete the payment
                        </p>
                        <Link
                          className="nav-link subscribeLink"
                          to="/plan-subscribe"
                        >
                          Subscribe
                        </Link>
                      </div>
                    )}
                    {currentUserOrderDetails.map(order => (
                      <React.Fragment key={order._id}>
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="shippingDetails">
                              <p>
                                <span>Shiping Name: </span>
                                {order.shippingName}
                              </p>
                              <p>
                                <span>Address: </span>
                                {order.shippingAddress}
                              </p>
                              <p>
                                <span>City: </span>
                                {order.shippingCity}
                              </p>
                              <p>
                                <span>Post Code: </span>
                                {order.shippingPostcode}
                              </p>
                              <p>
                                <span>State: </span>
                                {order.shippingState}
                              </p>

                              <p>
                                <span>Used Promo: </span>
                                {order.usedPromocode}
                              </p>
                              {order.orderStatus === "CONFIRMED" && (
                                <p>
                                  <span>Amount Paid: </span>$
                                  {order.finalPaybleAmount}
                                </p>
                              )}
                              <p>
                                <span>Order Status: </span>
                                {order.orderStatus}
                              </p>
                            </div>
                          </div>
                          <div className="col-sm">
                            <div className="commonPlanArea">
                              <p className="planText">
                                <span className="price">
                                  ${order.cartTotalAmount}/
                                </span>
                                month
                              </p>
                              <p className="planDetails">
                                Receive 4 to 5 fashion jewelery items on the
                                15th of each month.Delivered straight to your
                                mail box
                              </p>
                            </div>
                          </div>
                        </div>
                        {order.orderStatus === "CONFIRMED" && (
                          <div className="row">
                            <p
                              onClick={this.handleCancelSubscription}
                              className="endSubscription"
                            >
                              End Membership and Benefits
                            </p>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div
                  className={
                    tabNumber === 3 ? "shippingAddTab active" : "shippingAddTab"
                  }
                >
                  <div className="commonPlanAreaMain commonPlanAreaMain2">
                    {subscribed && (
                      <h3>
                        Your Shipping Details{" "}
                        {!editShippingADD && (
                          <i
                            onClick={this.editShippingADD}
                            className="fa fa-pencil-square-o"
                          ></i>
                        )}
                        {editShippingADD && (
                          <i
                            onClick={this.cancelEditShipping}
                            className="fa fa-undo"
                          />
                        )}
                      </h3>
                    )}
                    {!subscribed && (
                      <div>
                        <p>
                          You are not subscribed to any plan yet, please
                          complete the payment
                        </p>
                        <Link
                          className="nav-link subscribeLink"
                          to="/plan-subscribe"
                        >
                          Subscribe
                        </Link>
                      </div>
                    )}
                    {editShippingADD && (
                      <div>
                        <div className="profileEdit">
                          <form>
                            <div className="col-sm-12">
                              <div className="row">
                                <div className="col">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    name="name"
                                    id="name"
                                    onChange={this.handleChange2}
                                    value={shippingDetails.name}
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Address"
                                    name="address"
                                    id="address"
                                    onChange={this.handleChange2}
                                    value={shippingDetails.address}
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="City"
                                    name="city"
                                    id="city"
                                    onChange={this.handleChange2}
                                    value={shippingDetails.city}
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
                                    name="state"
                                    id="state"
                                    onChange={this.handleChange2}
                                    value={shippingDetails.state}
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Zip"
                                    name="pin"
                                    id="pin"
                                    onChange={this.handleChange2}
                                    value={shippingDetails.pin}
                                  />
                                </div>
                                <div className="col-sm">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Country"
                                    name="country"
                                    id="country"
                                    onChange={this.handleChange2}
                                    value={shippingDetails.country}
                                    disabled="disabled"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="buttonArea">
                              <button
                                onClick={this.updateUserShippingAdd}
                                type="button"
                                disabled={submitting}
                                className="reTakeQuizButton"
                              >
                                Update
                              </button>
                              {/* <button
                                className="cancelButton"
                                onClick={this.cancelEditShipping}
                              >
                                Cancel
                              </button> */}
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                    {!editShippingADD && (
                      <div>
                        {currentUserOrderDetails.map(order => (
                          <div className="row" key={order._id}>
                            <div className="col-sm-6">
                              <div className="shippingDetails">
                                <p>
                                  <span>Shiping Name: </span>
                                  {order.shippingName}
                                </p>
                                <p>
                                  <span>Address: </span>
                                  {order.shippingAddress}
                                </p>
                                <p>
                                  <span>City: </span>
                                  {order.shippingCity}
                                </p>
                                <p>
                                  <span>Post Code: </span>
                                  {order.shippingPostcode}
                                </p>
                                <p>
                                  <span>State: </span>
                                  {order.shippingState}
                                </p>
                              </div>
                            </div>
                            <div className="col-sm">
                              <div className="commonPlanArea">
                                <p className="planText">
                                  <span className="price">FREE</span>
                                </p>
                                <p className="planDetails">
                                  Receive 4 to 5 fashion jewelery items on the
                                  15th of each month.Delivered straight to your
                                  mail box
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className={tabNumber === 4 ? "bomTab active" : "bomTab"}>
                  <div className="commonPlanAreaMain commonPlanAreaMain2">
                    <h3>Order History</h3>
                    {!bomYears && (
                      <div className="bom-item-cont">
                        <h4 className="bom-year">No Items Found!</h4>
                      </div>
                    )}
                    {bomYears &&
                      bomYears.map(year => (
                        <div className="bom-item-cont" key={year}>
                          <h4 className="bom-year">{year}</h4>
                          <div className="row">
                            <Bom
                              items={boms[year]}
                              handleBomDetails={this.openBOMModal}
                            />
                          </div>
                        </div>
                      ))}
                    {selectedBOMItem && (
                      <Modal
                        show={isBOMModalVisible}
                        onHide={this.handleBOMModalClose}
                        backdrop="static"
                        size="lg"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Comments</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div className="comments-section">
                            <ul className="comments-list">
                              {selectedBOMItem.comments.map(comment => (
                                <li
                                  key={comment._id}
                                  className="comment-list-item"
                                >
                                  <div className="comment-title">
                                    {comment.title}
                                  </div>
                                  <div className="comment-date">
                                    <em>
                                      <small>
                                        {this.getCurrentDate(comment.createdOn)}
                                      </small>
                                    </em>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <form
                            name="bom-comment-form"
                            onSubmit={this.postBOMComment}
                            className="bom-comment-form"
                          >
                            <div className="form-group">
                              <input
                                name="bom-comment"
                                id="bom-comment"
                                value={newlyAddedBOMComment}
                                onChange={this.updateSelectedBOMComment}
                                className="form-control bom-add-comment"
                                placeholder="Enter comment"
                                required
                                maxLength="200"
                              />
                            </div>
                            <button
                              type="submit"
                              className="btn btn-primary bom-btn-add-comment"
                            >
                              Submit
                            </button>
                          </form>
                        </Modal.Body>
                        {/*<Modal.Footer>
                         <Button variant="secondary" onClick={this.handleBOMModalClose}>
                          Close
                        </Button> 
                      </Modal.Footer>*/}
                      </Modal>
                    )}
                  </div>
                </div>
              </div>
              <div className="clearfix" />
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default MyAccount;
