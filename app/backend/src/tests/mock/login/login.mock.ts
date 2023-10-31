// No email user
const validPassword = 'senha';
const noEmailLoginBody = { username: '', password: validPassword };

// ==== No passoword user
const validUsername = 'User';
const noPasswordLoginBody = { username: validUsername, password: '' };

// === No user
const notExistingUserBody = { username: 'Hack', password: validPassword };

// ExistUser 
const existingUserWithWrongPasswordBody = { username: validUsername, password: 'wrong_password' };
const hashedPassword = '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO';

const existingUser = { 
  id: 2, 
  username: validUsername,
  password: hashedPassword,
  role: 'user',
  email: 'user@user.com',
};

// ====== Valida User
const validLoginBody = { username: validUsername, password: validPassword };



export default {
  noEmailLoginBody,
  noPasswordLoginBody,
  notExistingUserBody,
  existingUserWithWrongPasswordBody,
  existingUser,
  validLoginBody
};