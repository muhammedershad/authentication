import Admin from "../models/admin.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

const login = async (req, res) => {
  try {
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
        return res.status(200).json({ success: true, users });
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if(!user) 
            return res.status(404).json({ success:false});
        else {
            await User.findByIdAndDelete(req.params.id)
            const users = await User.find()
            return res.status(200).json({ success: true, message: "User deleted!", users});
        }

    } catch (error) {
        console.log(error);
    }
}

const editUser = async (req, res) => {
  const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found', success: false });
    } else {
      if(req.body.username) {
        if(req.body.username.trim().length > 0){
          user.username = req.body.username
        } else {
          return res.status(400).json({ message: 'Username cannot be empty', success: false });
        }
      } else if (req.body.email){
        if(req.body.email.trim().length > 0){
          const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
          if (!emailRegex.test(req.body.email)){
            return res.status(400).json({ message: 'Invalid email', success: false });
          } else {
            user.email = req.body.email
          }
        } else {
          return res.status(400).json({ message: 'Email cannot be empty', success: false });
        }
      } if (req.body.password){
        if(req.body.password.trim().length < 6) {
          return res.status(400).json({ message: 'Password must be at least 6 characters long', success: false });
        } else {
          const hashPass = bcrypt.hashSync(req.body.password,10)
          user.password = hashPass
        }
      }

      await user.save();
      user.password = undefined
      return res.status(200).json({ message: 'User updated successfully', success: true, user });
    }
}

const logout = async (req, res) => {
    res.clearCookie('admin_token');
    return res.status(200).json({ success: true, message: "Logged out!" });
}

const adminController = {
  login,
  allUsers,
  deleteUser,
  logout,
  editUser
};

export default adminController;
