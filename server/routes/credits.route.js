import express from "express"
import isAuth from "../middleware/isAuth.js"
import { createCreditsOrder, verifyAndAddCredits } from "../controllers/credits.controller.js"

const creditRouter = express.Router()

creditRouter.post("/order", isAuth, createCreditsOrder)
creditRouter.get("/verify", isAuth, verifyAndAddCredits)

export default creditRouter