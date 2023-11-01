import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app'
import SequelizeMatcher from '../database/models/SequelizeMatches';
import { matches } from './mock/matcher/Matcher.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Team Test', function() {
  it('should return all teams', async function() {
    // Arrange
    sinon.stub(SequelizeMatcher, 'findAll').resolves(matches as any);
    // Act
    const { status, body } = await chai.request(app).get('/teams');
    // Assert
    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });
  afterEach(sinon.restore);
});
