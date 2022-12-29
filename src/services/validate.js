const uppercaseRegExp = /(?=.*?[A-Z])/;
const lowercaseRegExp = /(?=.*?[a-z])/;
const digitsRegExp = /(?=.*?[0-9])/;
const minLengthRegExp = /.{6,}/;
const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const validateForm = (user) => {
  let errorResponse = "";
  if(user.password.length === 0 || user.name.length === 0 || user.email === 0){
    errorResponse = "Every field needs to be field";
} else if (!emailRegExp.test(user.email)){
    errorResponse = "Please insert a valid email format (example@email.com)"
  } else if (!uppercaseRegExp.test(user.password)){
    errorResponse = "At least one Uppercase";
  } else if(!lowercaseRegExp.test(user.password)){
    errorResponse = "At least one Lowercase";
  } else if(!digitsRegExp.test(user.password)){
    errorResponse = "At least one digit";
  } else if(!minLengthRegExp.test(user.password)){
    errorResponse = "Password needs at least 6 characters"
  } else {
    errorResponse = ""
  } 

  return errorResponse;
};
