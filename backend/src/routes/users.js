import express, { response } from "express";
import User from "./../models/User.js";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";

const router = express.Router();

//유저 데이터 인증
router.get("/auth", auth, async (req, res, next) => {
  return res.json({
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
  });
});

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

//로그인
router.post("/login", async (req, res, next) => {
  // req.body = password, email
  try {
    //존재하는 User인지 체크
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Auth failed, email not found");
    }
    //비밀번호가 올바른것인지 체크
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(400).send("Wrong Password");
    }

    //token 생성
    const payload = {
      userId: user._id.toHexString(),
    };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({ user, accessToken });
  } catch (error) {}
});

export default router;
