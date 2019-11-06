import { Controller } from 'egg';
import { UserModel } from '../model/User'

export default class HomeController extends Controller {

  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('egg');
  }

  public async getUser() {
    const { ctx } = this;

    const users = await ctx.model.User.findOne();

    ctx.body = users
  }

  public async getUsers() {
    const { ctx } = this;

    const users = await ctx.model.User.find();

    ctx.body = users
  }

  public async addUser() {
    const { ctx } = this;

    // 模拟前端传递过来的数据（方便测试）
    let user = new UserModel()
    user.userName = 'add user';
    user.userNo = 99;

    const res = await ctx.model.User.create(user);

    ctx.body = res;
  }

  public async updateUser() {
    const { ctx } = this;

    let user = new UserModel()
    user.userNo = 99;

    const res = await ctx.model.User.findOneAndUpdate({ userNo: user.userNo }, { userName: 'i am from update' });

    ctx.body = res;
  }

  public async deleteUser() {
    const { ctx } = this;

    let user = new UserModel()
    user.userNo = 99;

    const res = await ctx.model.User.findOneAndRemove({ userNo: user.userNo });


    ctx.body = res;
  }

  public async test() {
    const { ctx } = this;

    // const res = UserModel.userStaticTestMethods();

    // 模拟前端传递过来的数据（方便测试）
    let user = new UserModel()
    user.userName = 'add user';
    user.userNo = 96;

    const res = await UserModel.create(user);

    ctx.body = res;
  }
}
