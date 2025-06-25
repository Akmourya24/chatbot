import { Router } from "express";
import { registerUser } from "../controller/user.controller.js"; 


const router=Router();

const useRouter = () => {

router.route("/register").post(registerUser);

}

export default useRouter;