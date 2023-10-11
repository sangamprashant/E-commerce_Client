import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../CartContext";
import { toast } from "react-toastify";
import icon from "./Images/icon2.png";
import title from "./Images/title.png";

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #222;
  z-index: 1000; /* Ensure the menu is on top of other content */
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 30px;
  div {
    display: flex;
    align-items: center;
  }
  .logo-icon {
    width: 60px;
    height: 60px;
  }
  .logo-title{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-evenly;
    align-items: flex-end;
  }
  .logo-title img {
    width: 100px;
    height: 30px;
  }
  .logo-title p {
    font-size:10px;
  }
  &:hover {
    color: #fff;
    text-decoration: none;
  }
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
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledNav = styled.nav`
  width: 100%; /* Ensure the nav takes full width */
  display: flex;
  justify-content: space-between; /* Spread items horizontally */
  align-items: center; /* Center items vertically */
  gap: 15px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    display: ${(props) => (props.isOpen ? "flex" : "none")};
  }
`;

const NavLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
  margin: 10px 0;
  white-space: nowrap; /* Prevent content from wrapping */
  &:hover {
    text-decoration: none;
  }
`;

const Count = styled.sup`
  background-color: red;
  padding: 1px 6px;
  border-radius: 50%;
  color: white;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  display: none;
  @media (max-width: 768px) {
    display: block;
    margin-bottom: 10px; /* Add spacing between label and button */
  }
`;

const Label = styled.div`
  display: none;
  color: #fff;
  @media (max-width: 768px) {
    display: block; /* Show label on smaller screens */
  }
`;

const ContentBelowMenu = styled.div`
  margin-top: 70px; /* Adjust this value as needed */
  /* Add other styles for content below the menu */
`;

const NavBar = ({ toggleLog }) => {
  const { CartProducts, setCartProducts, setLogged, logged } =
    useContext(CartContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handelLogOut = () => {
    sessionStorage.clear();
    navigate("/");
    setLogged(false);
    setCartProducts([]);
    toast.success("Logged out successfully.");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handelNav = () => {
    if (logged) {
      return (
        <>
          <NavLink to="/myorder" onClick={closeMenu}>
            My Order
          </NavLink>
          <NavLink to="/cart" onClick={closeMenu}>
            Cart <Count>{CartProducts.length}</Count>
          </NavLink>
          <NavLink
            to="/"
            onClick={() => {
              handelLogOut();
              closeMenu();
            }}
          >
            Log Out
          </NavLink>
        </>
      );
    } else {
      return (<>
{/* <NavLink to="/log" onClick={closeMenu}>
          {!toggleLog ? "Login" : "Get Started"}
        </NavLink> */}
        <NavLink to="/signin"> SignIn </NavLink>
        <NavLink to="/signup"> SignUp </NavLink>
      </>
        
      );
    }
  };

  return (
    <>
      <StyledHeader>
        <NavCenter>
          <Wraper>
            <div className="flex w-full justify-between">
              <Logo to="/">
                <div>
                  <img className="logo-icon" src={icon} />
                  <div className="logo-title">
                    <img className="" src={title} />

                    <p>EDGE OF YOUR BODY</p>
                  </div>
                </div>
              </Logo>
              <ToggleButton onClick={toggleMenu}>&#9776;</ToggleButton>
            </div>
            <StyledNav isOpen={isOpen}>
              <NavLink to="/" onClick={closeMenu}>
                Home
              </NavLink>
              <NavLink to="/products" onClick={closeMenu}>
                All products
              </NavLink>
              <NavLink to="/categories" onClick={closeMenu}>
                Categories
              </NavLink>
              {handelNav()}
            </StyledNav>
          </Wraper>
        </NavCenter>
      </StyledHeader>
      <ContentBelowMenu>{/* Your page content goes here */}</ContentBelowMenu>
    </>
  );
};

export default NavBar;
