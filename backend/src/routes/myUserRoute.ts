import express from "express"
import MyUserController from "../controller/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { ValidateRequest } from "../middleware/validation";

const router = express.Router();

router.get("/",jwtCheck,jwtParse,MyUserController.getUser)
router.post("/",jwtCheck,MyUserController.createCurrentUser)
router.put("/",jwtCheck,jwtParse,ValidateRequest,MyUserController.updateCurrentUser)


export default router;  