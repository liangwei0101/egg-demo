import * as assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/service/Test.test.js', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });

  it('sayHi', async () => {
    const result = await ctx.service.user.sayHi('egg');
    assert(result === 'hi, egg');
  });

  it('addUserByScheduleTest', async () => {
    const result = await ctx.service.user.addUserByScheduleTest();
    assert(result.userNo === 99);
  });

  it('testUserInstanceServiceMethods', async () => {
    const user = await ctx.service.user.testUserInstanceServiceMethods();
    assert(user.userName == '我是实例化方法测试');
  });

  it('testUserStaticServiceMethods', async () => {
    const user = await ctx.service.user.testUserStaticServiceMethods();
    assert(user.userName == '我是静态方法测试');
  });

});
