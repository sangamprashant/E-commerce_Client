import React, { useContext } from "react";
import styled from "styled-components";
import PrimaryBtn from "./PrimaryBtn";
import { Link } from "react-router-dom";
import { CartContext } from "../../CartContext";
import axios from "axios";
import { toast } from "react-toastify";

const ProductWrapper = styled.div``;

const Box = styled.div`
  background-color: #fff;
  padding: 20px;
  height: 140px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 100px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
  color: inherit;
  text-decoration: none;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

const ProductBox = ({ _id, title, description, price, images }) => {
  const { CartProducts, setCartProducts, logged ,token} = useContext(CartContext);
  const url = "/products/" + _id;

  async function AddCart(id) {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/add/to/cart",
        { productId: id }, // Send the product ID in the request body
        {
          headers: {
            Authorization: "Bearer " + token, // Set the Authorization header
          },
        }
      );
      
      if (response.status === 200) {
        toast.success(response.data.message);
        setCartProducts(prev=>[...prev,_id])
      }
    } catch (error) {
      // Handle errors here
      toast.error(error.response.data.message)
      console.error("Error:", error);
    }
  }

  // Check if the product ID is in the CartProducts array
  const isInCart = CartProducts.includes(_id);

  return (
    <ProductWrapper>
      <Box>
        <div>
          <img src={images[0]} alt={title} />
        </div>
      </Box>
      <ProductInfoBox>
        <Title to={url}>{title}</Title>
        <PriceRow>
          <Price>₹{price}</Price>
          {logged && !isInCart && (
            <PrimaryBtn
              primary
              outline
              title={"Add to cart"}
              onClick={() => AddCart(_id)}
            />
          )}
          {isInCart && (
            <Link to="/cart">
              <PrimaryBtn primary title={"Go to Cart"} />
            </Link>
          )}
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductBox;
