import styled from "styled-components";

const Center = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Table = styled.table`
width:100%;
th{
  text-align:left;
  text-teansform:uppercase;
  color:#ccc;
  font-weight:600;
  font-size:.7rem;

}
td{
  padding:10px 0 ;
  border-top:1px solid rgba(0,0,0,.1);
  
}

`;


const ProductImageBox = styled.div`
  width:100px;
  height:100px;
  padding:10px;
  border:1px solid rgba(0,0,0,.1);
  border-radius:10px;
  display:flex;
  align-items:center;
  justify-content:center;
  img{
    max-width:100px;
    max-height:100px;
  }
`;

export {
    Center,
    Table,
    ProductImageBox,
}