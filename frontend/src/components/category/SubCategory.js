import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductBox from "../comp/ProductBox";
import styled from "styled-components";
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 30px;
  padding-top: 0px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr; /* Three columns on larger screens */
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr; /* Two columns on tablets */
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* Single column on mobile */
  }
`;

const SubCategory = ({ _id, name }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, [_id, name]);

  async function fetchData() {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/by/category/${name}`
      );
      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (error) {}
  }

  return (
    <div>
      {products.length > 0 && (
        <div className="container px-5 py-2 mx-auto">
          <h1>Category {name}</h1>

          <ProductGrid>
            {products?.map((product) => (
              <ProductBox {...product} />
            ))}
          </ProductGrid>
        </div>
      )}
    </div>
  );
};

export default SubCategory;
