import { PrismaClient } from '@prisma/client';
import { CourseI } from '../../types/course.type';

const prisma = new PrismaClient();

export const findCourseById = async (courseId: number) => {
  return await prisma.courses.findUnique({
    where: {
      courseId,
    },
  });
};

export const listCourses = async () => {
  return await prisma.courses.findMany();
};

export const insertCourse = async (data: CourseI) => {
  return await prisma.courses.create({
    data: {
      logo: data.logo,
      title: data.title,
      description: data.description,
      publicacionDate: data.publicacionDate,
      introductoryVideo: data.introductoryVideo,
    },
  });
};

export const updatedCourse = async (courseId: number, data: CourseI) => {
  return await prisma.courses.update({
    data,
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
