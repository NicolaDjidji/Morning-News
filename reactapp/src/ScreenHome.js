import React, { useState } from "react";
import "./App.css";
import { Input, Button } from "antd";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
function ScreenHome({ userToken }) {
  const [signUpUsername, setsignUpUsername] = useState("");
  const [signUpEmail, setsignUpEmail] = useState("");
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const [signUpPassword, setsignUpPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkSignUp, setCheckSignUp] = useState(false);
  const [checkLogin, setcheckLogin] = useState(false);

  async function handleSubmitSignUp() {
    var req = await fetch(`/newuser`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `username=${signUpUsername}&email=${signUpEmail}&password=${signUpPassword}`,
    });
    let res = await req.json();
    console.log(res);
    if (
      res.username &&
      signUpUsername !== "" &&
      signUpEmail !== "" &&
      signUpPassword !== ""
    ) {
      const token = res.token;
      console.log("0-SignUp Token", token);
      userToken(token);
      setIsLoggedIn(true);
    } else {
      setCheckSignUp(true);
    }
  }
  // (
  //   `/signin?email=${loginEmail}&password=${loginPassword}`
  // )

  async function handleSubmitLogin() {
    console.log("click");
    var searchUser = await fetch(`/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${loginEmail}&password=${loginPassword}`,
    });
    var res = await searchUser.json();
    console.log(res[0].token);
    console.log(res.length);

    setcheckLogin(true);
    if (res[0] !== undefined && loginEmail !== "" && loginPassword !== "") {
      console.log("work");
      const token = res[0].token;
      console.log("0-SignUp Token", token);
      userToken(token);
      setIsLoggedIn(true);
    } else {
      console.log("me");
      setcheckLogin(true);
    }
  }
  if (isLoggedIn) {
    return <Redirect to="/screensource" />;
  }
  var displaySignUp = {};
  if (!checkSignUp) {
    displaySignUp = { display: "none", margin: "30px" };
  }
  var displayLogin = {};
  if (!checkLogin) {
    console.log("me");
    displayLogin = { display: "none", margin: "30px" };
  }

  return (
    <div className="Login-page">
      {/* SIGN-IN */}
      <div className="Sign">
        <div className="error" style={displayLogin}>
          Please input every field in Login
        </div>
        <Input
          onChange={(e) => setloginEmail(e.target.value)}
          value={loginEmail}
          className="Login-input"
          placeholder="email"
        />

        <Input.Password
          onChange={(e) => setloginPassword(e.target.value)}
          value={loginPassword}
          className="Login-input"
          placeholder="password"
        />

        <Button
          style={{ width: "80px" }}
          type="primary"
          onClick={() => handleSubmitLogin()}
        >
          Sign-in
        </Button>
      </div>
      {/* SIGN-UP */}
      <div className="Sign">
        <div className="error" style={displaySignUp}>
          Please input every field in SignUp
        </div>
        <Input
          onChange={(e) => setsignUpUsername(e.target.value)}
          value={signUpUsername}
          className="Login-input"
          placeholder="username"
        />

        <Input
          onChange={(e) => setsignUpEmail(e.target.value)}
          value={signUpEmail}
          className="Login-input"
          placeholder="email"
        />

        <Input.Password
          onChange={(e) => setsignUpPassword(e.target.value)}
          value={signUpPassword}
          className="Login-input"
          placeholder="password"
        />

        <Button
          style={{ width: "80px" }}
          type="primary"
          onClick={() => handleSubmitSignUp()}
        >
          Sign-up
        </Button>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return { token: state.token };
}

function mapDispatchToProps(dispatch) {
  return {
    userToken: function (useToken) {
      console.log("1-dispatch", useToken);
      dispatch({
        type: "newToken",
        token: useToken,
      });
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ScreenHome);
