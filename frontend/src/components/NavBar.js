import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../CartContext";
import { toast } from "react-toastify";

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

const NavBar = ({ toggleLog }) => {
  const { CartProducts, setCartProducts, setLogged, logged } = useContext(CartContext);
  const navigate = useNavigate();

  const handelLogOut = () => {
    sessionStorage.clear();
    navigate("/");
    setLogged(false);
    toast.success("Logged out successfully.")
  };

  const handelNav = () => {
    if (logged) {
      return [
        <>
          <NavLink to="/myorder">My Order</NavLink>
          <NavLink to="/cart">Cart <Count>{CartProducts.length}</Count></NavLink>
          <NavLink to="/" onClick={handelLogOut}>Log Out</NavLink>
        </>,
      ];
    } else {
      return [
        <>
          <NavLink to="/log">{!toggleLog ? "Login" : "Get Started"}</NavLink>
        </>
      ]
    }
  };

  return (
    <StyledHeader>
      <NavCenter>
        <Wraper>
          <Logo to="/">Ecommerce</Logo>
          <StyledNav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">All products</NavLink>
            <NavLink to="/categories">Categories</NavLink>
            {handelNav()}
          </StyledNav>
        </Wraper>
      </NavCenter>
    </StyledHeader>
  );
};

export default NavBar;
