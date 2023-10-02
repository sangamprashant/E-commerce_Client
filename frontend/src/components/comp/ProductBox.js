import React from "react";
import styled from "styled-components";
import PrimaryBtn from "./PrimaryBtn";
import Cart from "../Icons/Cart";

const ProductWrapper = styled.div``;

const Box = styled.div`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled.h2`
font-weight:normal;
font-size:.9rem;
margin:0;
`;


const ProductBox = ({ _id, title, description, price, images }) => {
  return (
    <ProductWrapper>
      <Box>
        <div>
          <img src={images[0]} />
        </div>
      </Box>
      <Title>      {title}</Title>
      <PrimaryBtn primary  icon={<Cart/>}/>

    </ProductWrapper>
  );
};

export default ProductBox;
