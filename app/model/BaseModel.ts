import { Field, ObjectType } from 'type-graphql';
import { Typegoose, prop, pre } from 'typegoose';

/**
  * BaseModel
*/

@pre<BaseModel>('save', function(next) {
  if (!this.createdAt || this.isNew) {
    this.createdAt = this.updatedAt = new Date()
  } else {
    this.updatedAt = new Date()
  }
  next()
})

@ObjectType()
export default class BaseModel extends Typegoose {

  @Field()
  _id?: string

  @prop()
  @Field()
  createdAt: Date

  @prop()
  @Field()
  updatedAt: Date
}

