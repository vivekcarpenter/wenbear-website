import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";
import {useLoginMutation} from "../../store/services/authApi"; 
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    email: "", 
    password: "",
  });


  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [login, { isLoading, error, isSuccess }] = useLoginMutation();

 const submitHandler = async (e) => {
  e.preventDefault();
  try {

    if(!formData.email || !formData.password){
      alert("Please fill all the fields");
      return;
    }

    const {data} = await login(formData).unwrap();

    alert("login successfully",data);
   
    console.log("Login successful:", data);
    localStorage.setItem("role", data.role);
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("userId", data.id);
   navigate("/admin/blogs");
  } catch (error) {
    console.error("Login failed:", error);
   
  }
};



  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role === "admin") {
      navigate("/admin/blogs");
    }
  }, []);

  return (
    <div className="login-container shadow-sm">
      <div className="tab-section">
        <a href="/" className="text-decoration-none">
          <div className="tab-item active">Login</div>
        </a>
      </div>

      <form onSubmit={submitHandler}>
        <div className="form-field">
          <label htmlFor="username">Email</label>
          <div className="input-icon">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              name="email"
              value={formData.email}
              className="custom-input"
              placeholder="Enter your email"
              required
              onChange={changeHandler}
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <div className="input-icon">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="password"
              value={formData.password}
              className="custom-input"
              placeholder="Enter your password"
              required
              onChange={changeHandler}
            />
          </div>
        </div>

        <div className="remember-forgot">
          <div className="custom-checkbox">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember"> Remember me</label>
          </div>
          <a href="#" className="forgot-link">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="custom-btn login-btn text-decoration-none"
        >
         {isLoading ? "Loading..." : "Login"}
        </button>

        <div className="divider"></div>

        {/* <div className="social-logins">
          <button type="button" className="social-btn">
            <i className="fab fa-google"></i> Google
          </button>
          <button type="button" className="social-btn">
            <i className="fab fa-facebook-f"></i> Facebook
          </button>
        </div> */}
      </form>
    </div>
  );
};

export default Login;
