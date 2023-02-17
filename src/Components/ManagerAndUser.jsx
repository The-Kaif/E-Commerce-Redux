import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/reduxSlice";
import { clearSearch } from "../redux/reduxSlice";
import Navbar from "./Navbar";
function ManagerAndUser() {
  const dispatch = useDispatch();
  // Redux State
  const Loaderstate = useSelector((state) => state.products.loading);
  const ProductState = useSelector((state) => state.products.products.products);
  // UseState For Products Display
  const [products, setProducts] = useState([]);
  // UseState For Role
  const [role, setRole] = useState([]);
  const [input, setInput] = useState("");
  const [cartArr, setCartArr] = useState([]);
  const searchArr = useSelector((state) => state.products);
  const [order, setOrder] = useState("");
  const [type, setType] = useState("");
  useEffect(() => {
    // Dispatch Fecth Product Action
    dispatch(fetchProducts());
    let tempRole = JSON.parse(localStorage.getItem("currentUser"));
    // Set Role Into State
    setRole(tempRole);
    if (JSON.parse(localStorage.getItem("cart")) !== null) {
      // Set Cart Data Into State
      setCartArr(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("Products")) !== null) {
      setProducts(JSON.parse(localStorage.getItem("Products")));
    } else if (ProductState !== undefined) {
      let temp = [];
      for (let i = 0; i < ProductState.length; i++) {
        let obj = {
          id: ProductState[i].id,
          thumbnail: ProductState[i].thumbnail,
          title: ProductState[i].title,
          description: ProductState[i].description,
          stock: ProductState[i].stock,
          price: ProductState[i].price,
          rating: ProductState[i].rating,
          quantity: 1,
        };
        temp.push(obj);
      }
      setProducts(temp);
      // Set All Products Into Local Storage
      localStorage.setItem("Products", JSON.stringify(temp));
    }
  }, [ProductState]);
  // Update Handler
  const updateHandler = (id) => {
    if (input === "") {
      alert("Blank Field Can Not Be Added !");
    } else if (isNaN(input) === true) {
      alert("Type Only Numbers !");
    } else {
      products.map((val) => {
        if (val.id === id) {
          val.stock = Number(input);
        }
      });
      setProducts([...products]);
      localStorage.setItem("Products", JSON.stringify(products));
    }
  };
  // Add To Cart Handler
  const addToCart = (val, id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart === null) {
      cartArr.push(val);
      setCartArr([...cartArr]);
      localStorage.setItem("cart", JSON.stringify(cartArr));
    } else {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
          alert("Item Already In Your Cart !");
          return;
        }
      }
      cartArr.push(val);
      setCartArr([...cartArr]);
      localStorage.setItem("cart", JSON.stringify(cartArr));
    }
  };
  // Clear Serach Handler
  const clearSearchHandler = () => {
    dispatch(clearSearch());
  };
  // Filter Handler
  const filterHandler = () => {
    if (order === "Low To High" && type === "Price") {
      products.sort((a, b) => a.price - b.price);
    } else if (order === "Low To High" && type === "Rating") {
      products.sort((a, b) => a.rating - b.rating);
    } else if (order === "Low To High" && type === "Stock") {
      products.sort((a, b) => a.stock - b.stock);
    } else if (order === "High To Low" && type === "Price") {
      products.sort((a, b) => b.price - a.price);
    } else if (order === "High To Low" && type === "Rating") {
      products.sort((a, b) => b.rating - a.rating);
    } else if (order === "High To Low" && type === "Stock") {
      products.sort((a, b) => b.stock - a.stock);
    }
    setProducts([...products]);
  };
  // Clear Filter
  const clearFilter = () => {
    let temp = [];
    for (let i = 0; i < ProductState.length; i++) {
      let obj = {
        id: ProductState[i].id,
        thumbnail: ProductState[i].thumbnail,
        title: ProductState[i].title,
        description: ProductState[i].description,
        stock: ProductState[i].stock,
        price: ProductState[i].price,
        rating: ProductState[i].rating,
        quantity: 1,
      };
      temp.push(obj);
    }
    setProducts(temp);
  };
  return (
    <div>
      <center>
        <Navbar />
        <div style={{ marginTop: "7em" }}>
          {/* Display Filters */}
          <div class="d-flex justify-content-between">
            <select
              onChange={(e) => setOrder(e.target.value)}
              class="form-select m-1"
              aria-label="Default select example"
            >
              <option selected disabled>
                --Select Order--
              </option>
              <option value="Low To High">Low To High</option>
              <option value="High To Low">High To Low</option>
            </select>
            <select
              onChange={(e) => setType(e.target.value)}
              class="form-select m-1"
              aria-label="Default select example"
            >
              <option selected disabled>
                --Select Type--
              </option>
              <option value="Price">Price</option>
              <option value="Rating">Rating</option>
              <option value="Stock">Stock</option>
            </select>
            <button
              onClick={filterHandler}
              type="button"
              class="btn btn-danger me-1"
            >
              Filter
            </button>
            <button
              onClick={clearFilter}
              type="button"
              class="btn btn-danger me-1"
            >
              Clear Filter
            </button>
          </div>
          {/* Display Products */}
          {searchArr.search.length !== 0
            ? searchArr.search.map((val, index) => (
                <>
                  <div
                    key={index}
                    className="card"
                    style={{
                      width: "18rem",
                      display: "inline-block",
                      margin: "1em",
                    }}
                  >
                    <img
                      style={{ height: "250px" }}
                      src={val.thumbnail}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 style={{ height: "60px" }} className="card-title">
                        {val.title}
                      </h5>
                      <p
                        style={{
                          height: "120px",
                          textAlign: "justify",
                          color: "gray",
                        }}
                        className="card-text"
                      >
                        {val.description}
                      </p>
                      <p style={{ textAlign: "left" }}>Stock {val.stock}</p>
                      <span style={{ float: "left" }}>
                        Price <span>${val.price}&nbsp;</span>
                      </span>

                      <span style={{ marginLeft: "3.2em" }}>
                        Rating{" "}
                        <span>
                          {val.rating}
                          <i
                            style={{ color: "yellow" }}
                            className="fas fa-star"
                          ></i>
                        </span>
                      </span>
                    </div>
                    <div className="card-footer">
                      {role === "Manager" ? (
                        <div key={index} className="input-group mb-3">
                          <input
                            onChange={(e) => setInput(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="New Stock..."
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                          />
                          <button
                            onClick={() => updateHandler(val.id)}
                            className="input-group-text"
                            id="basic-addon2"
                          >
                            Update
                          </button>
                        </div>
                      ) : (
                        <div className="d-grid gap-2 col-12 mx-auto">
                          <button
                            onClick={() => addToCart(val, val.id)}
                            className="btn btn-primary addToCart"
                            type="button"
                          >
                            <i className="fas fa-shopping-cart"></i>&nbsp;ADD TO
                            CART
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ))
            : null}
          {searchArr.search.length !== 0 ? (
            <div class="d-grid gap-2 col-6 mx-auto">
              <button
                onClick={clearSearchHandler}
                class="btn btn-success"
                type="button"
              >
                Clear Search
              </button>
            </div>
          ) : null}
          <br></br>
          {Loaderstate === true ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            products.map((val, index) => (
              <div
                key={index}
                className="card"
                style={{
                  width: "18rem",
                  display: "inline-block",
                  margin: "1em",
                }}
              >
                <img
                  style={{ height: "250px" }}
                  src={val.thumbnail}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 style={{ height: "60px" }} className="card-title">
                    {val.title}
                  </h5>
                  <p
                    style={{
                      height: "120px",
                      textAlign: "justify",
                      color: "gray",
                    }}
                    className="card-text"
                  >
                    {val.description}
                  </p>
                  <p style={{ textAlign: "left" }}>Stock {val.stock}</p>
                  <span style={{ float: "left" }}>
                    Price <span>${val.price}&nbsp;</span>
                  </span>

                  <span style={{ marginLeft: "3.2em" }}>
                    Rating{" "}
                    <span>
                      {val.rating}
                      <i
                        style={{ color: "yellow" }}
                        className="fas fa-star"
                      ></i>
                    </span>
                  </span>
                </div>
                <div className="card-footer">
                  {role.role === "Manager" ? (
                    <div key={index} className="input-group mb-3">
                      <input
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="New Stock..."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                      <button
                        onClick={() => updateHandler(val.id)}
                        className="input-group-text"
                        id="basic-addon2"
                      >
                        Update
                      </button>
                    </div>
                  ) : (
                    <div className="d-grid gap-2 col-12 mx-auto">
                      <button
                        onClick={() => addToCart(val, val.id)}
                        className="btn btn-primary addToCart"
                        type="button"
                      >
                        <i className="fas fa-shopping-cart"></i>&nbsp;ADD TO
                        CART
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </center>
    </div>
  );
}

export default ManagerAndUser;
