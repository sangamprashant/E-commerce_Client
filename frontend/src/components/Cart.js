import React, { useContext, useEffect, useState } from "react";
import { Center, ProductImageBox, Table } from "./CSSEXPORT";
import styled from "styled-components";
import PrimaryBtn from "./comp/PrimaryBtn";
import { CartContext } from "../CartContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Input from "./comp/Input";

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

const Cart = () => {
  const { CartProducts, setCartProducts, token } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  // order information
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [street, setStreet] = useState("");
  const [country, setCountry] = useState("");
  const [phone,setPhone] = useState("")
  const [APhone,setAPhone] = useState("")

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
    } else {
      setProducts([]);
    }
  };

  async function lessOfTheProduct(id) {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/remove/from/cart",
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
        "http://localhost:5000/api/add/to/cart",
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

  const makeOrder = async (e) => {
    e.preventDefault();
    if (name && email && city && postalCode && street && country && phone) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/make/order",
          {
            name,email,city,postalCode,street,country,CartProducts,phone,APhone
          },
          {
            headers: {
              Authorization: "Bearer " + token, // Set the Authorization header
            },
          }
        );
        if(response.status===200){
          toast.success(response.data.message)
          console.log(response.data.order)

        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }else{
      toast.error("Please fill all the fields.")
    }
  };

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
                  <th>Remove</th>
                  <th>Price</th>
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
                        <PrimaryBtn
                          title="-"
                          onClick={() => lessOfTheProduct(item._id)}
                        />
                        <Quantity>
                          {CartProducts.filter((id) => id === item._id).length}
                        </Quantity>
                        <PrimaryBtn
                          title="+"
                          onClick={() => moreOfTheProduct(item._id)}
                        />
                      </td>
                      <td className="remove_item">
                        <RemoveButton>Remove</RemoveButton>
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
            </>
          ) : (
            <div>cart is empty</div>
          )}
        </Box>
        {products.length > 0 && (
          <Box>
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
              <PrimaryBtn
                black
                block
                title="Continue to payment"
                onClick={makeOrder}
              />
            </form>
          </Box>
        )}
      </ColumnsWrapper>
    </Center>
  );
};

export default Cart;
