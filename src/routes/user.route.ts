import {Router} from "express"
import { createUserHandler } from "../controllers/user.controller";
import validate from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";

const router = Router();

router.post('', validate(createUserSchema),createUserHandler);

export default router;