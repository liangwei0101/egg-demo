import { Field, ObjectType } from 'type-graphql';
import { prop, pre, Typegoose } from '@typegoose/typegoose';

/**
  * BaseModel
*/
@pre<BaseModel>('save', function (next) {
  if (!this.createdAt || this.isNew) {
    this.createdAt = this.updatedAt = new Date()
  } else {
    this.updatedAt = new Date()
  }
  next()
})

@ObjectType()
export default class BaseModel extends Typegoose {

  @Field({ description: "id" })
  _id?: string

  @prop()
  @Field({ description: "创建时间" })
  createdAt: Date

  @prop()
  @Field({ description: "更新时间" })
  updatedAt: Date
}

