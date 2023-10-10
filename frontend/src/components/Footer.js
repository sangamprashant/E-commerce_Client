import React from "react";
import styled from "styled-components";
import icon from "./Images/icon2.png";
import footer from "./Images/footer.png";

const StyledFooter = styled.footer`
  background-color: #222;
  color: #fff;
  padding: 20px 0;
  text-align: center;
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Logo = styled.a`
  color: #fff;
  display: flex;
  justify-content: center;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  img {
    height: 80px;
    width: 200px;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;
  margin: 5px 0;
  &:hover {
    text-decoration: none;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <FooterContainer>
        <div className="flex cursor-pointer">
          <Logo href="/">
            <img src={footer} alt="Logo" />
          </Logo>
          {/* <div>
            <p className="text-sm text-gray-500 mt-2">
              © {new Date().getFullYear()} KLOTH
            </p>
            <p>EDGE OF YOUR BODY</p>
          </div> */}
        </div>

        <FooterLinks>
          <FooterLink href="/policy-terms">Policy Terms</FooterLink>
          <FooterLink href="/how-to-use">How to Use</FooterLink>
        </FooterLinks>
        <div className="mt-4">
          <a className="text-gray-500 mx-2" href="#">
            <i className="fab fa-facebook"></i>
          </a>
          <a className="text-gray-500 mx-2" href="#">
            <i className="fab fa-twitter"></i>
          </a>
          <a className="text-gray-500 mx-2" href="#">
            <i className="fab fa-instagram"></i>
          </a>
          <p className="text-sm text-gray-500 mt-2">
            © {new Date().getFullYear()} KLOTH
          </p>
        </div>
      </FooterContainer>
    </StyledFooter>
  );
};

export default Footer;
