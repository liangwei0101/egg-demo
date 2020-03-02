
import BaseModel from './BaseModel';
import { InstanceType, ModelType } from 'typegoose'
import { ObjectType, Field, Int } from 'type-graphql';
import { index, prop, instanceMethod, staticMethod } from 'typegoose'

/**
  * 用户字段接口
*/
@ObjectType()
@index({ userNo: 1 })
export class User extends BaseModel {

  @prop({ required: true })
  @Field(() => Int, { description: "编号" })
  userNo: number;

  @prop({ required: true })
  @Field({ nullable: true, description: "名称" })
  userName?: string;


  //#region（实例方法 和 实例方法）
  @instanceMethod
  public async userInstanceTestMethods(this: InstanceType<User>) {

    const user: User = new User();
    user.userName = '我是实例化方法测试';
    user.userNo = 9527;

    return user;
  }

  @staticMethod
  public static async userStaticTestMethods(this: ModelType<User> & typeof User) {

    const user: User = new User();
    user.userName = '我是静态方法测试';
    user.userNo = 9527;

    return user;
  }

  //#endregion
}

export const UserModel = new User().getModelForClass(User);
