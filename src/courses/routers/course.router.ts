import { Router } from 'express';
import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from '../controllers/course.controller';

const router = Router();

router.get('/:courseId', getCourse);
router.get('/', getCourses);
router.post('/', createCourse);
router.put('/:courseId', updateCourse);
router.delete('/:courseId', deleteCourse);

export default router;
