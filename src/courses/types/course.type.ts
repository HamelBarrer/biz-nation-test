export interface CourseI {
  logo: string;
  title: string;
  description: string;
  publicacionDate: string;
  introductoryVideo: string;
  lessions: LessonsI[];
}

export interface LessonsI {
  lessonId: number;
  title: string;
  description: string;
  video: string;
  courseId: number;
}
