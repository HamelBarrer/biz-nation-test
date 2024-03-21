import { PrismaClient } from '@prisma/client';
import { CourseI } from '../../types/course.type';

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
      Lessons: {
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

export const listCourses = async () => {
  return await prisma.courses.findMany({
    select: {
      courseId: true,
      logo: true,
      title: true,
      description: true,
      publicacionDate: true,
      introductoryVideo: true,
      Lessons: {
        select: {
          lessonId: true,
          title: true,
          description: true,
          video: true,
        },
      },
    },
  });
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
      Lessons: {
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
      Lessons: {
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
      Lessons: {
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
      Lessons: {
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
