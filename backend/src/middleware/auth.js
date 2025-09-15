import jwt from "jsonwebtoken";
import User from "./../models/User.js";

let auth = async (req, res, next) => {
  //토큰을 request headers에서 가져오기
  const authHeader = req.headers["authorization"];

  //Bearer sdfwefwfw .....
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.status(401);
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decode.userId });
    if (!user) {
      return res.status(400).send("없는 유저입니다.");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
