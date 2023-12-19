String.prototype.isValidEmail = function () {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(this);
};

export const validateForm = (user, setErrors) => {
  const errors = {};
  if (!user.name.trim()) {
    errors.name = "Name is required!";
  }
  if (!user.email.trim()) {
    errors.email = "Email is required!";
  } else if (!user.email.isValidEmail()) {
    errors.email = "Invalid email address";
  }
  if (!user.username.trim()) {
    errors.username = "Username is required!";
  }
  if (!user.gender.trim()) {

    errors.gender = "Gender is required!";
  }
  if (!user.password.trim()) {
    errors.password = "Password is required!";
  }else if(user.password.length<8){
    errors.password = "Fill at least 8 characters!";
  }
  if (!user.confirmpassword.trim()) {
    errors.confirmpassword = "Confirm Password is required!";
  }else if(user.confirmpassword.length<8){
    errors.password = "Fill at least 8 characters!";
  }
  if (user.password.trim() && user.confirmpassword.trim()) {
    if (user.password != user.confirmpassword) {
      errors.confirmpassword = "Password doesn't match!";
    }
  }
  setErrors(errors);
  if (Object.keys(errors).length === 0) {
    return true;
  }
};
