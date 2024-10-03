import React from "react";
import { useForm } from "react-hook-form";
import "../styles/questions.style.css";
import axios from "axios";

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async(data) =>{
    try {
      console.log(data)
        await axios.post('http://localhost:3000/user/signup',data)
    } catch (error) {
      console.log(error);
    }
  }

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

export default Signup;
