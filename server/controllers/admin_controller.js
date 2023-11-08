import Admin from "../models/admin.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

const login = async (req, res) => {
  try {
    console.log(req.body);
    const email = req.body.email;
    const admin = await Admin.findOne({ email });
    if (admin) {
      const match = await bcrypt.compare(req.body.password, admin.password);
      if (match) {
        admin.password = undefined;

        const token = jwt.sign(
          {
            data: admin._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        return res
          .cookie("admin_token", token, { httpOnly: true })
          .status(200)
          .json({ success: true, admin });
      } else {
        return res.json({ success: false });
      }
    } else {
      return res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
  }
}

const allUsers = async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);
        return res.status(200).json({ success: true, users });
    } catch (error) {
        console.log(error);
    }
}

const adminController = {
  login,
  allUsers
};

export default adminController;
