import * as sinon from 'sinon';
import * as chai from 'chai';
import SequelizeUser from '../database/models/SequelizeUser'
import jwt from '../utils/jwt';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app'

import loginMock from './mock/login/login.mock';
import { log } from 'console';

chai.use(chaiHttp);

const { expect } = chai;


describe('/login', function () { 
  beforeEach(function () { sinon.restore(); });
  const messageEmailOrPasswordEmpty = 'Invalid email or password';
  const messageEmailOrPasswordInvalid = 'All fields must be filled' ;
  it('ao não receber um e-mail, retorne um erro', async function () {
      // Arrange
      const httpRequestBody = loginMock.noEmailLoginBody

      // Act
      const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

      // Assert
      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.be.deep.equal({ message: messageEmailOrPasswordInvalid });
  });
  it('Ao receber um e-mail num formato invalido, retorne um erro', async function () {
      // Arrange
      const httpRequestBody = '@email.com'

      // Act
      const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

      // Assert
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.be.deep.equal({ message: messageEmailOrPasswordEmpty });
  });
  it('ao não receber uma senha, retorne um erro', async function () {
    // Arrange
    const httpRequestBody = loginMock.noPasswordLoginBody

    // Act
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    // Assert
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: messageEmailOrPasswordInvalid });
  });
  it('ao receber um e-mail inexistente, retorne um erro', async function () {
    // Arrange
    const httpRequestBody = loginMock.notExistingUserBody
    sinon.stub(SequelizeUser, 'findOne').resolves(null);  

    // Act
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    // Assert
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ message: messageEmailOrPasswordEmpty });
  });
  it('ao receber um e-mail existente e uma senha errada, retorne um erro', async function () {
    // Arrange
    const httpRequestBody = loginMock.existingUserWithWrongPasswordBody 

    const mockFindOneReturn = SequelizeUser.build(loginMock.existingUser);
    sinon.stub(SequelizeUser, 'findOne').resolves(mockFindOneReturn);

    // Act
    const httpResponse = await chai.request(app).post('/login')
      .send(httpRequestBody);

    // Assert
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ message: messageEmailOrPasswordEmpty });
  });
  it('ao receber um e-mail e uma senha válida, retorne um token de login', async function () {
    // Arrange
    const httpRequestBody = loginMock.validLoginBody

    const mockFindOneReturn = SequelizeUser.build(loginMock.existingUser);
    sinon.stub(SequelizeUser, 'findOne').resolves(mockFindOneReturn);

    // Act
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    // Assert
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.have.key('token');
  });
});
describe('/login/role', function () { 
  beforeEach(function () { sinon.restore(); });
  it('ao nao receber um token retorna um error', async function () {
    // Act
    const httpResponse = await chai.request(app).get('/login/role')

    // Assert
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Token not found' });
  });
  it('ao receber um token invalido retorna um error', async function () {
    // Arrange
    const httpRequestBody = { token: 'invalid_token' }

    // Act
    const httpResponse = await chai.request(app).get('/login/role').set('Authorization', httpRequestBody.token);

    // Assert
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Token must be a valid token' });
    
  });
  it('Ao receber um token valido retorna um role', async function () {
    // Arrange
    const httpRequestBody = { token: loginMock.tokenValid.token }
    const mockFindOneReturn = SequelizeUser.build(loginMock.existingUser);
    sinon.stub(jwt,'verify').returns({ id: 2, username: 'User' });
    sinon.stub(SequelizeUser, 'findOne').resolves(mockFindOneReturn);

    // Act
    const httpResponse = await chai.request(app).get('/login/role').set('Authorization', httpRequestBody.token);

    // Assert
    expect(httpResponse.body).to.be.deep.equal({ role: 'user' });
    expect(httpResponse.status).to.equal(200);
    
  });
});