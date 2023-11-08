import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


async function signup(req, res) {
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

async function login(req, res) {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Invalid email or password!", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ message: "Invalid email or password!" , success: false });
    }
    user.password = undefined;
    
    const token = jwt.sign({
      data: user._id
    }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.cookie('token', token, { httpOnly: true}).status(200).json({ success: true, user });
}

const update = async (req, res) => {
    if(req.parmas.id !== req.user.id)
        return res.status(401).send("You need to login");
    if(req.body.password ) {
      req.body.password = bcrypt.hashSync(req.body.password, 10)
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      }, { new: true });
      return res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
      return res.status(500).json({ message: error.message, success: false });
    }
}

const deleteUser = async (req, res) => {

}

const logout = async (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ success: true, message: "Logged out!" });
}

const userController = {
  signup,
  login,
  update,
  logout,
  deleteUser
};

export default userController;
