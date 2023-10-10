import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../CartContext';
import Cart from './Icons/Cart';
import { toast } from 'react-toastify';

const ProductOpen = () => {
  const [product, setProduct] = useState({});
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { CartProducts, setCartProducts, setLogged, logged , token} = useContext(CartContext);

  const { id } = useParams();

  useEffect(() => {
    handleFetch();
  }, [id]);

  useEffect(() => {
    // Check if the product is in the cart
    if (CartProducts.includes(product._id)) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  }, [CartProducts, product]);

  async function handleFetch() {
    try {
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }

  // Function to handle image selection
  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  async function addFeatureProductToCart() {
    // setCartProducts((prev) => [...prev, product._id]);

    try {
      const response = await axios.post(
        "/api/add/to/cart",
        { productId: product._id }, // Send the product ID in the request body
        {
          headers: {
            Authorization: "Bearer " + token, // Set the Authorization header
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        setCartProducts((prev) => [...prev, product._id]);
      }
    } catch (error) {
      // Handle errors here
      toast.error(error.response.data.message);
      console.error("Error:", error);
    }
  }

  const [isInCart, setIsInCart] = useState(false);

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="w-full lg:w-1/2 lg:h-auto">
            <img
              alt="Product"
              className="w-full h-90 object-contain object-center rounded Product_image"
              src={product.images && product.images[selectedImageIndex]}
            />
            <div className="mt-4">
              <div className="flex overflow-x-auto">
                {product.images &&
                  product.images.map((image, index) => (
                    <img
                      key={index}
                      alt="Product Thumbnail"
                      className={`cursor-pointer w-20 h-20 object-cover object-center rounded mx-1 ${
                        index === selectedImageIndex ? 'border-2 border-indigo-500' : ''
                      }`}
                      src={image}
                      onClick={() => handleImageClick(index)}
                    />
                  ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 lg:pl-10 lg:py-6 mb-6 lg:mb-0 flex flex-col">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">{product?.category?.name}</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{product.title}</h1>
            <p className="leading-relaxed mb-4">{product.description}</p>
            {product &&
              product?.properties &&
              Object.entries(product?.properties).map(([propertyName, propertyValue]) => (
                <div key={propertyName} className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-500">{propertyName}</span>
                  <span className="ml-auto text-gray-900">{propertyValue}</span>
                </div>
              ))}
            <div className="flex mt-auto">
              <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>
              {logged && !isInCart && (
                <button
                  className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  onClick={addFeatureProductToCart}
                >
                  <Cart /> Add to cart
                </button>
              )}
              {isInCart && (
                <Link
                  to="/cart" // You can set the link to the cart page
                  className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Go to Cart
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductOpen;
