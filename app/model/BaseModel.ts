import { Field, ObjectType } from 'type-graphql'

/**
  * BaseModel
  * 因为mongose的Document中不能有_id, 所以只能拿出来再继承一遍
*/
@ObjectType({ description: "创建时间 和 更新时间" })
export class BaseModel {

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}