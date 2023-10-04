import React, { useContext, useEffect, useState } from "react";
import { Center, ProductImageBox, Table } from "./CSSEXPORT";
import styled from "styled-components";
import PrimaryBtn from "./comp/PrimaryBtn";
import { CartContext } from "../CartContext";
import axios from "axios";
import ButtonLink from "./comp/ButtonLink";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.8fr;
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const Quantity = styled.span`
  padding: 0 3px;
`;

const Cart = () => {
  const { CartProducts, setCartProducts } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchDetails();
  }, [CartProducts]);

  const fetchDetails = () => {
    if (CartProducts.length > 0) {
      axios
        .post("http://localhost:5000/api/cart", { ids: CartProducts })
        .then((response) => {
          setProducts(response.data);
        });
    }
  };

  function moreOfTheProduct(id) {
    setCartProducts(prev=>[...prev,id])
  }
  function lessOfTheProduct(id){
    setCartProducts(prev=>{
        const pos= prev.indexOf(id);
        if(pos !==-1){
           return prev.filter((value,index)=>index!==pos);
        }
        return prev;
    })
  }

  return (
    <Center>
      <ColumnsWrapper>
        <Box>
          <h2>Cart</h2>
          {products.length > 0 ? (
            <>
              <Table>
                <thead>
                  {/* <th>Image</th> */}
                  <th>Product</th>
                  <th className="quantity_box">Quantity</th>
                  <th>Price</th>
                </thead>
                <tbody>
                  {products.map((item) => (
                    <tr>
                      <td>
                        <ProductImageBox>
                          <img src={item.images[0]} />
                        </ProductImageBox>
                        {item.title}
                      </td>
                      <td className="quantity_box">
                        <PrimaryBtn title="-" onClick={()=>lessOfTheProduct(item._id)}/>
                        <Quantity>
                          {CartProducts.filter((id) => id === item._id).length}
                        </Quantity>
                        <PrimaryBtn title="+" onClick={()=>moreOfTheProduct(item._id)}/>
                      </td>
                      <td>
                        ₹
                        {CartProducts.filter((id) => id === item._id).length *
                          item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : (
            <div>cart is empty</div>
          )}
        </Box>
        {products.length > 0 && (
          <Box>
            <h2>Order information</h2>
            <input placeholder="Address" />
            <input placeholder="Address2" />
            <PrimaryBtn black block title="Continue to payment" />
          </Box>
        )}
      </ColumnsWrapper>
    </Center>
  );
};

export default Cart;
