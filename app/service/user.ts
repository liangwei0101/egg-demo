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

  public async addUser() {

    // 模拟前端传递过来的数据（方便测试）
    const user = new UserModel();
    user.userName = 'add user';
    user.userNo = 99;

    const res = await UserModel.create(user);
    console.log('=================')
    console.log(res)
    console.log('=================')
    return res;
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
