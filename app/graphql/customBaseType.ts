import { GraphQLScalarType } from "graphql";
import { ArgsType, Field } from 'type-graphql';

export const JosnScalar = new GraphQLScalarType({
  name: "JSON",
  description: "验证 JSON 类型",
  parseValue(value: any) {
    checkIsObject(value)
    return value;
  },
  serialize(value: any) {
    return value;
  },
});

// export const OrderScalar = new GraphQLScalarType({
//   name: "Order",
//   description: "设置Order",
//   parseValue(value: any) {
//     checkIsObject(value)
//     if (value.createdAt === undefined) {
//       throw new Error('亲，createdAt 字段 才是排序哦');
//     }
//     const orderObj = Object.assign(value, { createdAt: -1 });
//     console.log('====================')
//     console.log(value)
//     console.log('====================')
//     return orderObj;
//   },
//   serialize(value: any) {
//     return value;
//   },
// });

// export const PageScalar = new GraphQLScalarType({
//   name: "Page",
//   description: "设置Page",
//   parseValue(value: any) {
//     checkIsObject(value);
//     if (value.num === undefined || value.size === undefined) {
//       throw new Error('亲，num 或者 size 这两个参数才能传呢');
//     }
//     const orderObj = Object.assign(value, { num: 1, size: 10 });
//     console.log('====================')
//     console.log(value)
//     console.log('====================')
//     return orderObj;
//   },
//   serialize(value: any) {
//     return value;
//   },
// });


@ArgsType()
export class DefaultQuery {

  @Field(() => JosnScalar,  { nullable: true })
  filter: any;

  @Field(() => JosnScalar, { nullable: true })
  order: -1;

  @Field(() => JosnScalar, { nullable: true })
  page: any;
}

/**
  * 验证
*/
function checkIsObject(value: any) {
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    throw new Error('亲，参数不是一个对象呢！');
  }
}
