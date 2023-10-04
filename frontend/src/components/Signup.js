import React, { useContext, useState } from "react";
import { Center } from "./CSSEXPORT";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { CartContext } from "../CartContext";

const Signup = ({ setToggleLog }) => {
  const { CartProducts, setCartProducts,setLogged,setToken } = useContext(CartContext);
  const [containerOpen, setContainerOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [EnterOtp, setEnterOtp] = useState(false);
  const [serverOtp, setServerOtp] = useState("");
  const [EnteredOtp, setEnteredOtp] = useState(["", "", "", "", "", ""]);
  const [logLoading, setLogLoading] = useState(false);
  const navigate= useNavigate();

  const handelContainerOpen = () => {
    setContainerOpen(!containerOpen);
    setToggleLog(!containerOpen);
  };

  function handleInput(e, index) {
    const { value } = e.target;
    const updatedEnteredOtp = [...EnteredOtp];
    updatedEnteredOtp[index] = value;
    setEnteredOtp(updatedEnteredOtp);
    // Automatically focus on the next input field if a digit is entered
    if (value !== "" && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  }

  function handleInputForm(e) {
    setFormData((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  }

  async function handelSignup(e) {
    e.preventDefault();
    const enteredOtp = EnteredOtp.join(""); // Combine all the OTP digits
    if (serverOtp == enteredOtp) {
      // Signup
      setLogLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:5000/signup/new/user",
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
    } else {
      toast.error("Wrong OTP.");
    }
  }

  async function handleLog(e) {
    e.preventDefault();
    if (!EnterOtp && containerOpen) {
      setLogLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:5000/verify/user/email",
          formData
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          setServerOtp(response.data.otp);
          setEnterOtp(true);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLogLoading(false);
      }
    } else if (!EnterOtp) {
      setLogLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/do/login",
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
            <h1 className="title-font font-medium text-3xl text-gray-900">{containerOpen ? "Happy To Connect" : "Welcome Back"}</h1>
            <p className="leading-relaxed mt-4">{containerOpen ? "Poke slow-carb mixtape knausgaard, typewriter street art gentrify hammock starladder roathse. Craies vegan tousled etsy austin." : "Sign in"}</p>
          </div>
          {!EnterOtp ? (
            <form className="lg:w-3/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0" onSubmit={handleLog}>
              <h2 className="text-gray-900 text-lg font-medium title-font mb-5">{containerOpen ? "Sign Up" : "Sign In"}</h2>
              {containerOpen && (<div className="relative mb-4">
                <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Full Name</label>
                <input type="text" id="full-name" name="name" value={formData.name} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={handleInputForm} required/>
              </div> )}
              <div className="relative mb-4">
                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                <input type="email" id="email" name="email" value={formData.email} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={handleInputForm} required />
              </div>
                <div className="relative mb-4">
                  <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                  <input type="password" id="password" name="password" value={formData.password} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={handleInputForm} required/>
                </div>
              <button type="submit" className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" disabled={logLoading}>{!logLoading?"Submit":"Loading.."}</button>
              {!containerOpen ? <Link onClick={() => handelContainerOpen()}>Sign up</Link> : <Link onClick={() => handelContainerOpen()}>Sign In</Link>}
            </form>
          ) : (
            <form className="lg:w-3/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0" onSubmit={handelSignup}>
              <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Verify OTP</h2>
              <div className="relative mb-4">
                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                <input type="email" id="email" name="email" value={formData.email} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" disabled />
              </div>
              <div className="relative mb-4">
                <label htmlFor="otp" className="leading-7 text-sm text-gray-600">OTP</label>
                <div className="flex">
                  {EnteredOtp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      id={`otp-${index}`}
                      className="w-1/6 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mx-1"
                      value={digit}
                      maxLength="1"
                      onChange={(e) => handleInput(e, index)}
                    />
                  ))}
                </div>
              </div>
              <button type="submit" className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" disabled={logLoading}>{!logLoading?"Verify":"Loading.."}</button>
            </form>
          )}
        </div>
      </section>
    </Center>
  );
}

export default Signup;
