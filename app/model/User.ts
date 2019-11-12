import { Application } from 'egg';
import { Document, Model, Schema, model } from 'mongoose';

/**
  * 定义一个User的Schema
*/
const UserSchema: Schema = new Schema({

  userNo: {
    type: Number,
    index: true,
  },

  userName: String,
},
  {
    timestamps: true,
  },
);

// userNo 为索引
UserSchema.index({ userNo: 1, });

// UserSchema的实例方法
UserSchema.methods.userInstanceTestMethods = function () {

  const user: IUser = new UserModel();
  user.userName = '我是实例化方法测试';
  user.userNo = 9527;

  return user;
};

// UserSchema的实例方法
UserSchema.statics.userStaticTestMethods = function () {

  const user: IUser = new UserModel();
  user.userName = '我是静态方法测试';
  user.userNo = 9528;

  return user;
};

/**
  * 用户字段接口
*/
export interface IUser {

  userNo: number;

  userName: string;
}

/**
  * 用户Document（实例方法在这写）
*/
export interface IUserDocument extends IUser, Document {

  /**
  * 实例方法接口（名称需要和Schema的方法名一样）
  */
 userInstanceTestMethods: () => IUser;
}

/**
  * 静态方法接口
*/
export interface IUserModel extends Model<IUserDocument> {

  /**
   * 静态方法
   */
  userStaticTestMethods: () => IUser;
}

export const UserModel = model<IUserDocument, IUserModel>('User', UserSchema);

// egg-mongoose注入
export default (app: Application) => {

  const mongoose = app.mongoose;
  // 这里为了挂载到ctx中，让正常ctx.model.User也能使用
  mongoose.model<IUserDocument, IUserModel>('User', UserSchema);
};
