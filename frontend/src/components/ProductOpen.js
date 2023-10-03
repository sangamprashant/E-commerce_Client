import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductOpen = () => {
  const [product, setProduct] = useState({});
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // To track the selected image index

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    handleFetch();
  }, [id]);

  async function handleFetch() {
    const response = await axios.get(`http://localhost:5000/api/products/${id}`);
    setProduct(response.data);
  }

  // Function to handle image selection
  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className='w-full m-0 lg:w-1/2 lg:h-auto'>
              <img
                alt="Product"
                className="w-full h-90 object-cover object-center rounded"
                src={product.images && product.images[selectedImageIndex]}
              />
              <div className="mt-4 flex">
                {product.images &&
                  product.images.map((image, index) => (
                    <img
                      key={index}
                      alt="Product Thumbnail"
                      className={`cursor-pointer w-20 h-20 object-cover object-center rounded ${
                        index === selectedImageIndex ? 'border-2 border-indigo-500' : ''
                      }`}
                      src={image}
                      onClick={() => handleImageClick(index)}
                    />
                  ))}
              </div>
            </div>

            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">{product?.category?.name}</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{product.title}</h1>
              <p className="leading-relaxed mb-4">{product.description}</p>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Color</span>
                <span className="ml-auto text-gray-900">Blue</span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Size</span>
                <span className="ml-auto text-gray-900">Medium</span>
              </div>
              <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                <span className="text-gray-500">Quantity</span>
                <span className="ml-auto text-gray-900">4</span>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">$58.00</span>
                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Button
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductOpen;
