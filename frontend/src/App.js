import "./App.css";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AllProducts, Cart, Categories, Footer, Home, MyOrders, NavBar, Order, ProductOpen, Signup } from "./components";
import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";
import styled from "styled-components";

const ContentBelowMenu = styled.div`
  margin-top: 170px; 
  
`;

function App() {
  const [FeaturedProducts, setFeaturedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [CartProducts, setCartProducts] = useState([])
  const [AllCategories,setAllcategories] = useState([])
  const [Orders,setOrders] = useState([])
  const [toggleLog, setToggleLog] = useState(true)
  const [token,setToken] = useState(sessionStorage.getItem("token"))
  const [logged,setLogged] = useState(token?true:false)

  useEffect(() => {
    fetchFeatured();
    fetchAllproduct();
    fetchAllCategories();
    if(logged){

      usersData();
    }
  }, [logged]);

  const fetchFeatured = () => {
    // Make an HTTP GET request to fetch FeaturedProducts
    fetch("http://localhost:5000/api/products/6511b52ee7ea010ee99afb59")
      .then((response) => response.json())
      .then((data) => {
        setFeaturedProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching FeaturedProducts:", error);
      });
  };

  const fetchAllproduct = async ()=>{
    await fetch("http://localhost:5000/api/products/latest")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching FeaturedProducts:", error);
      });
  }

 const fetchAllCategories = async () => {
  const response = await axios.get("http://localhost:5000/api/categories")
  setAllcategories(response.data)
 }

  const usersData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user/data",        {
        headers: {
          Authorization: "Bearer " + token, // Set the Authorization header
        },
      })
      if(response.status===200){
        setCartProducts(response.data.user.carts)
        setOrders(response.data.user.orders)
      }
    } catch (error) {
      toast.error(error.response.data.message)
      
    }
  }

  return (
    <BrowserRouter>
    <CartContext.Provider value={{CartProducts, setCartProducts,setLogged,logged,token,setToken,Orders,setOrders}}>
      <NavBar toggleLog={toggleLog}/>
        <Routes>
          <Route path="/" element={<Home FeaturedProduct={FeaturedProducts} products={products} logged={logged}/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/products" element={<AllProducts/>} />
          <Route path="/log" element={<Signup setToggleLog={setToggleLog}/>} />
          <Route path="/products/:id" element={<ProductOpen/>} />
          <Route path="/myorder" element={<MyOrders/>} />
          <Route path="/order/:data" element={<Order/>} />
          <Route path="/categories" element={<Categories AllCategories={AllCategories}/>} />

        </Routes>
      <Footer/>
      <ToastContainer theme="dark"/>
    </CartContext.Provider>

    </BrowserRouter>
  );
}

export default App;
