import { StudentSchema } from '../schema/student';
import { Resolver, Query, Mutation } from 'type-graphql';
import { StudentModel } from '../../model/Student';

@Resolver(StudentSchema)
export class StudentResolver {

  @Query(() => StudentSchema)
  async getStudent() {
    return await StudentModel.findOne();
  }

  @Mutation(() => StudentSchema)
  async addStudent() {
    let strudent = new StudentModel();
    strudent.userNo = 666;
    strudent.userName = 'liang';

    return await StudentModel.create(strudent);
  }
}
