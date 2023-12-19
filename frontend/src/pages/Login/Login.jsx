import Loader from "../../components/Loader/Loader";
import axiosInstance from "../../axiosInstance";
import { setAuthToken } from "../../hooks/setToken";
import {Link, useNavigate} from "react-router-dom";
import { validateLogin } from "./loginValidation";
import Container from "../../components/Container/Container";
import P from "../../components/Paragraph/P";
import Label from "../../components/Label/Label";
import TextBox from "../../components/TextBox/TextBox";
import "./login.css";
import { useState } from "react";
import Button from "../../components/Button/Button";
import Error from "../../components/Error/Error";
import { useProfile } from "../../hooks/UserContext";
const Login = () => {
  const navigate = useNavigate();
  const {setCurrentUser} = useProfile();
  const [loading,setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});


  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateLogin(credentials, setErrors)) {
      const postFormData = async () => {
        setLoading(true);
        try {
          const response = await axiosInstance.post("/login", credentials);
          setLoading(false);
          const token = JSON.stringify(response.data.token);
          const userInfo = JSON.stringify(response.data.userInfo);
          localStorage.setItem("_auth",token);
          localStorage.setItem("_user",userInfo);
          setAuthToken(JSON.parse(localStorage.getItem("_auth"))||null)
          setCurrentUser(JSON.parse(localStorage.getItem("_user"))||null)
          navigate("/",{replace:true})
        } catch (error) {
          setLoading(false);
            if(error.response?.data.username){
          
              setErrors({username:error.response.data.error})
            }
            if(error.response?.data.password){
              setErrors({password:error.response.data.error})
            }
            
        }
      };
      postFormData();
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <Container className="min-vw-50 min-vh-50 self-center  rounded white shadow column v-center r-gap-20">
        <P varient="info" fontSize="28px">
          Login
        </P>
        <form className="form" onSubmit={handleSubmit}>
        {loading&&<Loader></Loader>}
          <div className="form-controls">
            <Label varient="warning" className="asterisk">
              Username
            </Label>
            <TextBox
              placeholder="Enter Username or Email"
              name="username"
              value={credentials.username}
              onChange={handleChange}
            ></TextBox>
          </div>
          {errors.username && <Error className="err">{errors.username}</Error>}
          <div className="form-controls">
            <Label varient="warning" className="asterisk">
              Password
            </Label>
            <TextBox
              type="password"
              placeholder="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            ></TextBox>
          </div>
          {errors.password && <Error className="err">{errors.password}</Error>}
          <P varient="secondary">Not a member?<Link className="link" to="/register">Click here.</Link> </P>
          <div className="form-controls">
            <Button className="reg-btn">Login</Button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default Login;
