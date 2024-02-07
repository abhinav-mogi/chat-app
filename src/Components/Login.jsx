import React from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function Login() {
  const handleUserLogin=(user)=>{
      console.log(user);
      
      axios.post('http://localhost:4000/user-api/login',user)
        .then(response=>{
            if(response.data.message==="success"){
                //store jwt token in local or session storage
                console.log(response.data.username.username)
                localStorage.setItem("token",response.data.token)
                localStorage.setItem("user",response.data.username.username)
                navigate('/users')
                
            }else{
                console.log(response.data.message)
            }
        })
        .catch(err=>{
          console.log(err.message)
        })
    }
  const navigate = useNavigate();
  let {
       register,
       handleSubmit,
       formState: { errors },
  } = useForm();
  return (
    <div className="add-user mt-5">
     
      <div className="row">
        <h1>Login</h1>
        <div className="col-11 col-sm-8 col-md-6 mx-auto">
          <form onSubmit={handleSubmit(handleUserLogin)}>
            {/* username */}
            <div className="mb-3">
              <label htmlFor="name">Username</label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="username"
                {...register("username", { required: true })}
              />
              {/* validation errors for name */}
              {errors.username?.type === "required" && (
                <p className="text-danger fw-bold fs-5">
                  * Username is required
                </p>
              )}
            </div>
            {/* password */}
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
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login