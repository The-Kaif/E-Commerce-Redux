import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { addUser } from "../redux/reduxSlice";
import { useDispatch } from "react-redux";
function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Ref For Input Fields
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const roleRef = useRef();
  // Signup Handler Function
  const signupHandler = (e) => {
    e.preventDefault();
    // Check Validation
    const mailFormet =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (usernameRef.current.value === "") {
      alert("Username Field Can Not Be Empty !");
      usernameRef.current.focus();
    } else if (emailRef.current.value === "") {
      alert("Email Field Can Not Be Empty !");
      emailRef.current.focus();
    } else if (!emailRef.current.value.match(mailFormet)) {
      alert("Write Proper Email !");
      emailRef.current.focus();
    } else if (passwordRef.current.value === "") {
      alert("Password Field Can Not Be Empty");
      passwordRef.current.focus();
    } else if (roleRef.current.value === "") {
      alert("Role Field Can Not Be Empty");
      roleRef.current.focus();
    } else {
      let temp = [];
      let obj = {
        id: Math.floor(Math.random() * 10000),
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        role: roleRef.current.value,
      };
      temp.push(obj);
      dispatch(addUser(obj));
      alert("Signup Successfully");
      navigate("/signin");
    }
  };

  return (
    // Display Signup Component
    <div className="signup__container">
      <center>
        <form className="signup" onsubmit="return false" autocomplete="off">
          <h1>Create account</h1>
          <h2>
            Already have an account?{" "}
            <Link className="signin-btn" to={"/signin"}>
              Sign in
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
              ref={emailRef}
              className="signup__input"
              type="text"
              name="email"
              id="email"
              required
            />
            <label className="signup__label" for="email">
              Email
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
          <div className="signup__field">
            <select ref={roleRef} className="signup__input select">
              <option value={""}>--Select Role--</option>
              <option value={"Admin"}>Admin</option>
              <option value={"Manager"}>Manager</option>
              <option value={"User"}>User</option>
            </select>
            <label className="signup__label" for="password">
              Role
            </label>
          </div>
          <button onClick={signupHandler} className="button">
            Sign up
          </button>
        </form>
      </center>
    </div>
  );
}

export default Signup;
