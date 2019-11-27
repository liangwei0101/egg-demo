import { Application } from 'egg';
// import { IBaseSchema } from './IBaseSchema';
import { Document, Model, Schema, model } from 'mongoose';

/**
  * 定义一个Student的Schema
*/
const StudentSchema: Schema = new Schema({

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
StudentSchema.index({ userNo: 1, });

// StudentSchema的实例方法
StudentSchema.methods.userInstanceTestMethods = function () {

  const user: IStudent = new StudentModel();
  user.userName = '我是实例化方法测试';
  user.userNo = 9527;

  return user;
};

// StudentSchema的实例方法
StudentSchema.statics.userStaticTestMethods = function () {

  const user: IStudent = new StudentModel();
  user.userName = '我是静态方法测试';
  user.userNo = 9528;

  return user;
};

/**
  * 用户字段接口
*/
export interface IStudent {

  userNo: number;

  userName: string;
}

/**
  * 用户Document（实例方法在这写）
*/
export interface IStudentDocument extends IStudent, Document {

  /**
  * 实例方法接口（名称需要和Schema的方法名一样）
  */
  //  userInstanceTestMethods: () => IStudent;
}

/**
  * 静态方法接口
*/
export interface IStudentModel extends Model<IStudentDocument> {

  /**
   * 静态方法
   */
  // userStaticTestMethods: () => IStudent;
}

export const StudentModel = model<IStudentDocument, IStudentModel>('Student', StudentSchema);

// egg-mongoose注入
export default (app: Application) => {

  const mongoose = app.mongoose;
  // 这里为了挂载到ctx中，让正常ctx.model.Student也能使用
  return mongoose.model<IStudentDocument, IStudentModel>('Student', StudentSchema);
};
