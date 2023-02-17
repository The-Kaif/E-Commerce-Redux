import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Images/logo.png";
function Bill() {
  // This is Bill Component
  const [details, setDetails] = useState({});
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("checkout")) !== null) {
      // Set User Checkout Details In State
      setDetails(JSON.parse(localStorage.getItem("checkout")));
    }
    if (JSON.parse(localStorage.getItem("cart")) !== null) {
      // Set Cart Product Details In State
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);
  useEffect(() => {
    // Calculate Price
    let tempCart = JSON.parse(localStorage.getItem("cart"));
    let tempPrice = 0;
    if (tempCart !== null) {
      for (let i = 0; i < tempCart.length; i++) {
        tempPrice += tempCart[i].price * tempCart[i].quantity;
      }
      setPrice(tempPrice);
    }
  }, [price]);
  // Continue Shopping Handler Function
  const continueHander = () => {
    localStorage.removeItem("cart");
    navigate("/products");
  };
  return (
    <div>
      <div class="d-flex justify-content-around">
        <div>
          <h1 style={{ paddingTop: "0.5em" }}>INVOICE</h1>
          <table style={{ width: "600px" }}>
            <thead>
              <tr>
                <th>Invoice Number</th>
                <th>Date Of Issue</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{details.invoice}</td>
                <td>{new Date().toLocaleDateString()}</td>
              </tr>
            </tbody>
          </table>
          <br></br>
          <table style={{ width: "600px" }}>
            <thead>
              <tr>
                <th>Billed to</th>
                <th>From</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{details.name}</td>
                <td>Shopee Pvt. Ltd.</td>
              </tr>
              <tr>
                <td>{details.email}</td>
                <td>shopee@gmail.com</td>
              </tr>
              <tr>
                <td>{details.phone}</td>
                <td>999-999-9999</td>
              </tr>
              <tr>
                <td>{details.address}</td>
                <td>Gomti Nagar, Lucknow</td>
              </tr>
              <tr>
                <td>{details.pincode}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <img style={{ width: "9em" }} src={logo} alt="logo" />
          <br></br>
          <div class="d-grid gap-2 col-12 mx-auto">
            <button
              onClick={() => window.print()}
              type="button"
              class="btn btn-success"
            >
              <i class="fas fa-file-invoice"></i>&nbsp;Download Inovice
            </button>
            <button
              onClick={continueHander}
              type="button"
              class="btn btn-primary"
            >
              <i class="fas fa-shopping-cart"></i>&nbsp;Continue To Shopping
            </button>
          </div>
        </div>
      </div>
      <br></br>
      <center>
        <div>
          <table
            style={{ width: "78%" }}
            class="table table-sm  table-bordered"
          >
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((val) => (
                <tr>
                  <td>{val.title}</td>
                  <td>{val.description}</td>
                  <td>{val.quantity}</td>
                  <td>{val.price}</td>
                </tr>
              ))}
              <tr>
                <td style={{ fontWeight: "bolder" }}>Invoice Total</td>
                <td></td>
                <td></td>
                <td style={{ fontWeight: "bolder" }}>${price}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </center>
    </div>
  );
}

export default Bill;
