import { PrismaClient } from '@prisma/client';
import { LessonsI } from '../types/lessons.type';

const prisma = new PrismaClient();

export const insertLessons = async (data: LessonsI) => {
  return await prisma.lessons.create({
    data: data,
  });
};

export const removeLessons = async (lessonId: number) => {
  return await prisma.lessons.update({
    data: {
      isActive: false,
    },
    where: {
      lessonId,
    },
  });
};
