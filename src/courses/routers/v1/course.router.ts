import { Router } from 'express';
import {
  verificationAdminRole,
  verificationJWTToken,
} from '../../../middlewares/auth.middleware';
import {
  createCourse,
  createProgressCourses,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from '../../controllers/course.controller';

const router = Router();

router.get('/:courseId', [verificationJWTToken], getCourse);
router.get('/', getCourses);
router.post('/', [verificationJWTToken, verificationAdminRole], createCourse);
router.put('/:courseId', updateCourse);
router.delete('/:courseId', deleteCourse);
router.post('/registerProgressCourses', createProgressCourses);

export default router;
