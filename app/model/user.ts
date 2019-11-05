import { Application } from 'egg';
import { Document, Model, Schema } from 'mongoose';

let UserModel: any;

/**
  * 定义一个User的Schema
*/
const UserSchema: Schema = new Schema({

  userNo: {
    type: Number,
    index: true,
  },

  userName: String
},
  {
    timestamps: true,
  }
);

// userNo 为索引
UserSchema.index({ userNo: 1, });


/**
  * 用户字段接口
*/
export interface IUser {

  userNo: number

  userName: string
}


/**
  * 用户Document（实例方法在这写）
*/
export interface IUserDocument extends IUser, Document {

  /**
  * 实例方法
  */
  // userFucition: () => IUser;
}

/**
  * 静态方法
*/
export interface IUserModel extends Model<IUserDocument> {

  /**
   * 静态方法
   */
  // static1 :() => string
}

// egg-mongoose注入
export default (app: Application): Model<IUserDocument> => {

  const mongoose = app.mongoose;
  
  UserModel = mongoose.model<IUserDocument, IUserModel>('User', UserSchema);

  return UserModel;
}

export { UserModel, UserSchema } 