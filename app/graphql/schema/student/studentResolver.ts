import { Student } from '../../../model/Student';
import { Resolver, Query } from 'type-graphql';
import { StudentSchemaModel } from '../../../mgooseSchema/StudentSchema';

@Resolver(() => Student)
export class StudentResolver {

  @Query(() => Student, { nullable: true })
  async getStudent() {
    await StudentSchemaModel.findOne();
    const aa = new Student();
    aa.userName = '1212'
    aa.userNo = 66;
    return aa;
  }

  // @Mutation(returns => Student, { name: 'student', description: '增加一个学生' })
  // async addStudent(): Promise<Student> {

  //   let studentSchemaModel = new StudentSchemaModel();
  //   studentSchemaModel.userNo = 888;
  //   studentSchemaModel.userName = '我是ts的新增哦'

  //   return await StudentSchemaModel.create(studentSchemaModel);
  // }
}
