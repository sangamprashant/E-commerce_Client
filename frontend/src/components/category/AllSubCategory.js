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
    grid-template-columns: 1fr 1fr 1fr 1fr; /* 4 columns on larger screens */
  }

  @media (max-width: 992px) {
    grid-template-columns: 1fr 1fr 1fr; /* 3 columns on tablets */
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr 1fr; /* 2 columns on mobile */
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-transform: capitalize;
`;

const Loading = styled.div`
  text-align: center;
  padding-top:30px;
`;

const AllSubCategory = ({ _id, name }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [_id, name]);

  async function fetchData() {
    try {
      const response = await axios.get(
        `/api/products/by/category/${name}`
      );
      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {products.length > 0 && (
        <Loading>
          <Title>{name}</Title>
          <ProductGrid>
            {products?.map((product) => (
              <ProductBox {...product} key={product._id} />
            ))}
          </ProductGrid>
        </Loading>
      )}
    </div>
  );
};

export default AllSubCategory;
