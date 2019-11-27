import { Service } from 'egg';
import { UserModel, User } from '../model/User';

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
  * 测试用户的实例方法
  */
  public async testUserStaticServiceMethods(): Promise<User> {
    return UserModel.userStaticTestMethods();
  }

}
