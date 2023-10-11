import React, { useState } from "react";
import { Center } from "../CSSEXPORT";
import logo from "../Images/logo.png";
import styled from "styled-components";

const P = styled.p`
  color:red;
  text-align:center;
  width:100%;
`;
const S = styled.p`
  color:green;
  text-align:center;
  width:100%;
`;

const GetStarted = () => {
  const [email, setEmail] = useState("");
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState("");

  const subscribeToNewsletter = async () => {
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubscriptionSuccess(true);
      } else {
        setSubscriptionError("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      setSubscriptionError("An error occurred. Please try again later.");
    }
  };
  return (
    <div>
      <section className="text-gray-600 px-24 body-font">
        <div className="mx-auto flex py-4 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-0 md:mb-0">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={logo}
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Discover Our Store
            </h1>
            <p className="mb-8 leading-relaxed">
              Explore our wide range of products and the latest fashion trends.
              We offer a unique shopping experience that you won't find anywhere
              else. Join us and be part of the fashion revolution.
            </p>
            <div className="flex w-full md:justify-start justify-center items-end">
              <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4">
                <label htmlFor="hero-field" className="leading-7 text-sm text-gray-600">
                  Subscribe to our newsletter
                </label>
                <input
              type="email"
              id="hero-field"
              name="hero-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="Your email"
            />
              </div>
              <button onClick={subscribeToNewsletter} className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Subscribe
              </button>
            </div>
            <p className="text-sm mt-2 text-gray-500 mb-8 w-full">
              Stay updated with our latest collections and promotions.
            </p>
            {subscriptionSuccess && <S>Thank you for subscribing!</S>}
        {subscriptionError && <P>{subscriptionError}</P>}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetStarted;
