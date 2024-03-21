import { Request, Response } from 'express';
import {
  deletedCourse,
  findCourseById,
  findProgressCourseByIdCourse,
  insertCourse,
  insertProgressCourses,
  listCourses,
  updatedCourse,
} from '../repositories/course.repository';

export const getCourse = async (req: Request, res: Response) => {
  const courseId = Number(req.params.courseId);

  const userId = req.userId;
  const isAdmin = req.userRoleId === 1;

  const repository = await findCourseById(courseId, userId, isAdmin);
  if (!repository) {
    res.status(404).json({
      message: 'Course not found',
    });
    return;
  }

  res.status(200).json(repository);
};

export const getCourses = async (_: Request, res: Response) => {
  const repository = await listCourses(1);
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

  const progressCourses = await findProgressCourseByIdCourse(courseId);
  if (progressCourses.length !== 0) {
    res.status(400).json({ message: 'The course can no longer be deleted' });
  }

  const repository = await deletedCourse(courseId);

  res.status(200).json(repository);
};

export const createProgressCourses = async (req: Request, res: Response) => {
  const repository = await insertProgressCourses(req.body);

  res.status(201).json(repository);
};
