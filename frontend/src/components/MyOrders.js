import React, { useContext, useEffect, useState } from "react";
import { Center } from "./CSSEXPORT";
import styled from "styled-components";
import { CartContext } from "../CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MainContainer = styled.div`
  margin: 150px auto;
  padding: 20px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin: 0;
  padding-bottom: 20px;
  font-weight: bold;
`;

const ProductTable = styled.div`
  background-color: black;
  color: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  cursor: pointer;
  span {
    color: yellow;
  }
  .Details {
    display: flex;
    justify-content: space-between;
  }
`;

const TableRow = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;
  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    margin-right: 20px;
  }
  h4 {
    font-size: 1.5rem;
    margin: 0;
  }
  p {
    font-size: 1rem;
    margin: 0;
    span {
      font-weight: bold;
    }
  }
  .arrow-icon {
    font-size: 2rem;
    margin-left: auto;
  }
`;

const MyOrders = () => {
  const { CartProducts, setCartProducts, token, Orders } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDetails();
  }, [Orders]);

  const fetchDetails = () => {
    axios
      .post("http://localhost:5000/api/order", { ids: Orders })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <Center>
      <MainContainer>
        <Title>My Orders</Title>
        {orders.length > 0 &&
          orders.map((order, index) => (
            <ProductTable
              key={index}
              onClick={() =>
                navigate(`/order/${order._id}`, { state: { orderDatas: order } })
              }
            >
              {order.line_items.map((item, key) => (
                <TableRow key={key}>
                  <img src={item.priceData.product_data.image} alt="Product" />
                  <div>
                    <h4>{item.priceData.product_data.name}</h4>
                    <p>
                      Quantity: <span>{item.quantity}</span>
                    </p>
                  </div>
                </TableRow>
              ))}
              <div className="Details">
                <div>
                  Order Status: <span>{order.status}</span>
                </div>
                <div>
                  Order Amount: <span>₹{order.total}</span>
                </div>
              </div>
            </ProductTable>
          ))}
      </MainContainer>
    </Center>
  );
};

export default MyOrders;
