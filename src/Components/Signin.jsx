import React, { useRef } from "react";

import { Link, useNavigate } from "react-router-dom";
// Sign in Component
function Signin() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  // Login Handler
  const loginHandler = (e) => {
    e.preventDefault();
    // Check Validation
    if (usernameRef.current.value === "") {
      alert("Username field can not be empty !");
      usernameRef.current.focus();
    } else if (passwordRef.current.value === "") {
      alert("Password field can not be empty !");
      passwordRef.current.focus();
    } else {
      let userData = JSON.parse(localStorage.getItem("users"));
      for (let i = 0; i < userData.length; i++) {
        if (
          userData[i].username === usernameRef.current.value &&
          userData[i].password === passwordRef.current.value &&
          userData[i].role === "Admin"
        ) {
          localStorage.setItem("currentUser", JSON.stringify(userData[i]));
          alert("Login Successfully");
          navigate("/admin");
          return;
        } else if (
          userData[i].username === usernameRef.current.value &&
          userData[i].password === passwordRef.current.value &&
          (userData[i].role === "Manager" || userData[i].role === "User")
        ) {
          localStorage.setItem("currentUser", JSON.stringify(userData[i]));
          alert("Login Successfully");
          navigate("/products");
          return;
        }
      }
    }
  };
  return (
    //Display Login Form
    <div className="signup__container">
      <center>
        <form className="signup" onsubmit="return false" autocomplete="off">
          <h1>Login</h1>
          <h2>
            New Member ?{" "}
            <Link className="signin-btn" to={"/"}>
              Sign up
            </Link>
          </h2>

          <div className="signup__field">
            <input
              autoFocus
              ref={usernameRef}
              className="signup__input"
              type="text"
              name="username"
              id="username"
              required
            />
            <label className="signup__label" for="username">
              Username
            </label>
          </div>

          <div className="signup__field">
            <input
              ref={passwordRef}
              className="signup__input"
              type="password"
              name="password"
              id="password"
              required
            />
            <label className="signup__label" for="password">
              Password
            </label>
          </div>
          <button onClick={loginHandler} className="button">
            Log in
          </button>
        </form>
      </center>
    </div>
  );
}

export default Signin;
