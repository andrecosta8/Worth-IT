const digitsRegExp = /(?=.*?[0-9])/;
const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const lowercaseRegExp = /(?=.*?[a-z])/;
const minLengthRegExp = /.{6,}/;
const uppercaseRegExp = /(?=.*?[A-Z])/;


export const validateForm = (user) => {
  console.log(user)
  let validationError;
  if (
    user.password.length === 0 ||
    user.name.length === 0 ||
    user.email.length === 0
  ) {
    validationError = "Every field must to be filled";
  } else if (!emailRegExp.test(user.email)) {
    validationError = "Please insert a valid email format (example@email.com)";
  } else if (!uppercaseRegExp.test(user.password)) {
    validationError = "At least one Uppercase";
  } else if (!lowercaseRegExp.test(user.password)) {
    validationError = "At least one Lowercase";
  } else if (!digitsRegExp.test(user.password)) {
    validationError = "At least one digit";
  } else if (!minLengthRegExp.test(user.password)) {
    validationError = "Password needs at least 6 characters";
  } else {
    validationError = null;
  }
  return validationError;
};
 