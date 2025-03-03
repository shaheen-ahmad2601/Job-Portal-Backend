import express from "express";
// import {getCompanyById, registerCompany,getCompany, updateCompany} from "../controllers/company.controller.js"
import isAuthenticated from "../middlewares/isAutheticated.js";
import { registerCompany, getCompany, getCompanyById, updateCompany, deleteCompany } from "../controllers/company.controller.js";
// const app = express();

const router = express.Router();


router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
router.route("/update/:id").put(isAuthenticated,updateCompany);
router.route("/delete/:id").delete(isAuthenticated,deleteCompany);


export default router;

