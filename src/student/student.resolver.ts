import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StudentType } from './student.type';
import { StudentService } from './student.service';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';

@Resolver(of => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}
  @Query(returns => StudentType)
  student(@Args('id') id: string): Promise<StudentType> {
    return this.studentService.getStudent(id);
  }

  @Query(returns => [StudentType])
  students(): Promise<StudentType[]> {
    return this.studentService.getStudents();
  }

  @Mutation(returns => StudentType)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    return this.studentService.createStudent(createStudentInput);
  }
}
