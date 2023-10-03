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
`;


const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    // Call fetchProducts when the component mounts
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      // Use response.data to set the products in state
      setAllProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <Center>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <ProductGrid>
            {allProducts?.map((product) => (
              <ProductBox {...product}/>
            ))}
          </ProductGrid>
        </div>
      </section>
    </Center>
  );
};

export default AllProducts;
