export const isFormValid = (email, password) => {
  return email === ''
    ? prepareResponse(false, 'email', 'email is Empty')
    : !email.includes('@') || !email.includes('.')
    ? prepareResponse(false, 'email', 'email is not valid')
    : password === ''
    ? prepareResponse(false, 'password', 'Enter Password')
    : prepareResponse(true, '', '');
};

const prepareResponse = (status, category, msg) => {
  return {
    status: status,
    errMsg: msg,
    errCategory: category,
  };
};
