import { Context } from 'egg'
import User from '../../model/User';
import { UserModel } from '../../model/User';
import { DefaultQuery } from '../customBaseType';
import { Resolver, Query, Mutation, Args, Ctx } from 'type-graphql';

@Resolver(User)
export class UserResolver {

  @Query(() => [User], { description: '查询用户列表' })
  async getUser(@Args() { filter, order, page }: DefaultQuery, @Ctx() ctx: Context) {
    return await ctx.service.user.filterUser(filter, order, page);
  }

  @Mutation(() => User, { description: '增加用户' })
  async addUser() {

    let user = new UserModel();
    user.userNo = 666;
    user.userName = 'liang';

    return await UserModel.create(user);
  }
}
