import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Cart Component
function CartPage() {
  // State For Cart Array
  const [cartArr, setCartArr] = useState([]);
  // State For Price
  const [price, setPrice] = useState(0);
  useEffect(() => {
    let tempCart = JSON.parse(localStorage.getItem("cart"));
    let tempPrice = 0;
    if (tempCart !== null) {
      setCartArr(tempCart);
      for (let i = 0; i < tempCart.length; i++) {
        tempPrice += tempCart[i].price * tempCart[i].quantity;
      }
      setPrice(tempPrice);
    }
  }, [price]);
  // Delete Item Handler
  const deleteHandler = (id) => {
    let tempPrice = 0;
    for (let i = 0; i < cartArr.length; i++) {
      if (cartArr[i].id === id) {
        let check = window.confirm("Do You Want To Remove Item !");
        if (check === true) {
          tempPrice = price - cartArr[i].price * cartArr[i].quantity;
          cartArr.splice(i, 1);
        }
      }
    }
    setPrice(tempPrice);
    setCartArr([...cartArr]);
    localStorage.setItem("cart", JSON.stringify(cartArr));
  };
  // Increment Quantity Handler
  const incrementHandler = (id) => {
    let tempPrice = 0;
    for (let i = 0; i < cartArr.length; i++) {
      if (cartArr[i].id === id) {
        cartArr[i].quantity++;
        tempPrice = price + cartArr[i].price * cartArr[i].quantity;
      }
    }
    setPrice(tempPrice);
    setCartArr([...cartArr]);
    localStorage.setItem("cart", JSON.stringify(cartArr));
  };
  // Decrement Quantity Handler
  const decrementHandler = (id) => {
    let tempPrice = 0;
    for (let i = 0; i < cartArr.length; i++) {
      if (cartArr[i].id === id) {
        if (cartArr[i].quantity > 1) {
          cartArr[i].quantity--;
          tempPrice = price - cartArr[i].price * cartArr[i].quantity;
        } else {
          deleteHandler(id);
          return;
        }
      }
    }
    setPrice(tempPrice);
    setCartArr([...cartArr]);
    localStorage.setItem("cart", JSON.stringify(cartArr));
  };
  return (
    <center>
      <section style={{ width: "80%" }}>
        <h1>
          <i className="fas fa-shopping-bag mt-5"></i>&nbsp;My Cart
        </h1>
        {cartArr.length !== 0 ? (
          <div className="d-flex justify-content-around">
            <div style={{ width: "60%" }}>
              <hr></hr>
              <div style={{ textAlign: "left" }}>
                {/* Display Cart Data */}
                {cartArr.map((val) => (
                  <>
                    <div class="d-flex justify-content-around">
                      <div>
                        <img
                          style={{ width: "7em", height: "100px" }}
                          className="productImg"
                          src={val.thumbnail}
                          alt=""
                        />
                      </div>
                      <div style={{ width: "120px" }}>{val.title}</div>
                      <div style={{ width: "10px" }}>$&nbsp;{val.price}</div>
                      <div
                        style={{ fontSize: "larger" }}
                        class="d-flex justify-content-between"
                      >
                        <div>
                          <i
                            onClick={() => incrementHandler(val.id)}
                            style={{ cursor: "pointer" }}
                            class="fas fa-plus me-2"
                          ></i>
                        </div>
                        <div>{val.quantity}</div>
                        <div>
                          <i
                            onClick={() => decrementHandler(val.id)}
                            style={{ cursor: "pointer" }}
                            class="fas fa-minus ms-2"
                          ></i>
                        </div>
                      </div>
                      <div>
                        <i
                          style={{ cursor: "pointer", color: "red" }}
                          class="material-icons"
                          onClick={() => deleteHandler(val.id)}
                        >
                          delete
                        </i>
                      </div>
                    </div>
                    <hr></hr>
                  </>
                ))}
              </div>
            </div>
            <div style={{ width: "35%" }}>
              <h2>Total bill</h2>
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
                <Link
                  to={"/checkout"}
                  className="btn btn-primary addToCart"
                  type="button"
                >
                  <i className="fas fa-shopping-cart"></i>&nbsp;Checkout
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            <br></br>
            <h1>Your Cart Is Empty :/</h1>
          </>
        )}
      </section>
    </center>
  );
}

export default CartPage;
