import React from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Register() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();


  let submitForm=async(e)=>{
    console.log(e)
    axios
      .post("http://localhost:4000/user-api/register", e)
      .then((response) => {
        if (response.status === 201) {
          navigate('/login')
        }
        if(response.status!==201){
          console.log(response.data.message)
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  return (
    <div className="add-user">
      <p className="display-3 text-center fw-bold">Register</p>
      <div className="row">
        <div className="col-11 col-sm-8 col-md-6 mx-auto">
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="mb-3">
              <label htmlFor="name">Username</label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="username"
                {...register("username", { required: true })}
              />
              {errors.username?.type === "required" && (
                <p className="text-danger fw-bold fs-5">
                  * Username is required
                </p>
              )}
            </div>
            
            <div className="mb-3">
              <label htmlFor="name">Email</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                id="email"
                className="form-control"
                {...register("email", { required: true })}
              />
              {/* validation errors for email */}
              {errors.email?.type === "required" && (
                <p className="text-danger fw-bold fs-5">* Email is required</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="name">Password</label>
              <input
                type="password"
                placeholder="*********"
                id="password"
                className="form-control"
                {...register("password", { required: true })}
              />
              {/* validation errors for name */}
              {errors.password?.type === "required" && (
                <p className="text-danger fw-bold fs-5">
                  * Password is required
                </p>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;