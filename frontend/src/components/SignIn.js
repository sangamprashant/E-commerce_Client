import React, { useContext, useState } from "react";
import { Center } from "./CSSEXPORT";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { CartContext } from "../CartContext";

const SignIn = () => {
  const { CartProducts, setCartProducts,setLogged,setToken } = useContext(CartContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [logLoading, setLogLoading] = useState(false);
  const navigate= useNavigate();


  function handleInputForm(e) {
    setFormData((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  }



  async function handleLog(e) {
    e.preventDefault();

      setLogLoading(true);
      try {
        const response = await axios.post(
          "/api/user/do/login",
          formData
        );
        if (response.status === 200) {
          handelData(response.data)
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLogLoading(false);
      }

  }

  const handelData = (data) => {
    toast.success(data.message);
    sessionStorage.setItem("user",JSON.stringify(data.user))
    sessionStorage.setItem("token",data.token)
    setToken(data.token)
    navigate("/")
    setLogged(true)
  }

  return (
    <Center>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-3/6 md:w-1/2 md:pr-16 lg:pr-5 pr-5">
            <h1 className="title-font font-medium text-3xl text-gray-900"> Welcome Back</h1>
            <p className="leading-relaxed mt-4">Happy to see you back! Sign in to continue shopping.</p>
          </div>
            <form className="lg:w-3/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0" onSubmit={handleLog}>
              <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign In</h2>
              <div className="relative mb-4">
                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                <input type="email" id="email" name="email" value={formData.email} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={handleInputForm} required />
              </div>
                <div className="relative mb-4">
                  <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                  <input type="password" id="password" name="password" value={formData.password} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={handleInputForm} required/>
                </div>
              <button type="submit" className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" disabled={logLoading}>{!logLoading?"Submit":"Loading.."}</button>
               <Link to="/signup">Sign up</Link>
            </form>
        </div>
      </section>
    </Center>
  );
}

export default SignIn;
