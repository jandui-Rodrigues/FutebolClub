import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app'
import SequelizeMatcher from '../database/models/SequelizeMatches';
import * as matcherMock from './mock/matcher/Matcher.mock';
import * as leaderBoardMock from './mock/leaderBoard/LeaderBoard.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('LeaderBoard Test', function() {
  beforeEach(function () { 
      sinon.restore(); 
    });
  describe('GET /leaderboard', function() {
    it('should return All Leadboard -- /leadboard', async function() {
    // Arrange
    sinon.stub(SequelizeMatcher, 'findAll').resolves(matcherMock.matches as any);
    // Act
    const { status, body } = await chai.request(app).get('/leaderboard');
    // Assert
        
    expect(status).to.equal(200);
    expect(body).to.deep.equal(leaderBoardMock.matchesAll);
  });
    it('should return All Leadboard -- /leadboard/away', async function() {
    // Arrange
    sinon.stub(SequelizeMatcher, 'findAll').resolves(matcherMock.matches as any);
    // Act
    const { status, body } = await chai.request(app).get('/leaderboard/away');
    // Assert
    expect(status).to.equal(200);
    expect(body).to.deep.equal(leaderBoardMock.matchesAway);
  });
    it('should return Leadboard home -- /leadboard/home', async function() {
    // Arrange
    sinon.stub(SequelizeMatcher, 'findAll').resolves(matcherMock.matches as any);
    // Act
    const { status, body } = await chai.request(app).get('/leaderboard/home');
    // Assert
    console.log(body);
    expect(status).to.equal(200);
    expect(body).to.deep.equal(leaderBoardMock.matchesHome);
  });
  });
  
  afterEach(sinon.restore);
});
