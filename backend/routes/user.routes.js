import { Router } from "express";
import { loginUser, registerUser } from "../controller/user.controller.js"; 


const router=Router();

const useRouter = () => {

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

}

export default useRouter;