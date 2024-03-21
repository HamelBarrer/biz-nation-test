import { Request, Response } from 'express';
import {
  deletedCourse,
  findCourseById,
  insertCourse,
  listCourses,
  updatedCourse,
} from '../repositories/v1/course.repository';

export const getCourse = async (req: Request, res: Response) => {
  const courseId = Number(req.params.courseId);

  const repository = await findCourseById(courseId);
  if (!repository) {
    res.status(404).json({
      message: 'Course not found',
    });
    return;
  }

  res.status(200).json(repository);
};

export const getCourses = async (_: Request, res: Response) => {
  const repository = await listCourses();
  if (repository.length === 0) {
    res.status(204).json();
    return;
  }

  res.status(200).json(repository);
};

export const createCourse = async (req: Request, res: Response) => {
  const repository = await insertCourse(req.body);

  res.status(201).json(repository);
};

export const updateCourse = async (req: Request, res: Response) => {
  const courseId = Number(req.params.courseId);
  const repository = await updatedCourse(courseId, req.body);

  res.status(201).json(repository);
};

export const deleteCourse = async (req: Request, res: Response) => {
  const courseId = Number(req.params.courseId);

  const repository = await deletedCourse(courseId);

  res.status(200).json(repository);
};
