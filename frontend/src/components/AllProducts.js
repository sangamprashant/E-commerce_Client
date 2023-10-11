import React, { useEffect, useState } from 'react';
import { Center } from './CSSEXPORT';
import axios from 'axios';
import ProductBox from './comp/ProductBox';
import styled from 'styled-components';

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 30px;
  padding-top: 0px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr 1fr; /* 4 columns on larger screens */
  }

  @media (max-width: 992px) {
    grid-template-columns: 1fr 1fr 1fr; /* 3 columns on tablets */
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr 1fr; /* two columns on mobile */
  }
`;

const SkeletonProductBox = styled.div`
  width: 100%;
  height: 200px; /* Adjust the height according to your design */
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite linear;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const ErrorText = styled.p`
  text-align: center;
  color: red;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px; /* Set the height as needed for centering vertically */
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  font-size: 16px;
  outline: none;
`;

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      setAllProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("An error occurred while fetching products.");
      setIsLoading(false);
    }
  };

  // Filter products based on the search query
  const filteredProducts = allProducts.filter((product) =>
  product.title && product.title.toLowerCase().includes(searchQuery.toLowerCase())
);

  return (
    <Center>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <SearchBar
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {error ? (
            <ErrorText>{error}</ErrorText>
          ) : (
            <ProductGrid>
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <SkeletonProductBox key={index} className="skeleton-loading" />
                  ))
                : filteredProducts.length === 0 ? (
                    <ErrorText>No products match your search.</ErrorText>
                  ) : (
                    filteredProducts.map((product) => (
                      <ProductBox {...product} key={product._id} />
                    ))
                  )}
            </ProductGrid>
          )}
        </div>
      </section>
    </Center>
  );
};

export default AllProducts;