// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Buyers from "./pages/Buyers";
import LoginPage from "./pages/Login";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="buyers" element={<Buyers />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route path="login" element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
    <Toaster/>
    </>
  );
}

export default App;

