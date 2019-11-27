
import BaseModel from './BaseModel';
import { InstanceType } from 'typegoose'
import { ObjectType, Field } from 'type-graphql';
import { index, prop, ModelType, instanceMethod } from 'typegoose'

/**
  * 学生类
*/
@ObjectType()
@index({ userNo: 1 })
export class Student extends BaseModel {

  @prop({ required: true })
  @Field()
  userNo: number;

  @prop({ required: true })
  @Field()
  userName: string;

  //#region（实例方法 和 实例方法）
  @instanceMethod
  public async userInstanceTestMethods(this: InstanceType<Student>) {

    const user: Student = new Student();
    user.userName = '我是实例化方法测试';
    user.userNo = 9527;

    return user;
  }

  @instanceMethod
  public async userStaticTestMethods(this: ModelType<Student> & typeof Student) {

    const user: Student = new Student();
    user.userName = '我是静态方法测试';
    user.userNo = 9527;

    return user;
  }

  //#endregion
}

export const StudentModel = new Student().getModelForClass(Student);