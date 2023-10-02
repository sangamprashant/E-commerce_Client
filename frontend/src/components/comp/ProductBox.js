import React, { useContext } from "react";
import styled from "styled-components";
import PrimaryBtn from "./PrimaryBtn";
import Cart from "../Icons/Cart";
import { Link } from "react-router-dom";
import { CartContext } from "../../CartContext";

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

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
  color:inherit;
  text-decoration:none;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items:center;
  justify-content:space-between;
  margin-top:2px;
`;

const Price = styled.span`
 font-size:1.2rem;
 font-weight:bold;
`;


const ProductBox = ({ _id, title, description, price, images }) => {
  const {CartProducts,setCartProducts} = useContext(CartContext);
  
  const url = "/products/"+_id;

  function AddCart(_id){
    setCartProducts(prev=>[...prev,_id])

  }

  return (
    <ProductWrapper>
      <Box>
        <div>
          <img src={images[0]} />
        </div>
      </Box>
      <ProductInfoBox>
        <Title to={url}> {title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <PrimaryBtn primary outline title={"Add to cart"} onClick={()=>AddCart(_id)}/>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductBox;
