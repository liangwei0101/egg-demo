import { User } from '../../model/User';
import { UserModel } from '../../model/User';
import { Resolver, Query, Mutation } from 'type-graphql';

@Resolver(User)
export class UserResolver {

  @Query(() => [User], { description: '查询用户列表' })
  async getUser() {
    return await UserModel.find();
  }

  @Mutation(() => User, { description: '增加用户' })
  async addUser() {

    let user = new UserModel();
    user.userNo = 666;
    user.userName = 'liang';

    return await UserModel.create(user);
  }
}
