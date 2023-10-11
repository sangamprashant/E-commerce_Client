import React, { useContext } from "react";
import styled from "styled-components";
import PrimaryBtn from "../comp/PrimaryBtn";
import ButtonLink from "../comp/ButtonLink";
import Cart from "../Icons/Cart";
import { CartContext } from "../../CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import hero from "../Images/hero.jpg";
import title from "../Images/title.png";

const Center = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
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
  img {
    width: 100%;
    max-width: 400px;
  }
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 40px;
  }
`;

const Colum = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    display: flex;
    flex: 1;
    align-items: flex-start;
  }

  .logo {
    width: 100%;
    max-width: 400px;
    height: auto;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.9);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 25px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: row;
  justify-content: center;
    align-items: flex-start;
    margin-bottom:20px;
  }
`;

const Featured = () => {
  const { CartProducts, setCartProducts, logged, token } =
    useContext(CartContext);
  const navigate = useNavigate();

  return (
    <Bg>
      <Center>
        <Wrapper>
          <Colum>
            <div>
              <Title>
                <img src={title} alt="Title" />
              </Title>
              <Desc>EDGE OF YOUR BODY</Desc>
              <ButtonWrapper>
                <ButtonLink
                  outline={1}
                  white={1}
                  title={logged ? "My orders" : "Explore"}
                  size="l"
                  to={logged ? "/myorder" : "/products"}
                />
                {logged ? (
                  <PrimaryBtn
                    primary
                    title="Go to cart"
                    size="l"
                    icon={<Cart />}
                    onClick={() => navigate("/cart")}
                  />
                ) : (
                  <PrimaryBtn
                    primary
                    title="Get Started"
                    size="l"
                    onClick={() => navigate("/signup")}
                  />
                )}
              </ButtonWrapper>
            </div>
          </Colum>
          <Colum>
            <img className="logo" src={hero} alt="Hero" />
          </Colum>
        </Wrapper>
      </Center>
    </Bg>
  );
};

export default Featured;
