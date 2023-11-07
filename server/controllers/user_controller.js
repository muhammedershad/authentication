import User from "../models/user.js";
import bcrypt from "bcryptjs";

async function signupRoute(req, res) {
  console.log(req.body);
  const { username, email, password, confirmPassword } = req.body;
  if (password.trim() !== confirmPassword.trim()) {
    res.json({ message: "Passwords do not match!" });
  }
  if (username.trim().length < 6) {
    res.json({ message: "Username must be at least 6 characters long!" });
  }
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  if (!emailRegex.test(email)) {
    res.json({ message: "Invalid email!" });
  }
  if (password.trim().length < 6) {
    res.json({ message: "Password must be at least 6 characters long!" });
  }

  const hashedPass = await bcrypt.hash(password, 10)
  console.log(hashedPass);

  const user = new User({
    username,
    email,
    password: hashedPass,
  });

  try {
    const savedUser = await user.save();
    return res.json({success: true});
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
}

async function loginRoute(req, res) {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Invalid email or password!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ message: "Invalid email or password!" });
    }
    return res.json({ success: true });
}

const userController = {
  signupRoute,
  loginRoute
};

export default userController;
