import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/adminPages/Products";
import AddProduct from "./pages/adminPages/AddProduct";
import ProductUpdate from "./pages/adminPages/ProductUpdate";
import ProductDetial from "./pages/ProductDetial";
import PurchaseReceipt from "./pages/PurchaseReceipt";
import Orders from "./pages/adminPages/Orders";
import Users from "./pages/adminPages/Users";
import UpdateProfile from "./pages/UpdateProfile";


function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element:<Home/>
    },
    {
      path: "/products",
      element:<Product/>
    },
    {
      path: "/profile",
      element:<Profile/>
    },
    {
      path: "/cart",
      element:<Cart/>
    },
    {
      path: "/login",
      element:<Login/>
    },
    {
      path: "/register",
      element:<Register/>
    },
    {
      path: "/admin/products",
      element:<Products/>
    },
    {
      path: "/admin/addProduct",
      element:<AddProduct/>
    },
    {
      path: "/admin/updateproduct/:id",
      element:<ProductUpdate/>
    },
    {
      path: "/productdetail/:id",
      element:<ProductDetial/>
    },
    {
      path: "/purchaseReceipt",
      element:<PurchaseReceipt/>
    },
    {
      path: "/admin/orders",
      element:<Orders/>
    },
    {
      path: "/admin/users",
      element:<Users/>
    },
    {
      path: "/updateProfile/:id",
      element:<UpdateProfile/>
    },
  ])
  return (
    <>
      <RouterProvider router={route}></RouterProvider>
    </>
  );
}

export default App;
