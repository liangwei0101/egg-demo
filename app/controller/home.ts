import { Controller } from 'egg';
import { UserModel } from '../model/User';

export default class HomeController extends Controller {

  public async index() {
    const { ctx } = this;

    ctx.body = await ctx.service.user.sayHi('egg');
  }

  public async getUser() {
    const { ctx } = this;

    const users = await UserModel.findOne();

    ctx.body = users;
  }

  public async getUsers() {
    const { ctx } = this;

    const users = await UserModel.find();

    ctx.body = users;
  }

  public async addUser() {
    const { ctx } = this;

    // 模拟前端传递过来的数据（方便测试）
    const user = new UserModel();
    user.userName = 'add user';
    user.userNo = 99;

    const res = await UserModel.create(user);

    ctx.body = res;
  }

  public async updateUser() {
    const { ctx } = this;

    const user = new UserModel();
    user.userNo = 99;

    const res = await UserModel.findOneAndUpdate({ userNo: user.userNo }, { userName: 'i am from update' }, { new: true });

    ctx.body = res;
  }

  public async deleteUser() {
    const { ctx } = this;

    const user = new UserModel();
    user.userNo = 99;

    const res = await UserModel.findOneAndRemove({ userNo: user.userNo });

    ctx.body = res;
  }

  public async testInstanceFunction() {
    const { ctx } = this;

    const user = await ctx.service.user.testUserInstanceServiceMethods();

    ctx.body = user;
  }

  public async testStaticMethods() {
    const { ctx } = this;

    const user = await ctx.service.user.testUserStaticServiceMethods();

    ctx.body = user;
  }

}
