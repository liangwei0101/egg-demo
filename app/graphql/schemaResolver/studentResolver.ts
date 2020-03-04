import Student from '../../model/Student';
import { Resolver, Query, Mutation } from 'type-graphql';
import { StudentModel } from '../../model/Student';

@Resolver(Student)
export class StudentResolver {

  @Query(() => [Student], { description: '查询用户列表' })
  async getStudent() {
    return await StudentModel.findOne();
  }

  @Mutation(() => Student, { description: '增加用户' })
  async addStudent() {
    let strudent = new StudentModel();
    strudent.userNo = 666;
    strudent.userName = 'liang';

    return await StudentModel.create(strudent);
  }
}
