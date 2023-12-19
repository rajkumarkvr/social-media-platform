import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const RequiredAuth = ({ children }) => {
    const navigate =useNavigate();
    useEffect(()=>{
        if (localStorage.getItem("_auth") && localStorage.getItem("_user")) 
        {
           if(children.type.name=="Login" || children.type.name=="Register"){
            navigate("/",{replace:true})
           }
        }
        else{
            if(children.type.name=="Register"){
                navigate("/register");
            }
            else{
                navigate("/login");
            }
        }
    },[]);
    return children
    
  }

export default RequiredAuth;
