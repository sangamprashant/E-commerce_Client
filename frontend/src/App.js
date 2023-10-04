import "./App.css";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AllProducts, Cart, Categories, Footer, Home, NavBar, ProductOpen, Signup } from "./components";
import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";

function App() {
  const [FeaturedProducts, setFeaturedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [CartProducts, setCartProducts] = useState([])
  const [AllCategories,setAllcategories] = useState([])
  const [toggleLog, setToggleLog] = useState(true)

  useEffect(() => {
    fetchFeatured();
    fetchAllproduct();
    fetchAllCategories();
  }, []);

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

  return (
    <BrowserRouter>
    <CartContext.Provider value={{CartProducts, setCartProducts}}>
      <NavBar toggleLog={toggleLog}/>
      <Routes>
        <Route path="/" element={<Home FeaturedProduct={FeaturedProducts} products={products} />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/products" element={<AllProducts/>} />
        <Route path="/log" element={<Signup setToggleLog={setToggleLog}/>} />
        <Route path="/products/:id" element={<ProductOpen/>} />
        <Route path="/categories" element={<Categories AllCategories={AllCategories}/>} />

      </Routes>
      <Footer/>
      <ToastContainer theme="dark"/>
    </CartContext.Provider>

    </BrowserRouter>
  );
}

export default App;
