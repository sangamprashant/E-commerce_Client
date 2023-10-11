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
  border-radius: 20px;
  background-color: #f7fbff;
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
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  cursor: pointer;
  background-color: #e2e2e2;
  span {
    color: red;
  }
  .Details {
    display: flex;
    justify-content: space-between;
  }
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.5);
  &:hover {
    background-color: #eee;
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

const StatusFilterDropdown = styled.select`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  width: 100%;
  border: 1px solid gray;
  &:focus {
    border: none;
  }
  &:hover {
    border: none;
  }

  option {
    &.all {
      font-weight: bold;
    }

    span {
      color: red;
      text-align: right;
    }
  }
`;

const SkeletonLoader = styled.div`
  /* Define your skeleton loading effect using CSS */
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite linear;
  width: 100%;
  height: 200px;
  margin-bottom: 20px;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const MyOrders = () => {
  const { CartProducts, setCartProducts, token, Orders } =
    useContext(CartContext);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    } else {
      fetchDetails();
    }
  }, [Orders]);

  const fetchDetails = () => {
    axios
      .post(
        "/api/order",
        { ids: Orders },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        setOrders(response.data);
        setIsLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    if (selectedStatus === "all") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(
        (order) => order.status === selectedStatus
      );
      setFilteredOrders(filtered);
    }
  }, [selectedStatus, orders]);

  const orderStatusOptions = [
    "confirm",
    "packing",
    "packed",
    "shipping",
    "out to deliver",
    "delivered",
    "canceled",
  ];

  // Helper function to count orders for each status
  const countOrdersByStatus = (status) => {
    return orders.filter((order) => order.status === status).length;
  };

  return (
    <Center>
      <MainContainer>
        <Title>My Orders</Title>

        <div className="my-3">
          <StatusFilterDropdown
            onChange={(e) => setSelectedStatus(e.target.value)}
            value={selectedStatus}
          >
            <option key="all" value="all" className="">
              All ({orders.length})
            </option>
            {orderStatusOptions.map((status) => (
              <option key={status} value={status}>
                {status}{" "}
                <span className="count">({countOrdersByStatus(status)})</span>
              </option>
            ))}
          </StatusFilterDropdown>
        </div>
        {isLoading ? (
          // Display skeleton loading while fetching data
          Array.from({ length: 2 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))
        ) : filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => (
            <ProductTable
              key={index}
              onClick={() =>
                navigate(`/order/${order._id}`, {
                  state: { orderDatas: order },
                })
              }
            >
              {order.line_items.map((item, key) => (
                <TableRow key={key}>
                  <img
                    src={item.price_data.product_data.images[0]}
                    alt="Product"
                  />
                  <div>
                    <h4>{item.price_data.product_data.name}</h4>
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
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </MainContainer>
    </Center>
  );
};

export default MyOrders;
