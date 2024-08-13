import express, { Router } from 'express';
import { createValidator } from 'express-joi-validation';

export const router: Router = express.Router();

const validator = createValidator({ passError: true });