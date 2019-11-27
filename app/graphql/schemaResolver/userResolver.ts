import { UserSchema } from '../schema/user';
import { Resolver, Query, Mutation } from 'type-graphql';
import { UserModel } from '../../model/User';

@Resolver(UserSchema)
export class UserResolver {

  @Query(() => UserSchema)
  async getUser() {
    return UserModel.findOne();
  }

  @Mutation(() => UserSchema)
  async addUser() {

    let user = new UserModel();
    user.userNo = 666;
    user.userName = 'liang';

    return await UserModel.create(user);
  }
}
