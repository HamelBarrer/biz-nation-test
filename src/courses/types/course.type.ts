import { LessonsI } from '../../lessons/types/lessons.type';

export interface CourseI {
  logo: string;
  title: string;
  description: string;
  publicacionDate: string;
  introductoryVideo: string;
  lessions: LessonsI[];
}

export interface ProgressCoursesI {
  userId: number;
  courseId: number;
  courseStatusId: number;
  approvedDate?: string;
}
