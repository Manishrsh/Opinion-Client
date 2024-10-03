import React from "react";
import { useForm } from "react-hook-form";
import "../styles/questions.style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()
  const onSubmit = async(data) =>{
    try {
      console.log(data);
      const userinfo = await axios.post('http://localhost:3000/user/login', data);
      if (userinfo.data.token) {
        localStorage.setItem('token', userinfo.data.token);
      }
      navigate('/')
    } catch (error) {
      console.error("Error occurred:", error);
      alert("Write Valid Input");
     

    }
  };

  return (
    <div id="mainWapper">
      <form onSubmit={handleSubmit(onSubmit)} className="FormWapper">
        <label><b>username</b></label>
        <input
          {...register("username", { required: true, maxLength: 20 })}
          placeholder="Add New Question"
          id="Que"
        />
        <label><b>password</b></label>
        <input
          {...register("password", { required: true, maxLength: 20 })}
          placeholder="Add New Question"
          id="Que"
        />
        <input type="submit" id="formSubmit" />
      </form>
    </div>
  );
};

export default Login;
