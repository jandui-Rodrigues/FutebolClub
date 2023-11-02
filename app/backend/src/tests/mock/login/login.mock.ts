import * as bcrypt from 'bcryptjs';
const validPassword = 'senha123';
const validEmail = 'user@user.com';

// No email user || Password user
const noEmailLoginBody = { email: '', password: validPassword };
const noPasswordLoginBody = { email: validEmail, password: '' };

// === No exist user
const notExistingUserBody = { email: 'Hack@hack.com', password: validPassword };

// ExistUser with wrong password
const existingUserWithWrongPasswordBody = { email: validEmail, password: 'wrong_password' };
// ====== User exist password valid
const hashedPassword = bcrypt.hashSync(validPassword, 8) ;

const existingUser = { 
  id: 2, 
  email: validEmail,
  password: hashedPassword,
  role: 'user',
  username: 'User'
};

// ====== Valida User
const validLoginBody = { email: validEmail, password: validPassword };

const tokenValid = {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImlhdCI6MTY5ODk1NTg1MH0.-Lq8xAQpdYgmgFWpFvxtWzP__RrbgH3BSwXOm1ibYkk"
}

export default {
  noEmailLoginBody,
  noPasswordLoginBody,
  notExistingUserBody,
  existingUserWithWrongPasswordBody,
  existingUser,
  validLoginBody,
  tokenValid
};