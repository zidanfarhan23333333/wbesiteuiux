import jwt from "jsonwebtoken";

// middleware to verify token
const verifyToken = (req, res, next) => {
  // Ambil token dari cookies atau header Authorization
  const token =
    req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

  // Cek apakah token ada
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  // Verifikasi token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Invalid token" });
    }

    // Set user ke request object
    req.user = user;

    // Lanjutkan ke middleware berikutnya
    next();
  });
};

export default verifyToken;
