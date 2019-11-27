import { Student } from '../../model/Student';
import { Resolver, Query, Mutation } from 'type-graphql';
import { StudentModel } from '../../model/Student';

@Resolver(Student)
export class StudentResolver {

  @Query(() => Student)
  async getStudent() {
    return await StudentModel.findOne();
  }

  @Mutation(() => Student)
  async addStudent() {
    let strudent = new StudentModel();
    strudent.userNo = 666;
    strudent.userName = 'liang';

    return await StudentModel.create(strudent);
  }
}
