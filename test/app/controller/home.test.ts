import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';
import User from '../../../app/model/User';

describe('test/app/controller/home.test.ts', () => {

  it('should GET /', async () => {
    const result = await app.httpRequest().get('/').expect(200);
    assert(result.text === 'hi, egg');
  });

  it('addUser', async () => {
    const result = await app.httpRequest().post('/user').expect(200);
    const user: User = result.body;
    assert(user.userName === 'add user');
  });

  it('getUser', async () => {
    const result = await app.httpRequest().get('/user').expect(200);
    const user: User = result.body;
    assert(user !== null);
  });

  it('getUsers', async () => {
    const result = await app.httpRequest().get('/users').expect(200);
    const users: User[] = result.body;
    assert(users === [] || users.length >= 0);
  });

  it('updateUser', async () => {
    const result = await app.httpRequest().put('/user').expect(200);
    const user: User = result.body;
    assert(user.userName == 'i am from update');
  });

  it('deleteUser', async () => {
    const result = await app.httpRequest().delete('/user').expect(200);
    const user: User = result.body;
    assert(user.userNo == 99);
  });

  it('testStaticMethods', async () => {
    const result = await app.httpRequest().get('/testStaticMethods').expect(200);
    const user: User = result.body;
    assert(user.userName == '我是静态方法测试');
  });

  it('testInstanceFunction', async () => {
    const result = await app.httpRequest().get('/testInstanceFunction').expect(200);
    const user: User = result.body;
    assert(user.userName == '我是实例化方法测试');
  });

});
