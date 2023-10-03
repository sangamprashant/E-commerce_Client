import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../CartContext";

const StyledHeader = styled.header`
  background-color: #222;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

const NavCenter = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Wraper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 15px;
`;

const NavLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
`;

const Count = styled.sup`
  background-color: red;
  padding: 1px 6px;
  border-radius: 50%;
  color: white;
`;

const NavBar = () => {
  const { CartProducts, setCartProducts } = useContext(CartContext);
  return (
    <StyledHeader>
      <NavCenter>
        <Wraper>
          <Logo to="/">Ecommerce</Logo>
          <StyledNav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">All products</NavLink>
            <NavLink to="/categories">Categories</NavLink>
            <NavLink to="/account">Account</NavLink>
            <NavLink to="/cart">
              Cart <Count>{CartProducts.length}</Count>
            </NavLink>
          </StyledNav>
        </Wraper>
      </NavCenter>
    </StyledHeader>
  );
};

export default NavBar;
