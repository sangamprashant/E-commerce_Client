import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledBtn = styled(Link)`
  border: 0;
  padding: 5px 50px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items:center;
  text-decoration:none;
  svg {
    height: 16px;
    margin-right:5px;

  }
  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: #fff;
      color: #000;
    `}
  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: white;
      border: 1px solid white;
    `}
  ${(props) =>
    props.primary &&
    css`
      color: #fff;
      background-color: #5542f6;
      border: 1px solid #5542f6;
    `}
  ${(props) =>
    props.size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
      svg {
    height: 20px;
  }
    `}
`;

const ButtonLink = ({ title, icon, ...rest }) => {
  return (
    <StyledBtn {...rest}>
      {icon}
      {title}
    </StyledBtn>
  );
};

export default ButtonLink;
