import React from 'react'
import styled from 'styled-components'
const InputStyle = styled.input`
    width:100%;
    padding:5px;
    margin-bottom:5px;
    border:1px solid #ccc;
    border-radius:5px;
    box-sizing:border-box;
`;

const Input = (props) => {
  return (
    <InputStyle {...props} />
  )
}

export default Input
