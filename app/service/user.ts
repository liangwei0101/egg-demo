import { Service } from 'egg';
import { UserModel, IUser } from '../model/User';

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

  /**
  * 测试用户的实例方法
  */
  public async testUserInstanceServiceMethods(): Promise<IUser> {
    const newUser = new UserModel();
    return newUser.userInstanceTestMethods();
  }

  /**
  * 测试用户的实例方法
  */
  public async testUserStaticServiceMethods(): Promise<IUser> {
    return UserModel.userStaticTestMethods();
  }

}
