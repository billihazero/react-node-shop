import express from "express";
import User from "./../models/User.js";

const router = express.Router();

//유저 데이터 저장
router.post("/register", async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

export default router;
