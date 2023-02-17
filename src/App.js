import "./App.css";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AdminDashboard from "./Components/AdminDashboard";
import ManagerAndUser from "./Components/ManagerAndUser";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import store from "./redux/store";
import CartPage from "./Components/CartPage";
import Checkout from "./Components/Checkout";
import Bill from "./Components/Bill";

function App() {
  let router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/admin" element={<AdminDashboard />}></Route>
        <Route path="/products" element={<ManagerAndUser />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/bill" element={<Bill />}></Route>
      </>
    )
  );
  return (
    <div>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
