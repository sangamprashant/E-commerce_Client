import React, { useContext } from "react";
import styled from "styled-components";
import PrimaryBtn from "../comp/PrimaryBtn";
import ButtonLink from "../comp/ButtonLink";
import Cart from "../Icons/Cart";
import { CartContext } from "../../CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Center = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 3rem;
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content:center;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 40px;
  }
`;

const Colum = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    display: contents;
    flex: 1;
    align-items: flex-start;
  }

  img {
    width: 100%;
    max-width: 400px;
    height: auto;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.9);

    @media (min-width: 768px) {
      width: 400px;
      height: 400px;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
  margin-top: 25px;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;
  }
`;

const Featured = ({ product }) => {
  const { CartProducts, setCartProducts, logged, token } =
    useContext(CartContext);
  const navigate = useNavigate();

  async function addfeatureProductToCart() {
    try {
      const response = await axios.post(
        "/api/add/to/cart",
        { productId: product._id }, // Send the product ID in the request body
        {
          headers: {
            Authorization: "Bearer " + token, // Set the Authorization header
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        setCartProducts((prev) => [...prev, product._id]);
      }
    } catch (error) {
      // Handle errors here
      toast.error(error.response.data.message);
      console.error("Error:", error);
    }
  }
  const isInCart = CartProducts.includes(product._id);

  return (
    <Bg>
      <Center>
        <Wrapper>
          <Colum>
            <div>
              <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>
              <ButtonWrapper>
                <ButtonLink
                  outline={1}
                  white={1}
                  title="Read more"
                  size="l"
                  to={`/products/${product._id}`}
                />
                {logged ? (
                  <>
                    {!isInCart ? (
                      <PrimaryBtn
                        primary
                        title="Add to cart"
                        size="l"
                        icon={<Cart />}
                        onClick={() => addfeatureProductToCart()}
                      />
                    ) : (
                      <PrimaryBtn
                        primary
                        title="Go to cart"
                        size="l"
                        icon={<Cart />}
                        onClick={() => navigate("/cart")}
                      />
                    )}
                  </>
                ) : (
                  <PrimaryBtn
                    primary
                    title="Get Started"
                    size="l"
                    onClick={() => navigate("/log")}
                  />
                )}
              </ButtonWrapper>
            </div>
          </Colum>
          <Colum>
            <img
              src={product.images && product?.images[0]}
              alt={product.title}
            />
          </Colum>
        </Wrapper>
      </Center>
    </Bg>
  );
};

export default Featured;
