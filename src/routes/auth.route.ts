import {Router} from "express"
import { closeSessionHandler, createSessionHandler, signInHandler } from "../controllers/auth.controller";
import validate from "../middleware/validateResource";
import { closeSessionSchema, createSessionSchema } from "../schema/auth.schema";
import { createUserSchema } from "../schema/user.schema";

const router = Router();

///////////////////////////////////////////////// ROUTES ///////////////////////////////////////////////////////

// @route   POST api/auth/signin
// @desc    Create an account
// @access  Public
router.post('/signin', validate(createUserSchema), signInHandler);

// @route   POST api/auth/login
// @desc    Create a session to enter the app
// @access  Public
router.post('/login', validate(createSessionSchema), createSessionHandler);

// @route   POST api/auth/logout
// @desc    Logout from all devices
// @access  Public
router.post('/logout', validate(closeSessionSchema), closeSessionHandler);


export default router;