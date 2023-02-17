import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// Redux Initial States
const initialState = {
  users: [],
  products: [],
  search: [],
  error: "",
  loading: true,
  checkout: {},
};
// Fetch Products Api Function
export const fetchProducts = createAsyncThunk(
  "user/fetchProducts",
  async () => {
    return await fetch("https://dummyjson.com/products")
      .then((resp) => resp.json())
      .catch((err) => console.log(err.message));
  }
);
const reduxSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Action For Add User
    addUser: (state, action) => {
      if (JSON.parse(localStorage.getItem("users")) !== null) {
        state.users = JSON.parse(localStorage.getItem("users"));
      }
      state.users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    // Action For Delete User
    deleteUser: (state, action) => {
      const newUser = state.users.filter((item) => item.id !== action.payload);
      state.users = newUser;
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    // Action For User Checkout Details
    addCheckout: (state, action) => {
      state.checkout = action.payload;
      localStorage.setItem("checkout", JSON.stringify(state.checkout));
    },
    // Action For Search Products
    searchArr: (state, action) => {
      state.search = action.payload;
    },
    // Action For Clear Search Array
    clearSearch: (state) => {
      state.search = [];
    },
  },
  extraReducers: (builder) => {
    // Fetch Products
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message;
    });
  },
});
// Export All Actions
export const { addUser, deleteUser, addCheckout, searchArr, clearSearch } =
  reduxSlice.actions;

export default reduxSlice.reducer;
