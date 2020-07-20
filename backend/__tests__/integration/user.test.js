const request = require('supertest');
const app = require('../../src/server');
const factory = require('../factories');

const truncate = require('../utils/truncade');

describe('User', () => {
  beforeEach(async () => {
    truncate() //to delete the data of models before each test
  });

  it('it should be possible to register users', async () => {
    const user = await factory.attrs('User');

    const response = await request(app).post('/users').send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('It should not be able to register a duplicate email', async () => {
    const user = await factory.attrs('User');

    await request(app).post('/users').send(user);

    const response = await request(app).post('/users').send(user);

    expect(response.status).toBe(400);
  });

  it('It should not be possible to register a user with an empty data', async () => {
    const response = await request(app).post('/users').send({
      name: '',
      password: '',
      email: '',
    });

    expect(response.status).toBe(400);
  });

  it('It should be able to search a user by index', async () => {
    const user = await factory.attrs('User');

    const userSaved = await request(app).post('/users').send(user);

    const response = await request(app)
      .get('/userIndex')
      .send({ id: userSaved.body.id });

    expect(response.body).toHaveProperty('id');
  });

  it('It should not be possible to find a user that does not exist', async () => {
    const response = await request(app).get('/userIndex').send({ id: NaN });

    expect(response.status).toBe(400);
  });

  it('It to be able to get all the users', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
  });

  it('It should be possible to change an existing user', async () => {
    const user = await factory.attrs('User');

    const userSaved = await request(app).post('/users').send(user);

    const response = await request(app).put('/users').send({
      id: userSaved.body.id,
      name: 'qualquercoisa',
      email: 'qualquercoisa@hotmail.com',
      password: '1234566788',
    });

    const isChanged = response.body.name !== user.name;

    expect(isChanged).toBe(true);
  });

  it('It should not be possible to change a user with an existing email', async () => {
    const user1 = factory.attrs('User');
    const user2 = {
      name: 'aleatorio',
      email: 'aleatorio',
      password: 'aleatorio',
    }

    const userSaved1 = await request(app).post('/users').send(user1);
    const userSaved2 = await request(app).post('/users').send(user2);

    const response = await request(app).put('/users').send({
      id: userSaved1.body.id,
      email: user2.email,
      user2,
    });

    expect(response.status).toBe(400);
  });

  it('It should not be possible to change a user non-existent', async () => {

    const response = await request(app).put('/users').send({
      id: NaN,
    });

    expect(response.status).toBe(400);
  })

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

  it('It should be possible to delete an existing user', async () => {
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
