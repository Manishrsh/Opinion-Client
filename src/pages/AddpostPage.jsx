import React from "react";
import { useForm } from "react-hook-form";
import "../styles/questions.style.css";
import axios from "axios";

const AddpostPage = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async(data) =>{
    console.log(data)
    const token = localStorage.getItem('token')
    const response = await axios.post('http://localhost:3000/addpost', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(response)
  }

  return (
    <div id="mainWapper">
      <form onSubmit={handleSubmit(onSubmit)} className="FormWapper">
        <label><b>Write a question</b></label>
        <input
          {...register("question", { required: true, maxLength: 20 })}
          placeholder="Add New Question"
          id="Que"
        />
        <ul>
         <b> How to get ans</b>
          <li>
            <label htmlFor="longAnswer">Long answer</label>
            <input
              {...register("answertype")}
              type="radio"
              value="long"
              id="longAnswer"
            />
          </li>
          <li>
            <label htmlFor="yesOrNo">Yes or No</label>
            <input
              {...register("answertype")}
              type="radio"
              value="yesno"
              id="yesOrNo"
            />
          </li>
        </ul>
        <input type="submit" id="formSubmit" />
      </form>
    </div>
  );
};

export default AddpostPage;
