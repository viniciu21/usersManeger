const request = require('supertest');
const app = require('../../src/server');
const factory = require('../factories');

const truncate = require('../utils/truncade');

describe('User', () => {
  beforeEach(async () => {
    truncate.truncate();
  });

  it('Post a user and return a id', async () => {
    const user = await factory.attrs('User');

    const response = await request(app).post('/users').send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('Not be able to register a duplicate email', async () => {
    const user = await factory.attrs('User');

    await request(app).post('/users').send(user);

    const response = await request(app).post('/users').send(user);

    expect(response.status).toBe(400);
  });

  it('it is not possible to register a user with an empty name, email or password', async () => {
    const response = await request(app).post('/users').send({
      name: '',
      password: '',
      email: '',
    });

    expect(response.text).toBe('"Porfavor, preencha todos os campos"');
  });

  it('It to be able to search a user by index', async () => {
    const user = await factory.attrs('User');

    const userSaved = await request(app).post('/users').send(user);

    const response = await request(app)
      .get('/users')
      .send({ id: userSaved.body.id });

    expect(response.body[0]).toHaveProperty('id');
  });

  it('It is not possible to find a user that does not exist', async () => {
    const response = await request(app).get('/userIndex').send({ id: 10000 });

    expect(response.status).toBe(400);
  });

  it('It to be able to get all the users', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
  });

  it('It should be possible to change an existing user', async () => {
    const user = await factory.attrs('User');
    const userUpdated = await factory.attrs('User');

    const userSaved = await request(app).post('/users').send(user);

    const response = await request(app).put('/users').send({
      id: userSaved.body.id,
      userUpdated,
    });

    const isChanged = response.body.name === userUpdated.name;

    expect(isChanged).toBe(true);
  });

  it('It should not be possible to change a user with the missing data', async () => {
    const user = await factory.attrs('User');

    const userSaved = await request(app).post('/users').send(user);

    const response = await request(app).put('/users').send({
      id: userSaved.body.id,
      name: '',
      password: '',
      email: '',
    });

    expect(response.status).toBe(400);
  });

  it('It is possible to delete existing users', async () => {
    const user = await factory.attrs('User');

    const userSaved = await request(app).post('/users').send(user);

    const response = await request(app)
      .delete('/users')
      .send({ id: userSaved.body.id });

    expect(response.status).toBe(200);
  });

  it('It should not be possible to delete a non-existent user', async () => {
    const response = await request(app).delete('/users').send({ id: NaN });

    expect(response.status).toBe(400);
  });
});
