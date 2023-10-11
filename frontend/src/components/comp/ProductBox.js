import React, { useContext } from "react";
import styled from "styled-components";
import PrimaryBtn from "./PrimaryBtn";
import { Link } from "react-router-dom";
import { CartContext } from "../../CartContext";
import axios from "axios";
import { toast } from "react-toastify";

const ProductWrapper = styled.div`
  background-color: #fff;
  padding: 10px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  @media (max-width: 992px) {
    padding: 5px;
  }
`;

const Box = styled(Link)`
  padding: 20px;
  height: 140px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  @media (max-width: 992px) {
    height: auto;
    padding: 10px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
  color: inherit;
  text-decoration: none;
  max-width: 150px;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  text-overflow: ellipsis;
  @media (max-width: 992px) {
    font-size: 0.8rem;
  }
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
  @media (max-width: 992px) {
    text-align: center;
  }
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
  @media (max-width: 992px) {
    font-size: 1rem;
  }
`;

const ProductImage = styled.img`
  max-width: 100%; /* Make the image responsive */
  height: auto;
`;

const ProductBox = ({ _id, title, description, price, images }) => {
  const { CartProducts, setCartProducts, logged, token } =
    useContext(CartContext);
  const url = "/products/" + _id;

  async function AddCart(id) {
    try {
      const response = await axios.post(
        "/api/add/to/cart",
        { productId: id },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        setCartProducts((prev) => [...prev, _id]);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error:", error);
    }
  }

  const isInCart = CartProducts.includes(_id);

  return (
    <ProductWrapper>
      <Box to={url}>
        <div>
          <ProductImage src={images[0]} alt={title} />
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
              title="Add to Cart"
              onClick={() => AddCart(_id)}
            />
          )}
          {isInCart && (
            <Link to="/cart">
              <PrimaryBtn primary title="Go to Cart" />
            </Link>
          )}
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductBox;
