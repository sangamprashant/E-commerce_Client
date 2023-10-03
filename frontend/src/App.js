import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AllProducts, Cart, Footer, Home, NavBar, ProductOpen, Signup } from "./components";
import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";

function App() {
  const [FeaturedProducts, setFeaturedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [CartProducts, setCartProducts] = useState([])
  const [AllCategories,setAllcategories] = useState([])

  useEffect(() => {
    fetchFeatured();
    fetchAllproduct();
    
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
      <NavBar />
      <Routes>
        <Route path="/" element={<Home FeaturedProduct={FeaturedProducts} products={products} />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/products" element={<AllProducts/>} />
        <Route path="/log" element={<Signup/>} />
        <Route path="/products/:id" element={<ProductOpen/>} />

      </Routes>
      <Footer/>
    </CartContext.Provider>

    </BrowserRouter>
  );
}

export default App;
