import { User } from '../../model/User';
import { Resolver, Query, Mutation } from 'type-graphql';
import { UserModel } from '../../model/User';

@Resolver(User)
export class UserResolver {

  @Query(() => User)
  async getUser() {
    const aa = await UserModel.findOne();
    console.log('=====================')
    console.log(aa)
    console.log('=====================')
    return aa;
  }

  @Mutation(() => User)
  async addUser() {

    let user = new UserModel();
    user.userNo = 666;
    user.userName = 'liang';

    return await UserModel.create(user);
  }
}
