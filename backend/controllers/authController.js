import User from "../models/User.js"; // Pastikan path sesuai
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    // Membuat user baru
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    // Simpan user ke database
    await newUser.save();

    res.status(200).json({ success: true, message: "Successfully created" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create, try again" });
  }
};

export const login = async (req, res) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!checkCorrectPassword) {
      return res
        .status(401)
        .json({ success: false, message: "incorect Email or password" });
    }

    const { password, role, ...rest } = user._doc;

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expiresIn: token.expiresIn,
      })
      .status(200)
      .json({
        success: true,
        message: "succesfully login",
        token,
        data: { ...rest },
        role,
      });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: err.message });
  }
};
