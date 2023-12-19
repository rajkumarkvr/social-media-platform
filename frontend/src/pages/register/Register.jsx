import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import "./register.css";
import { validateForm } from "./formValidation";
import Container from "../../components/Container/Container";
import P from "../../components/Paragraph/P";
import Label from "../../components/Label/Label";
import TextBox from "../../components/TextBox/TextBox";
import SelectBox from "../../components/SelectBox/SelectBox";
import Button from "../../components/Button/Button";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";

const Register = () => {
  const [errors, setErrors] = useState({});
  const [loading,setLoading] = useState(false);
  const usernameRef = useRef();
  const emailRef = useRef();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    gender: "",
    password: "",
    confirmpassword: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };
  const handleGender = (e) => {
    const value = e.target.value;
    const name = e.target.parentElement.name;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
   
  };
  const handleRegister = (e) => {
    e.preventDefault();
    if (validateForm(user, setErrors)) {
      const postFormData = async () => {
        setLoading(true);
        try {
          const response = await axiosInstance.post("/register", user);
          setLoading(false);
          navigate("/login");
        } catch (error) {
          setLoading(false);
          setUser((prevUser)=>({
            ...prevUser,
            password: "",
            confirmpassword: "",
          }));
          if (error.response?.data.error.keyValue.email) {
            emailRef.current.focus();
            setErrors({ email: "This email is already exists!" });
          }
          if (error.response?.data.error.keyValue.username) {
            usernameRef.current.focus();
            setErrors({ username: "This username was already taken!" });
          }
        }
      };
      postFormData();
    }
  };
  return (
    <>
    
      <Container
        varient="white"
        className="r-gap-20 self-center min-vw-50 vh-100 rounded shadow v-center column"
      >
        <P varient="info" fontSize="23px" className="reg-head">
          Sign up now and be part of our social circle.

        </P>
        
        <form onSubmit={handleRegister} className="form">
        {loading&&<Loader align="center"></Loader>}
          <div className="form-controls">
            <Label className="asterisk warning">
              Name
            </Label>
            <TextBox
              border={errors.name && "danger"}
              name="name"
              value={user.name}
              onChange={handleInput}
            ></TextBox>
          </div>
          {errors.name && <Error className="err">{errors.name}</Error>}
          <div className="form-controls">
            <Label className="asterisk warning">
              Email
            </Label>
            <TextBox
              refs={emailRef}
              border={errors.email && "danger"}
              type="email"
              name="email"
              value={user.email}
              onChange={handleInput}
            ></TextBox>
          </div>
          {errors.email && <Error className="err">{errors.email}</Error>}
          <div className="form-controls">
            <Label className="asterisk warning">
              Username
            </Label>
            <TextBox
              refs={usernameRef}
              border={errors.username && "danger"}
              name="username"
              value={user.username}
              onChange={handleInput}
            ></TextBox>
          </div>
          {errors.username && <Error className="err">{errors.username}</Error>}
          <div className="form-controls">
            <Label className="asterisk warning">
              Gender
            </Label>
            <SelectBox
              border={errors.gender && "danger"}
              name="gender"
              initial="Select Gender"
              options={["Male", "Female"]}
              onChange={handleGender}
            ></SelectBox>
          </div>
          {errors.gender && <Error className="err">{errors.gender}</Error>}
          <div className="form-controls">
            <Label className="asterisk warning">
              Password
            </Label>
            <TextBox
              border={errors.password && "danger"}
              name="password"
              value={user.password}
              onChange={handleInput}
              type="password"
            ></TextBox>
          </div>
          {errors.password && <Error className="err">{errors.password}</Error>}
          <div className="form-controls">
            <Label className="asterisk warning">
              Confirm Password
            </Label>
            <TextBox
              border={errors.confirmpassword && "danger"}
              name="confirmpassword"
              value={user.confirmpassword}
              onChange={handleInput}
              type="password"
            ></TextBox>
          </div>
          {errors.confirmpassword && (
            <Error className="err">{errors.confirmpassword}</Error>
          )}
           <P varient="secondary">Already a member?<Link className="link" to="/login">Click here.</Link> </P>
          <div className="form-controls">
            <Button hidden={loading?true:false} className="reg-btn ">Register</Button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default Register;
