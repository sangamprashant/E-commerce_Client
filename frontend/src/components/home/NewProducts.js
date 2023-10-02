import React from "react";
import styled from "styled-components";
import { Center } from "../CSSEXPORT";
import ProductBox from "../comp/ProductBox";

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap:20px;
  padding-top:20px;
`;

const NewProducts = ({ products }) => {
  console.log(products);
  return (
    <Center>
      <ProductGrid>
        {products.length > 0 &&
          products?.map((product) => <ProductBox {...product}/>)}
      </ProductGrid>
    </Center>
  );
};

export default NewProducts;
