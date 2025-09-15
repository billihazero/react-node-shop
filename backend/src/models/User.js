import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
  },
  email: {
    type: String,
    trim: true, //빈칸 없애줌
    unique: true,
  },
  password: {
    type: String,
    minLength: 5,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
});

//save 하기 전에 비밀번호 hash
userSchema.pre("save", async function (next) {
  let user = this;

  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }

  next();
});

const User = mongoose.model("User", userSchema);
export default User;
