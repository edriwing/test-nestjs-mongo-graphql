import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentToLessonInput } from 'src/student/assign-students-to-lesson-input';
import { StudentService } from 'src/student/student.service';
import { Lesson } from './lesson.entity';
import { Student } from 'src/student/student.entity';
import { StudentType } from 'src/student/student.type';

@Resolver(of => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}
  @Query(returns => LessonType)
  lesson(@Args('id') id: string): Promise<LessonType> {
    return this.lessonService.getLesson(id);
  }

  @Query(returns => [LessonType])
  lessons(): Promise<LessonType[]> {
    return this.lessonService.getLessons();
  }

  @Mutation(returns => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ): Promise<LessonType> {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation(returns => LessonType)
  assignStudentToLesson(
    @Args('AssignStudentToLessonInput')
    assignStudentToLessonInput: AssignStudentToLessonInput,
  ): Promise<LessonType> {
    return this.lessonService.assignStudentToLesson(assignStudentToLessonInput);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson): Promise<StudentType[]> {
    return this.studentService.getManystudents(lesson.students || []);
  }
}
