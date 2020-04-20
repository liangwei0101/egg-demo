
import BaseModel from './BaseModel';
import { ObjectType, Field, Int } from 'type-graphql';
import { index, getModelForClass, prop } from '@typegoose/typegoose';


/**
  * 用户字段接口
*/
@ObjectType()
@index({ userNo: 1 })
export default class User extends BaseModel {

  @prop({ required: true })
  @Field(() => Int, { description: "编号" })
  userNo: number;

  @prop({ required: true })
  @Field({ nullable: true, description: "名称" })
  userName?: string;


  //#region（实例方法 和 实例方法）
  public async userInstanceTestMethods() {

    const user: User = new User();
    user.userName = '我是实例化方法测试';
    user.userNo = 9527;

    return user;
  }

  public static async userStaticTestMethods() {

    const user: User = new User();
    user.userName = '我是静态方法测试';
    user.userNo = 9527;

    return user;
  }

  //#endregion
}

export const UserModel = getModelForClass(User);
