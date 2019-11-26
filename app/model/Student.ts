
import { ObjectType, Field } from 'type-graphql'
import { Typegoose } from "typegoose";
import { ObjectId } from "mongodb";

@ObjectType()
export class Student extends Typegoose {

  @Field()
  readonly _id: ObjectId;

  @Field()
  userNo: number;

  @Field()
  userName: string;
}