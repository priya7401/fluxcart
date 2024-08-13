import express, { Router } from 'express';
import { createValidator } from 'express-joi-validation';
import * as contactValidator from "./validators/contact.validator";
import * as contactController from "./controllers/contact.controller";

export const router: Router = express.Router();

const validator = createValidator({ passError: true });

router.post(
  "/identify",
  validator.body(contactValidator.identifyContactValidator),
  contactController.identifyContact
);