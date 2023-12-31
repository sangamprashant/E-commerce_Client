import React, { useContext, useEffect, useState } from "react";
import { Center, ProductImageBox, Table } from "./CSSEXPORT";
import styled from "styled-components";
import PrimaryBtn from "./comp/PrimaryBtn";
import { CartContext } from "../CartContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "./comp/Input";

const ColumnsWrapper = styled.div`
  padding: 70px 0;
  display: grid;
  grid-template-columns: 1.3fr 0.8fr;
  gap: 40px;
  margin-top: 40px;

  @media (max-width: 992px) {
    display: frid;
    grid-template-columns: 1fr;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Box = styled.div`
  height: fit-content;
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  h2 {
    font-size: 2rem;
  }
`;

const Quantity = styled.span`
  padding: 0 3px;
`;

const RemoveButton = styled.button`
  background-color: red;
  color: white;
  padding: 0 10px;
  border-radius: 20px;
  margin: 5px;
  cursor: pointer;
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const PaymentBlock = styled.div`
  margin: 30px 0;
  display: flex;
  gap: 10px;
  flex-direction: column-reverse;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

const ErrorMessageBox = styled.div`
  color: red;
  font-weight: bold;
  text-align: center;
`;

const LoadingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  background-color: #f0f0f0;
  border-radius: 10px;
`;

const LoadingMessage = styled.p`
  font-weight: bold;
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.3);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin-left: 10px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Cart = () => {
  const { CartProducts, setCartProducts, token, setOrders } =
    useContext(CartContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  // order information
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [street, setStreet] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [APhone, setAPhone] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    } else {
      fetchDetails();
    }
  }, [CartProducts]);

  const fetchDetails = () => {
    setError(null); // Clear any previous errors
    if (CartProducts.length > 0) {
      axios
        .post(
          "/api/cart",
          { ids: CartProducts },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((response) => {
          setProducts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(error); // Set the error state
        });
    } else {
      setLoading(false);
    }
  };
  async function lessOfTheProduct(id) {
    try {
      const response = await axios.post(
        "/api/remove/from/cart",
        { productId: id }, // Send the product ID in the request body
        {
          headers: {
            Authorization: "Bearer " + token, // Set the Authorization header
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        setCartProducts((prev) => {
          const pos = prev.indexOf(id);
          if (pos !== -1) {
            return prev.filter((value, index) => index !== pos);
          }
          return prev;
        });
      }
    } catch (error) {
      // Handle errors here
      toast.error(error.response.data.message);
      console.error("Error:", error);
    }
  }
  async function moreOfTheProduct(id) {
    try {
      const response = await axios.post(
        "/api/add/to/cart",
        { productId: id }, // Send the product ID in the request body
        {
          headers: {
            Authorization: "Bearer " + token, // Set the Authorization header
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setCartProducts((prev) => [...prev, id]);
      }
    } catch (error) {
      // Handle errors here
      toast.error(error.response.data.message);
      console.error("Error:", error);
    }
  }
  let total = 0;
  for (const productId of CartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }
  const makeOrder = async () => {
    // console.log(paid,paidStatus)
    // return
    if (name && email && city && postalCode && street && country && phone) {
      try {
        const response = await axios.post(
          "/api/make/order",
          {
            name,
            email,
            city,
            postalCode,
            street,
            country,
            CartProducts,
            phone,
            APhone,
            total,
          },
          {
            headers: {
              Authorization: "Bearer " + token, // Set the Authorization header
            },
          }
        );
        if (response.status === 200) {
          console.log(response);
          toast.success(response.data.message);
          setOrders((prev) => [...prev, response.data.order._id]);
          setCartProducts([]);
          navigate("/myorder");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Please fill all the fields.");
    }
  };

  // const makeOrderCash = async ( ) => {
  //   // console.log(paid,paidStatus)
  //   // return
  //   if (name && email && city && postalCode && street && country && phone) {
  //     try {
  //       const response = await axios.post(
  //         "/api/make/order/paid",
  //         {
  //           name,email,city,postalCode,street,country,CartProducts,phone,APhone,total,
  //         },
  //         {
  //           headers: {
  //             Authorization: "Bearer " + token, // Set the Authorization header
  //           },
  //         }
  //       );
  //       console.log(response )
  //       if (response.status === 200) {

  //           // console.log(response)
  //           // toast.success(response.data.message);
  //           // setOrders((prev) => [...prev, response.data.order._id]);
  //           // setCartProducts([]);
  //           window.location.href=response?.data?.session?.url;
  //       }

  //     } catch (error) {
  //       console.log(error)
  //       // toast.error(error.response.message);
  //     }
  //   } else {
  //     toast.error("Please fill all the fields.");
  //   }
  // };

  const removeAllItems = async (id) => {
    const response = await axios.post(
      "/api/remove/all/from/cart",
      { productId: id },
      {
        headers: {
          Authorization: "Bearer " + token, // Set the Authorization header
        },
      }
    );
    if (response.status === 200) {
      toast.success(response.data.message);
      // setCartProducts(CartProducts.filter((Products) => Products !== id));
      setCartProducts(CartProducts.filter((product) => product !== id));
      fetchDetails();
    }
  };
  //check if the product is deleted
  const isPaymentDisabled = products.some((item) => item.isDeleted);

  return (
    <Center>
      <ColumnsWrapper>
        <Box className={` ${isMobile ? "mobile-hide" : ""}`}>
          <h2>Cart</h2>
          {error ? ( // Display error message if an error occurs
            <ErrorMessageBox>Error: {error.message}</ErrorMessageBox>
          ) : products.length > 0 ? (
            <>
              <Table>
                <thead>
                  {/* <th>Image</th> */}
                  <tr>
                    <th>Product</th>
                    <th className="quantity_box">Quantity</th>
                    <th>Remove</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <ProductImageBox>
                          <img src={item.images[0]} />
                        </ProductImageBox>
                        {item.title}
                      </td>
                      <td className="quantity_box">
                        <div>
                          <PrimaryBtn
                            title="-"
                            onClick={() => lessOfTheProduct(item._id)}
                          />
                          <Quantity>
                            {
                              CartProducts.filter((id) => id === item._id)
                                .length
                            }
                          </Quantity>
                          <PrimaryBtn
                            title="+"
                            onClick={() => moreOfTheProduct(item._id)}
                          />
                        </div>
                      </td>
                      <td className="remove_item">
                        {item.isDeleted && (
                          <span className="cartWarning">
                            Product is not avilable.
                            <br />
                          </span>
                        )}
                        <RemoveButton onClick={() => removeAllItems(item._id)}>
                          Remove
                        </RemoveButton>
                      </td>
                      <td>
                        ₹
                        {CartProducts.filter((id) => id === item._id).length *
                          item.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>₹{total}</td>
                  </tr>
                </tbody>
              </Table>
              <div className="mobile-show">
                <PrimaryBtn
                  black={1}
                  block={1}
                  title="Place the order"
                  disabled={isPaymentDisabled}
                  onClick={() => {
                    setIsMobile(true);
                  }}
                />
              </div>
            </>
          ) : loading ? ( // Display the loading component
            <LoadingBox>
              <LoadingMessage>Loading...</LoadingMessage>
              <LoadingSpinner />
            </LoadingBox>
          ) : (
            <div>Cart is empty</div>
          )}
        </Box>
        {products.length > 0 && (
          <Box className={` ${isMobile ? "" : "mobile-hide"}`}>
            <form>
              <h2>Order information</h2>
              <Input
                type="text"
                required
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <CityHolder>
                <Input
                  type="text"
                  required
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Input
                  type="zip"
                  required
                  placeholder="Alternate Phone"
                  value={APhone}
                  onChange={(e) => setAPhone(e.target.value)}
                />
              </CityHolder>
              <CityHolder>
                <Input
                  type="text"
                  required
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <Input
                  type="zip"
                  required
                  placeholder="Postal Code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </CityHolder>
              <Input
                type="text"
                required
                placeholder="Street Address"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
              <Input
                type="text"
                required
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <PaymentBlock>
                <div className="mobile-show w-full">
                  <PrimaryBtn
                    type="button"
                    black={1}
                    block={1}
                    title="Go to Cart"
                    disabled={isPaymentDisabled}
                    onClick={() => {
                      setIsMobile(false);
                    }}
                  />
                </div>
                {/* <PrimaryBtn 
                  black={1}
                  block={1}
                  type="button"
                  title="Continue to payment"
                  disabled={isPaymentDisabled}
                  onClick={() => makeOrderCash({paid:true,paidStatus:false})}
                />  */}
                <PrimaryBtn
                  type="button"
                  black={1}
                  block={1}
                  title="Cash on delivery"
                  onClick={() => makeOrder({ paid: false, paidStatus: false })}
                  disabled={isPaymentDisabled}
                />

                {
                  <p className=" text-right w-full">
                    Amount:<span className="text-yellow-600">{total}</span>
                  </p>
                }
                {isPaymentDisabled && (
                  <p className="cartWarning">Action Needed</p>
                )}
              </PaymentBlock>
            </form>
          </Box>
        )}
      </ColumnsWrapper>
    </Center>
  );
};

export default Cart;
