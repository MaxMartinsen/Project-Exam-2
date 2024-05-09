export const validateName = (name) => {
  // Allows only letters, numbers, and underscores
  return /^[a-zA-Z0-9_]+$/.test(name);
};

export const validateEmail = (email) => {
  // Validates that the email ends with @stud.noroff.no
  return /^[a-zA-Z0-9_.+-]+@stud\.noroff\.no$/.test(email);
};

export const validatePassword = (password) => {
  // Checks that the password is at least 8 characters
  return password.length >= 8;
};
