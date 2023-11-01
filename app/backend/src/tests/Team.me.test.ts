import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app'

import SequelizeTeam from '../database/models/SequelizeTeam'
import { team, teams } from './mock/Team/Team.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Team Test', function() {
  it('should return all teams', async function() {
    // Arrange
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);
    // Act
    const { status, body } = await chai.request(app).get('/teams');
    // Assert
    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });

  it('should return a team by id', async function() {
    // Arrange
    sinon.stub(SequelizeTeam, 'findOne').resolves(team as any);
    // Act
    const { status, body } = await chai.request(app).get('/teams/1');
    // Assert
    expect(status).to.equal(200);
    expect(body).to.deep.equal(team);
  });

  it('should return not found if the team doesn\'t exists', async function() {
    // Arrange
    sinon.stub(SequelizeTeam, 'findOne').resolves(null);
    // Act
    const { status, body } = await chai.request(app).get('/teams/1');
    // Assert
    expect(status).to.equal(404);
    expect(body.message).to.equal('Team 1 not Found');
  });
  afterEach(sinon.restore);
});
