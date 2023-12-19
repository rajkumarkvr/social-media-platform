String.prototype.isValidEmail = function () {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this);
  };

export const validateLogin=(credentials,setErrors)=>{
    const errors = {}
    if(!credentials.username.trim()){
        errors.username="Username or Email is required!";
    }
    if(!credentials.password.trim()){
        errors.password="Password is required!";
    }else if(credentials.password.length<8){
        errors.password = "Password minimum 8 characters!";
    }
    setErrors(errors);
    if(Object.keys(errors).length===0){
        return true
    }
}