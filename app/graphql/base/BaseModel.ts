
import { Field, ObjectType } from 'type-graphql'
@ObjectType({ description: "The Base model" })
export class BaseModel  {

  @Field()
  _id?: string

  @Field()
  createAtDate: Date

  @Field()
  updateAtDate: Date
}