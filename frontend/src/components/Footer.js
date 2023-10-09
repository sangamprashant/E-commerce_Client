import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: #222;
  color: #fff;
  padding: 20px 0;
  text-align: center;
`;

const Logo = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div className=" mx-auto">
        <Logo href="/">Your Logo</Logo>
        <p className="text-sm text-gray-500 mt-2">
          © {new Date().getFullYear()} Your Company —{' '}
          <a
            href="https://twitter.com/yourtwitter"
            className="text-gray-600 ml-1"
            rel="noopener noreferrer"
            target="_blank"
          >
            @yourtwitter
          </a>
        </p>
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
        </div>
      </div>
    </StyledFooter>
  );
};

export default Footer;
