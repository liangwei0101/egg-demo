import { Service } from 'egg';
import User from '../model/User';
import { UserModel } from '../model/User';

/**
 * 用户 Service 层
 */
export default class UserService extends Service {

  /**
  * sayHi to you
  * @param name - your name
  */
  public async sayHi(name: string) {
    return `hi, ${name}`;
  }

  public async addUserByScheduleTest() {

    const user = new UserModel();
    user.userName = 'add user';
    user.userNo = 99;

    const res = await UserModel.create(user);
    return res;
  }

  /**
  * 测试用户的实例方法
  */
  public async testUserInstanceServiceMethods(): Promise<User> {
    const newUser = new UserModel();

    return await newUser.userInstanceTestMethods();
  }

  /**
  * 测试用户的方法
  */
  public async testUserStaticServiceMethods(): Promise<User> {
    return await UserModel.userStaticTestMethods();
  }

  public async filterUser(filter: any, order: any, page: any) {
    order = Object.assign({ createdAt: -1 }, order);
    page = Object.assign({ num: 1, size: 10 }, page);
    filter = Object.assign({}, filter);

    return await UserModel.find(filter)
      .sort(order)
      .skip((page.num - 1) * page.size)
      .limit(page.size);
  }

}
