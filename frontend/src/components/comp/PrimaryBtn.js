import React from "react";
import styled, { css } from "styled-components";
import { primary } from "./Color";

const StyledBtn = styled.button`
  border: 0;
  padding: 5px 5px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  font-weight:bold;
  svg {
    height: 16px;
    margin-right: 5px;
  }
  ${(props)=>
    props.block && css`
      display:block;
      width:100%;
    `
  }
  ${(props) =>
    props.black &&
    !props.outline &&
    css`
      background-color: #000;
      color: #fff;
    `}
  ${(props) =>
    props.black &&
    props.outline &&
    css`
      background-color: transparent;
      color: #000;
      border: 1px solid #000;
    `}
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
    !props.outline &&
    css`
      color: #fff;
      background-color: ${primary};
      border: 1px solid ${primary};
    `}
    ${(props) =>
    props.primary &&
    props.outline &&
    css`
      color: ${primary};
      background-color: transparent;
      border: 1px solid ${primary};
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

const PrimaryBtn = ({ title, icon, ...rest }) => {
  return (
    <StyledBtn {...rest}>
      {icon}
      {title}
    </StyledBtn>
  );
};

export default PrimaryBtn;
