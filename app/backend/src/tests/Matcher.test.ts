import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app'
import SequelizeMatcher from '../database/models/SequelizeMatches';
import * as matcherMock from './mock/matcher/Matcher.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matcher Test', function() {
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
  afterEach(sinon.restore);
});
