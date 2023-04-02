import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg"
import {toast , ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
function Register() {

  const toastOptions ={
  position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }
const[Values,setValues]=useState({
    username:"",
    email:"",
    password:"",
    ConfirmPassword:"",
  });

const handleSubmit= async(event)=>{
  event.preventDefault();
  
  if(handleValidation()){
    console.log("invalidation",registerRoute);
    const {password,ConfirmPassword,username,email}=Values;
    const {data} =await axios.post(registerRoute,
      {
        username,
        email,
        password,

    });
  }
  
}

const handleChange=(event)=>{
 setValues({...Values,[event.target.name]:event.target.value});
};

const handleValidation=()=>{
const {password,ConfirmPassword,username,email}=Values;

if(password!==ConfirmPassword){
toast.error("Password and ConfirmPassword should be same.",toastOptions);
  return false;
}
else if(username.length===0){
  toast.error("Username is required ",toastOptions);
  return false;
}
else if(username.length<3){
  toast.error("Username should more than 3 ",toastOptions);
  return false;
}
else if(password.length<8){
  toast.error("Password should more or equal than 8",toastOptions);
  return false;
}
else if(email.length===0){
  toast.error("Email is Required",toastOptions);
  return false;
}
return true;
};


  return(
    <>
    <FormContainer>
      <form onSubmit={(event)=>handleSubmit(event)} >
        <div className="brand">
          <img src={Logo} alt="Logo" />
          <h1>Snappy</h1>
        </div>
      <input type="text"
     placeholder="Username"
      name="username" 
      onChange={(e)=>handleChange(e)} />

      <input type="email"
     placeholder="Email"
      name="email" 
      onChange={(e)=>handleChange(e)} />
      <input type="password"
     placeholder="password"
      name="password" 
      onChange={(e)=>handleChange(e)} />

     <input type="password"
     placeholder="Confirm password"
      name="ConfirmPassword" 
      onChange={(e)=>handleChange(e)} />
    <button type="submit">Create User</button>
    <span>Already have an account?
      <Link to="/login">Login</Link>
    </span>
    </form>
    </FormContainer>
    <ToastContainer/>
    </>
  );
}


const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;


export default Register;
