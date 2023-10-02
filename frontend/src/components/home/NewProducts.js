import React from "react";
import styled from "styled-components";
import { Center } from "../CSSEXPORT";
import ProductBox from "../comp/ProductBox";

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 30px;
  padding-top: 0px;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: normal;
`;

const NewProducts = ({ products }) => {
  // console.log(products);
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductGrid>
        {products.length > 0 &&
          products?.map((product) => <ProductBox {...product} />)}
      </ProductGrid>
    </Center>
  );
};

export default NewProducts;
