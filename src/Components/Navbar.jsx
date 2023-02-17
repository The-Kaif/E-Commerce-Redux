import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Images/logo.png";
import { searchArr } from "../redux/reduxSlice";
function Navbar() {
  // Input State For Holding Value Of Serach Item
  const [input, setInput] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("Products")) !== null) {
      setProducts(JSON.parse(localStorage.getItem("Products")));
    }
  }, []);
  // Search Button Handler
  const searchHandler = (e) => {
    e.preventDefault();
    let temp = [];
    for (let i = 0; i < products.length; i++) {
      if (products[i].title.toLowerCase().startsWith(input.toLowerCase()))
        temp.push(products[i]);
    }
    dispatch(searchArr(temp));
    setInput("");
  };
  // Logout button Handler
  const logoutHandler = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };
  return (
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#0">
          <img style={{ width: "6em" }} src={logo} alt="logo" />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#0">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#0">
                About
              </a>
            </li>
            {user.role === "User" ? (
              <li class="nav-item">
                <Link to={"/cart"} class="nav-link active" aria-current="page">
                  Cart{" "}
                  {JSON.parse(localStorage.getItem("cart")) !== null
                    ? JSON.parse(localStorage.getItem("cart")).length
                    : 0}
                </Link>
              </li>
            ) : null}
          </ul>
          <form class="d-flex">
            <input
              onChange={(e) => setInput(e.target.value)}
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={input}
            />
            <button
              onClick={searchHandler}
              class="btn btn-success searchBtn"
              type="submit"
            >
              Search
            </button>
          </form>
          <li class="nav-item pb-4 ms-3">
            <a class="nav-link active" aria-current="page" href="#0">
              Welcome,&nbsp;<i class="fas fa-user-alt"></i>&nbsp;{user.username}
            </a>
          </li>
          <button
            onClick={logoutHandler}
            type="button"
            class="btn btn-dark ms-3 success"
          >
            <i class="fas fa-sign-out-alt"></i>&nbsp;LOGOUT
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
