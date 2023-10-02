import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, NavBar } from "./components";
import { useEffect, useState } from "react";

function App() {
  const [FeaturedProducts, setFeaturedProducts] = useState([]);
  const [products, setProducts] = useState([]);

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

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home FeaturedProduct={FeaturedProducts} products={products} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
