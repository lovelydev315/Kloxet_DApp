import React, { Component } from "react";
//import _ from "lodash";
import { Helmet } from "react-helmet";
import { FacebookProvider, LoginButton } from "react-facebook";
import { GoogleLogin } from "react-google-login";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/dist/style.css";
import DatePicker from "react-datepicker";
import auth from "../services/authServices";
import { getQuizData } from "../services/quizData";
import HeaderCommon from "./common/header";
import Footer from "./common/footer";
import "react-datepicker/dist/react-datepicker.css";

class GetStarted extends Component {
  state = {
    quiz: getQuizData(),
    currentQuestionIndex: 0,
    quizAnswerData: [],
    isRadioChecked: false,
    showError: false,
    showfForm: false,
    startDate: "",
    dateError: "",
    socialAvatarUrl: "",
    dob: "",
    account: {
      password: "",
      firstName: "",
      lastName: "",
      email: ""
    },
    mobile: "",
    facebookAccount: [],
    error: {},
    serverError: "",
    sucessMessage: "",
    countries: ["us"]
  };

  quizData = [
    {
      question: "",
      index: "",
      multiSelect: false,
      answers: []
    },
    {
      question: "",
      index: "",
      multiSelect: false,
      answers: []
    },
    {
      question: "",
      index: "",
      multiSelect: false,
      answers: []
    },
    {
      question: "",
      index: "",
      multiSelect: false,
      answers: []
    },
    {
      question: "",
      index: "",
      answers: []
    },
    {
      question: "",
      index: "",
      multiSelect: false,
      answers: []
    },
    {
      question: "",
      index: "",
      multiSelect: false,
      answers: []
    },
    {
      question: "",
      index: "",
      multiSelect: false,
      answers: []
    },
    {
      question: "",
      index: "",
      multiSelect: false,
      answers: []
    },
    {
      question: "",
      index: "",
      multiSelect: false,
      answers: []
    },
    {
      question: "",
      index: "",
      multiSelect: false,
      answers: []
    }
  ];

  componentDidMount() {}

  handleNextQuestion = async () => {
    window.scrollTo(0, 0);
    const answerData = this.quizData[this.state.currentQuestionIndex].answers;
    if (answerData.length === 0) {
      this.setState({
        showError: true
      });
      return;
    } else {
      this.setState({
        showError: false
      });
    }

    if (this.state.currentQuestionIndex !== 10) {
      this.setState({
        currentQuestionIndex: this.state.currentQuestionIndex + 1
      });
    }

    const lastPage =
      this.state.quiz.length === this.state.currentQuestionIndex + 1;

    if (lastPage && this.props.user) {
      console.log("logged in last page");
      console.log(this.quizData);

      const user = auth.getCurrentUser();
      try {
        await auth.updateQuizData(user, this.quizData);
        this.props.history.push("/profile");
        //window.location = "/profile";
      } catch (error) {}

      // update existing quiz data
    }

    if (lastPage && !this.props.user) {
      console.log("signup last page");
      console.log(this.quizData);
      // sign up form with quiz data

      this.setState({
        showSignUpForm: true
      });
    }
  };

  handlePrevQuestion = () => {
    window.scrollTo(0, 0);
    if (this.state.currentQuestionIndex !== 0) {
      this.setState({
        currentQuestionIndex: this.state.currentQuestionIndex - 1
      });
    }
  };

  generatePreviousButton = () => {
    if (this.state.currentQuestionIndex !== 0)
      return (
        <button className="quiz_backButton" onClick={this.handlePrevQuestion}>
          Previous
        </button>
      );
  };

  handleSingleSelect = (e, clickedAnswer) => {};

  handleMultiSelect = clickedAnswer => {};

  handleRadio = (e, value) => {
    this.setState({
      showError: false
    });
    e.currentTarget.parentNode.parentNode.parentNode.children[0].children[0].className =
      "";
    e.currentTarget.parentNode.parentNode.parentNode.children[1].children[0].className =
      "";
    e.currentTarget.parentNode.parentNode.parentNode.children[2].children[0].className =
      "";
    e.currentTarget.parentNode.parentNode.parentNode.children[3].children[0].className =
      "";
    e.currentTarget.parentNode.parentNode.parentNode.children[4].children[0].className =
      "";

    e.currentTarget.parentNode.className = "selected";

    this.quizData[this.state.currentQuestionIndex].question = this.state.quiz[
      this.state.currentQuestionIndex
    ].question;

    this.quizData[
      this.state.currentQuestionIndex
    ].index = this.state.currentQuestionIndex;

    this.quizData[this.state.currentQuestionIndex].answers = [value];
  };

  handleCheckBox = (e, value) => {
    this.quizData[this.state.currentQuestionIndex].question = this.state.quiz[
      this.state.currentQuestionIndex
    ].question;

    this.quizData[
      this.state.currentQuestionIndex
    ].index = this.state.currentQuestionIndex;

    this.quizData[this.state.currentQuestionIndex].multiSelect = true;

    let currentAnswer = this.quizData[this.state.currentQuestionIndex].answers;

    let currentQsAns = [...currentAnswer];

    const index = currentQsAns.indexOf(value);

    if (index === -1) {
      currentQsAns = [...currentQsAns, value];
      this.quizData[this.state.currentQuestionIndex].answers = [
        ...currentQsAns
      ];
    } else {
      currentQsAns.splice(index, 1);
      this.quizData[this.state.currentQuestionIndex].answers = [
        ...currentQsAns
      ];
    }

    //console.log(index);

    //console.log(this.quizData[this.state.currentQuestionIndex]);

    if (!e.currentTarget.parentNode.className) {
      e.currentTarget.parentNode.className = "selected";
    } else {
      e.currentTarget.parentNode.className = "";
    }

    this.setState({
      showError: false
    });
  };

  schema = {
    firstName: Joi.string()
      .required()
      .label("Name"),
    lastName: Joi.string()
      .required()
      .label("Name"),
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
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

  handleSignUp = async () => {
    const { startDate } = this.state;
    const errors = this.validate();
    if (!startDate) {
      this.setState({ dateError: "Please select your date of birth!" });
      return;
    } else {
      let localDate = new Date(startDate);
      localDate = localDate.toISOString().split("T")[0];
      this.state.dob = localDate;
    }

    this.setState({ error: errors || {} });

    if (errors) return;

    try {
      const { data } = await auth.signUp(this.state, this.quizData);
      console.log(data);
      this.setState({ sucessMessage: data.title, serverError: "" });

      const { data: response } = await auth.login(
        this.state.account.email,
        this.state.account.password
      );
      const token = response.token;
      localStorage.setItem("token", token);
      this.props.history.push("/plan-subscribe");
      //window.location = "/plan-subscribe";

      //const token = data.token;
      //localStorage.setItem("token", token);
      //window.location = "/";
    } catch (ex) {
      console.log(ex.response.data);
      this.setState({ serverError: ex.response.data.error.message });
    }
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

  handleChange2 = value => {
    this.setState({
      mobile: value
    });
  };

  handleFacebookSignUp = async response => {
    this.setState({
      facebookAccount: response
    });
    //console.log(this.state.facebookAccount);

    try {
      const { data } = await auth.socialSignUp(
        this.state.facebookAccount,
        this.quizData
      );
      console.log(data);
      this.setState({ sucessMessage: data.title, serverError: "" });
      const { data: loginData } = await auth.socialLogin(
        this.state.facebookAccount
      );
      const token = loginData.token;
      localStorage.setItem("token", token);
      //window.location = "/plan-subscribe";
      this.props.history.push("/plan-subscribe");
    } catch (ex) {
      this.setState({
        serverError: "Email id already in used, please login to continue!"
      });
    }
  };

  handleError = error => {
    console.log(error);
    //this.setState({ error });
  };

  responseGoogle = response => {
    console.log(response);
  };

  constructor(props) {
    super(props);
    this.props = props;
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  registerLocale() {}

  handleDateChange(date) {
    console.log(date);
    this.setState({
      startDate: date
    });
  }

  render() {
    const { account, error, serverError, sucessMessage } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Kloxet | Quiz Page</title>
          <meta name="keywords" content="" />
          <meta name="description" content="" />
        </Helmet>
        <HeaderCommon user={this.props.user} location={this.props.location} />
        {!this.state.showSignUpForm && (
          <div className="mainContainer">
            <div className="container">
              <ul className="quiz_dot">
                {this.state.quiz.map(quiz => (
                  <li
                    key={quiz.index}
                    className={
                      this.state.currentQuestionIndex === quiz.index
                        ? "active"
                        : ""
                    }
                  />
                ))}
              </ul>
              {this.state.quiz.map(quiz => (
                <div
                  key={quiz.index}
                  className={
                    this.state.currentQuestionIndex === quiz.index
                      ? "quizArea show"
                      : "quizArea"
                  }
                >
                  <h3
                    dangerouslySetInnerHTML={{
                      __html:
                        this.state.currentQuestionIndex +
                        1 +
                        ". " +
                        this.state.quiz[quiz.index].question
                    }}
                  />
                  <ul className="answer">
                    {this.state.quiz[quiz.index].options.map(option => (
                      <li
                        key={option.option_id}
                        onClick={
                          this.state.quiz[quiz.index].multiSelect
                            ? e => this.handleMultiSelect(e, option)
                            : e => this.handleSingleSelect(e, option)
                        }
                      >
                        <label>
                          {!this.state.quiz[quiz.index].multiSelect ? (
                            <input
                              type="radio"
                              name={quiz.index}
                              value={option.value}
                              onChange={e => this.handleRadio(e, option)}
                            />
                          ) : (
                            <input
                              type="checkbox"
                              name={option.value}
                              value={option.value}
                              onChange={e => this.handleCheckBox(e, option)}
                            />
                          )}
                          <span className="img">
                            <img src={option.image} alt={option.value} />
                            <div className="overlay_ansN">
                              <span>
                                <i className="fa fa-check" />
                              </span>
                            </div>
                          </span>
                        </label>
                        <p>{option.value}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {this.state.showError && (
                <span className="alert alert-danger">
                  Please select one answer!
                </span>
              )}

              <div className="quizButtonArea">
                {this.generatePreviousButton()}
                <button
                  className="quiz_nextButton"
                  onClick={this.handleNextQuestion}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {this.state.showSignUpForm && (
          <div className="signupFormArea">
            {sucessMessage && (
              <div className="alert alert-success alert-dismissible">
                {sucessMessage}
              </div>
            )}
            {serverError && (
              <div className="alert alert-danger alert-dismissible">
                {serverError}
              </div>
            )}
            <h1>Almost done!</h1>
            <p className="success-text">
              Signup With Your Facebook Account or Create a New Account.
            </p>
            <p>Just a few more details to complete your fashion quiz.</p>
            <form onSubmit={this.handleSubmit}>
              <div className="row mb-3">
                <div className="col">
                  <input
                    type="text"
                    className="signupForm"
                    id="firstName"
                    name="firstName"
                    value={account.firstName}
                    onChange={this.handleChange}
                    placeholder="First name"
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="signupForm"
                    id="lastName"
                    name="lastName"
                    value={account.lastName}
                    onChange={this.handleChange}
                    placeholder="Last name"
                  />
                </div>
                <div className="invalid-feedback">{error.firstName}</div>
              </div>

              <div className="input-group mb-3">
                <input
                  type="email"
                  className="signupForm"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={account.email}
                  onChange={this.handleChange}
                />
                <div className="invalid-feedback">{error.email}</div>
              </div>

              <div className="input-group mb-2">
                <input
                  type="password"
                  className="signupForm"
                  id="password"
                  name="password"
                  value={account.password}
                  onChange={this.handleChange}
                  placeholder="Password"
                />
                <div className="invalid-feedback">{error.password}</div>
              </div>

              <div className="input-group mb-2">
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleDateChange}
                  placeholderText="Date of birth"
                />
                <div className="invalid-feedback">{this.state.dateError}</div>
              </div>

              {/* <div className="input-group mb-3">
                <input
                  type="number"
                  className="signupForm"
                  id="mobile"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={account.mobile}
                  onChange={this.handleChange}
                />
                <div className="invalid-feedback">{error.mobile}</div>
              </div> */}
              <PhoneInput
                defaultCountry={"us"}
                onlyCountries={this.state.countries}
                value={this.state.mobile}
                onChange={this.handleChange2}
                inputExtraProps={{
                  name: "mobile",
                  id: "mobile"
                }}
              />

              <p className="termsCondition">
                By creating your account, you agree to our{" "}
                <Link to="/">Terms of Service</Link> and{" "}
                <Link to="/">Privacy Policy</Link>
              </p>

              <button
                onClick={this.handleSignUp}
                type="submit"
                className="btn btn-primary loginButton"
                disabled={this.validate()}
              >
                Create Profile
              </button>

              <p className="orText">
                <span>Or</span>
              </p>
              <div className="socialLoginButton">
                <FacebookProvider appId="382671738990875">
                  <LoginButton
                    scope="email"
                    onCompleted={this.handleFacebookSignUp}
                    onError={this.handleError}
                    className="loginBtn loginBtn--facebook"
                  >
                    <span>Signup with Facebook</span>
                  </LoginButton>
                </FacebookProvider>

                <GoogleLogin
                  clientId="1066410092430-u8ste9imernqvpggsqmt8pjre4vak155.apps.googleusercontent.com"
                  buttonText="Signup with Google"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
            </form>
          </div>
        )}
        <Footer />
      </React.Fragment>
    );
  }
}

export default GetStarted;
