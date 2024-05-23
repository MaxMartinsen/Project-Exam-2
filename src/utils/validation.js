// Validates only letters, numbers, and underscores
export const validateNameCharacters = (name) => {
  return /^[a-zA-Z0-9_]+$/.test(name);
};

// Validates that the name is no longer than 20 characters
export const validateNameLength = (name) => {
  return name.length <= 20;
};

export const validateEmail = (email) => {
  // Validates that the email ends with @stud.noroff.no
  return /^[a-zA-Z0-9_.+-]+@stud\.noroff\.no$/.test(email);
};

export const validatePassword = (password) => {
  // Checks that the password is at least 8 characters
  return password.length >= 8;
};
