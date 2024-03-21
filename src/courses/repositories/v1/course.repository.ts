import { PrismaClient } from '@prisma/client';
import { CourseI, ProgressCoursesI } from '../../types/course.type';

const prisma = new PrismaClient();

export const findCourseById = async (courseId: number) => {
  return await prisma.courses.findUnique({
    select: {
      courseId: true,
      logo: true,
      title: true,
      description: true,
      publicacionDate: true,
      introductoryVideo: true,
      lessons: {
        select: {
          lessonId: true,
          title: true,
          description: true,
          video: true,
        },
      },
    },
    where: {
      courseId,
    },
  });
};

export const listCourses = async (userId: number) => {
  const courses = await prisma.courses.findMany({
    select: {
      courseId: true,
      logo: true,
      title: true,
      publicacionDate: true,
      introductoryVideo: true,
      progressCourses: {
        select: {
          courseStatus: true,
        },
        where: {
          userId: userId,
        },
      },
      lessons: {
        select: {
          lessonId: true,
        },
      },
    },
  });

  const coursesWithLessonCount = courses.map((course) => ({
    ...course,
    lessonCount: course.lessons.length,
  }));

  const coursesWithCompletedLessons = await Promise.all(
    coursesWithLessonCount.map(async (course) => {
      const completedLessonsCount = await prisma.progressLessons.count({
        where: {
          userId: userId,
          courseStatusId: { notIn: [1, 2] },
        },
      });
      return {
        ...course,
        completedLessonsCount,
      };
    }),
  );

  return coursesWithCompletedLessons;
};

export const insertCourse = async (data: CourseI) => {
  return await prisma.courses.create({
    select: {
      courseId: true,
      logo: true,
      title: true,
      description: true,
      publicacionDate: true,
      introductoryVideo: true,
      lessons: {
        select: {
          lessonId: true,
          title: true,
          description: true,
          video: true,
        },
      },
    },
    data: {
      logo: data.logo,
      title: data.title,
      description: data.description,
      publicacionDate: data.publicacionDate,
      introductoryVideo: data.introductoryVideo,
      lessons: {
        create: data.lessions,
      },
    },
  });
};

export const updatedCourse = async (courseId: number, data: CourseI) => {
  return await prisma.courses.update({
    select: {
      courseId: true,
      logo: true,
      title: true,
      description: true,
      publicacionDate: true,
      introductoryVideo: true,
      lessons: {
        select: {
          lessonId: true,
          title: true,
          description: true,
          video: true,
        },
      },
    },
    data: {
      logo: data.logo,
      title: data.title,
      description: data.description,
      publicacionDate: data.publicacionDate,
      introductoryVideo: data.introductoryVideo,
      lessons: {
        updateMany: data.lessions.map((lesson) => ({
          where: { lessonId: lesson.lessonId },
          data: {
            title: lesson.title,
            description: lesson.description,
            video: lesson.video,
          },
        })),
      },
    },
    where: {
      courseId,
    },
  });
};

export const deletedCourse = async (courseId: number) => {
  return await prisma.courses.delete({
    where: {
      courseId,
    },
  });
};

export const insertProgressCourses = async (data: ProgressCoursesI) => {
  return await prisma.progressCourses.create({
    data,
  });
};
