import { Request, Response } from 'express';
import { insertLessons } from '../repositories/lessons.repository';

export const createLessons = async (req: Request, res: Response) => {
  const repository = await insertLessons(req.body);

  res.status(201).json(repository);
};
