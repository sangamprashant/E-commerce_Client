import React, { useContext } from "react";
import { Center } from "../CSSEXPORT";
import styled from "styled-components";
import PrimaryBtn from "../comp/PrimaryBtn";
// import { useNavigate } from "react-router-dom";
import ButtonLink from "../comp/ButtonLink";
import Cart from "../Icons/Cart";
import { CartContext } from "../../CartContext";
import { useNavigate } from "react-router-dom";
// import { CartContext } from "../../CartContext";
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  img {
    max-width: 100%;
  }
  div {
  }
`;

const Colum = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

const Featured = ({ product,logged }) => {
  // const { cartProducts, setCartProducts } = useContext(CartContext);
  const {CartProducts,setCartProducts} = useContext(CartContext);
  const navigate = useNavigate()

function addfeatureProductToCart (){
  setCartProducts(prev=>[...prev,product._id])
}

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
                {logged?<PrimaryBtn
                  primary
                  title="Add to cart"
                  size="l"
                  icon={
                   <Cart/>
                  }
                  onClick={()=>addfeatureProductToCart()}
                />:<PrimaryBtn
                  primary
                  title="Get Satrted"
                  size="l"
                  onClick={()=>navigate("/log")}
                />}
              </ButtonWrapper>
            </div>
          </Colum>
          <Colum>
            <img src={product.images&&product?.images[0]} />
          </Colum>
        </Wrapper>
      </Center>
    </Bg>
  );
};

export default Featured;
