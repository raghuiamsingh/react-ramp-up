import React, { Component } from 'react';
import LoginForm from '../Components/LoginForm';
import FormHeader from '../Components/FormHeader';
import FormFooter from '../Components/FormFooter';
import Icon from '../Components/Icon';
import * as Constants from '../Components/Constants';
import { Redirect } from 'react-router-dom';
import user_logo from '../Components/login_icon.svg';
import * as Cookie from '../Components/Cookie';

class LoginPage extends Component {
  render() {
    if (Cookie.getCookie(Constants.sessionKeyName) !== null) {
      return <Redirect to="/planets" />;
    }

    let footerLinks = {
      0: {classes: "underlineHover", link: "#", title: "Forgot Password?"}
    };

    return (
      <div className="wrapper fadeInDown">
        <div className="formContent">
          <FormHeader classes="active" headerText="Sign In" />
          <Icon imgSrc={user_logo} classes="fadeIn first" altText="User Icon" />

          <LoginForm />

          <FormFooter contents={footerLinks} />
        </div>
      </div>
    );
  }
}

export default LoginPage;
