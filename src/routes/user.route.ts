import {Router} from "express"
import { createUserHandler } from "../controllers/user.controller";
import validate from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";

const router = Router();

///////////////////////////////////////////////// ROUTES ///////////////////////////////////////////////////////

// @route   GET api/user
// @desc    Create user
// @access  Private
router.post('', validate(createUserSchema),createUserHandler);

export default router;