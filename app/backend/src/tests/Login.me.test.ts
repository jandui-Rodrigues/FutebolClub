import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app'

import loginMock from './mock/login/login.mock';

chai.use(chaiHttp);

const { expect } = chai;


describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });
  const messageEmailOrPasswordEmpty = '\"username\" and \"password\" are required';
  const messageEmailOrPasswordInvalid = 'Username or password invalid';
  it('ao não receber um e-mail, retorne um erro', async function () {
      // Arrange
      const httpRequestBody = loginMock.noEmailLoginBody

      // Act
      const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

      // Assert
      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.be.deep.equal({ message: messageEmailOrPasswordEmpty });
  });
  it('ao não receber uma senha, retorne um erro', async function () {
    // Arrange
    const httpRequestBody = loginMock.noPasswordLoginBody

    // Act
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    // Assert
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: messageEmailOrPasswordEmpty });
  });
  it('ao receber um e-mail inexistente, retorne um erro', async function () {
    // Arrange
    const httpRequestBody = loginMock.notExistingUserBody
    sinon.stub(SequelizeUser, 'findOne').resolves(null);  

    // Act
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    // Assert
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ message: messageEmailOrPasswordInvalid });
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
    expect(httpResponse.body).to.be.deep.equal({ message: messageEmailOrPasswordInvalid });
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