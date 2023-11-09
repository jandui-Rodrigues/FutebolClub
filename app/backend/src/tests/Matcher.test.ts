import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app'
import SequelizeMatcher from '../database/models/SequelizeMatches';
import * as matcherMock from './mock/matcher/Matcher.mock';
import SequelizeTeam from '../database/models/SequelizeTeam';
import loginMock from './mock/login/login.mock';
import jwt from '../utils/jwt';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matcher Test', function() {
  beforeEach(function () { 
      sinon.restore(); 
      sinon.stub(jwt, 'verify').resolves({ id: 1, username: 'Admin' });
    });
   const httpRequestBody = { token: loginMock.tokenValid.token }
  describe('GET /matches', function() {
    it('should return all matchers', async function() {
    // Arrange
    sinon.stub(SequelizeMatcher, 'findAll').resolves(matcherMock.matches as any);
    // Act
    const { status, body } = await chai.request(app).get('/matches');
    // Assert
    expect(status).to.equal(200);
    expect(body).to.deep.equal(matcherMock.matches);
  });

  it('should return all matchers inprogress true', async function() {
    // Arrange
    const matches = matcherMock.matches.filter(match => match.inProgress === true);
    sinon.stub(SequelizeMatcher, 'findAll').resolves(matches as any);
    // Act
    const { status, body } = await chai.request(app).get('/matches?inProgress=true');
    // Assert
    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });
  });
  
  describe('PATH /matches/id/finish', function() {
  it('Return finished for matches update', async function() {
    sinon.stub(SequelizeMatcher, 'findOne').resolves(matcherMock.matches[0] as any);
    sinon.stub(SequelizeMatcher, 'update').resolves([1] as any);
    // sinon.stub(SequelizeMatcher, 'findByPk').resolves(matcherMock.matches[0] as any);
    // Act
    const { status, body } = await chai.request(app).patch('/matches/1/finish').set('Authorization', httpRequestBody.token);
    // Assert
    expect(body).to.deep.equal({ "message": "Finished" });
    expect(status).to.equal(200);
  });
  it('should return not found when the macther to update does not exists', async function () {
    sinon.stub(SequelizeMatcher, 'findOne').resolves(null);

    const { id, ...sendData } = matcherMock.matches[0];

    const { status, body } = await chai.request(app).patch('/matches/999/finish')
      .send(sendData).set('Authorization', httpRequestBody.token);

    expect(body.message).to.equal('Matcher 999 not Found');
    expect(status).to.equal(404);
  });
  it('should return conflict when there is nothing to be updated', async function () {
    sinon.stub(SequelizeMatcher, 'findOne').resolves(matcherMock.matches[0] as any);
    sinon.stub(SequelizeMatcher, 'update').resolves([0] as any);

    const { id, ...sendData } = matcherMock.matches[0];

    const { status, body } = await chai.request(app).patch('/matches/1/finish').set('Authorization', httpRequestBody.token)
      .send(sendData);

    expect(status).to.equal(409);
    expect(body.message).to.equal('There are no updates to perform in Matcher');
  });
    
  });
  describe('PATH /matches/id matchers', function() {
    it('Return update for matcher update', async function() {
    // Arrange
    sinon.stub(SequelizeMatcher, 'update').resolves([1] as any);
    sinon.stub(SequelizeMatcher, 'findOne').resolves(matcherMock.matches[0] as any);
    
    // Act
    const { status, body } = await chai.request(app).patch('/matches/1')
    .set('Authorization', httpRequestBody.token)
    .send({ homeTeamGoals: 2, awayTeamGoals: 2 });
    // Assert
    expect(body).to.deep.equal({ "message": 'Matcher Update', matcher: matcherMock.matches[0] });
    expect(status).to.equal(200);
  });
  it('should return not found when the macther to update does not exists', async function () {
    sinon.stub(SequelizeMatcher, 'findOne').resolves(null);

    const { id, ...sendData } = matcherMock.matches[0];

    const { status, body } = await chai.request(app).patch('/matches/999').set('Authorization', httpRequestBody.token)
      .send(sendData);

    expect(body.message).to.equal('Matcher 999 not Found');
    expect(status).to.equal(404);
  });
  it('should return conflict when the goals are higher than the original', async function () {
    sinon.stub(SequelizeMatcher, 'findOne').resolves(matcherMock.matches[0] as any);

    const { id, ...sendData } = matcherMock.matches[0];

    const { status, body } = await chai.request(app).patch('/matches/1')
      .set('Authorization', httpRequestBody.token)
      .send({ homeTeamGoals: 0, awayTeamGoals: 0 });

    expect(status).to.equal(409);
    expect(body.message).to.equal('The goals are higher than the original');
  });
  it('should return conflict when there is nothing to be updated', async function () {
    sinon.stub(SequelizeMatcher, 'findOne').resolves(matcherMock.matches[0] as any);
    sinon.stub(SequelizeMatcher, 'update').resolves([0] as any);

    const { id, ...sendData } = matcherMock.matches[0];

    const { status, body } = await chai.request(app).patch('/matches/1')
      .set('Authorization', httpRequestBody.token)
      .send(sendData);

    expect(status).to.equal(409);
    expect(body.message).to.equal('There are no updates to perform in Matcher');
  });
  });
 describe('POST /matches', function() {
  it('should return created for matcher create', async function() {
    // Arrange
    sinon.stub(SequelizeTeam,'findAll').resolves(matcherMock.findTeamsCreated as any)
    sinon.stub(SequelizeMatcher, 'create').resolves(matcherMock.createdMatch as any);
    const { id, inProgress, ...sendData } = matcherMock.createdMatch;
    // Act
    const { status, body } = await chai.request(app).post('/matches').set('Authorization', httpRequestBody.token).send(sendData);
    // Assert
    expect(status).to.equal(201);
    expect(body).to.deep.equal(matcherMock.createdMatch);
  });
  it('should return unprocessable entity when the teams are equal', async function () {
    sinon.stub(SequelizeTeam,'findAll').resolves(matcherMock.matches as any)
    const { id, inProgress, ...sendData } = matcherMock.createdMatch;
    sendData.homeTeamId = 1;
    sendData.awayTeamId = 1;
    const { status, body } = await chai.request(app).post('/matches')
    .set('Authorization', httpRequestBody.token)
      .send(sendData);

    expect(body.message).to.equal('It is not possible to create a match with two equal teams');
    expect(status).to.equal(422);
  });
  it('should return conflict when there is nothing to be updated', async function () {
    sinon.stub(SequelizeTeam,'findAll').resolves(matcherMock.matches[0] as any)
    const { id, inProgress, ...sendData } = matcherMock.createdMatch;

    const { status, body } = await chai.request(app).post('/matches')
    .set('Authorization', httpRequestBody.token)
      .send(sendData);

      expect(body.message).to.equal('There is no team with such id!');
    expect(status).to.equal(404);
  }
  );
  });
afterEach(sinon.restore);
});
