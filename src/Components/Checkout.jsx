import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCheckout } from "../redux/reduxSlice";
// Checkout Component
function Checkout() {
  // State For Price
  const [price, setPrice] = useState(0);
  // useRef For All Input Fields
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const pinRef = useRef();
  const addressRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    let tempCart = JSON.parse(localStorage.getItem("cart"));
    let tempPrice = 0;
    if (tempCart !== null) {
      for (let i = 0; i < tempCart.length; i++) {
        tempPrice += tempCart[i].price * tempCart[i].quantity;
      }
      setPrice(tempPrice);
    }
  }, [price]);
  const navigate = useNavigate();
  // Bill Handler
  const billHandler = (e) => {
    e.preventDefault();
    // Check Valudation
    const mailFormet =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (nameRef.current.value === "") {
      alert("Name Field Can Not Be Empty !");
      nameRef.current.focus();
    } else if (emailRef.current.value === "") {
      alert("Email Field Can Not Be Empty !");
      emailRef.current.focus();
    } else if (!emailRef.current.value.match(mailFormet)) {
      alert("Write Proper Email !");
      emailRef.current.focus();
    } else if (phoneRef.current.value === "") {
      alert("Phone Field Can Not Be Empty !");
      phoneRef.current.focus();
    } else if (isNaN(phoneRef.current.value) === true) {
      alert("Type Only Digits !");
      phoneRef.current.focus();
    } else if (pinRef.current.value === "") {
      alert("Pincode Field Can Not Be Empty !");
      pinRef.current.focus();
    } else if (isNaN(pinRef.current.value) === true) {
      alert("Type Only Digits !");
      pinRef.current.focus();
    } else if (pinRef.current.value.length !== 6) {
      alert("Type Your 6 Digit Pincode Number");
      pinRef.current.focus();
    } else if (addressRef.current.value === "") {
      alert("Address Field Can Not Be Empty !");
      addressRef.current.focus();
    } else {
      // Make a object
      let obj = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        phone: phoneRef.current.value,
        pincode: pinRef.current.value,
        address: addressRef.current.value,
        invoice: Math.floor(100000 + Math.random() * 900000),
      };
      // Dispatch All Details
      dispatch(addCheckout(obj));
      navigate("/bill");
    }
  };
  return (
    <div className="checkout">
      <center>
        <section>
          <h1 className="mt-2">Checkout</h1>
          <div className="d-flex justify-content-around">
            <div style={{ width: "45%" }}>
              <form
                className="signup"
                onsubmit="return false"
                autocomplete="off"
              >
                <h1>Delivery Contact</h1>
                <br></br>
                <div className="signup__field">
                  <input
                    autoFocus
                    ref={nameRef}
                    className="signup__input"
                    type="text"
                    name="username"
                    id="username"
                    required
                  />
                  <label className="signup__label" for="username">
                    Name
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
                    ref={phoneRef}
                    className="signup__input"
                    type="text"
                    name="password"
                    id="password"
                    required
                  />
                  <label className="signup__label" for="password">
                    Phone
                  </label>
                </div>
                <div className="signup__field">
                  <input
                    ref={pinRef}
                    className="signup__input"
                    type="text"
                    name="email"
                    id="email"
                    required
                  />
                  <label className="signup__label" for="email">
                    Postal Code
                  </label>
                </div>
                <div className="signup__field">
                  <input
                    ref={addressRef}
                    className="signup__input"
                    type="text"
                    name="email"
                    id="email"
                    required
                  />
                  <label className="signup__label" for="email">
                    Address
                  </label>
                </div>
              </form>
            </div>
            <div style={{ width: "35%" }}>
              <h2>Order Summary</h2>
              <table class="table">
                <tbody>
                  <tr>
                    <td>Shipping Cost</td>
                    <td>$ 0</td>
                  </tr>
                  <tr>
                    <td>Discount</td>
                    <td>$ 0</td>
                  </tr>
                  <tr>
                    <td>Estimated Total</td>
                    <td style={{ fontWeight: "bolder" }}>$ {price}</td>
                  </tr>
                </tbody>
              </table>
              <div className="d-grid gap-2 col-12 mx-auto">
                <button
                  onClick={billHandler}
                  to={"/checkout"}
                  className="btn btn-primary addToCart"
                  type="button"
                >
                  <i className="far fa-money-bill-alt"></i>&nbsp;CONTINUE TO
                  BILLING
                </button>
              </div>
            </div>
          </div>
        </section>
      </center>
    </div>
  );
}

export default Checkout;
