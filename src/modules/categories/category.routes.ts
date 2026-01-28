import express from 'express'
import auth from '../../middleware/auth.middleware';
import { UserRole } from '../../types';
import { categoryController } from './category.controller';

const router = express.Router();

router.post('/post', auth(UserRole.admin), categoryController.createCategory)

export const categoryRouter = router

