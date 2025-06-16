import jwt from 'jsonwebtoken';
import dotenv from "dotenv"

dotenv.config()

const secret_key = process.env.TOKEN_SECRET;

export const generateAccessToken = (user) => {
    if (!secret_key) {
        throw new Error('TOKEN_SECRET environment variable is not set');
    }
    try {
        return jwt.sign(user, secret_key, {  expiresIn: "86400s" });
    } catch (error) {
        console.error('Error generating access token:', error);
        throw error;
    }
};

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Get token after "Bearer"

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing or invalid." });
  }

  // Verify the token using HS256 algorithm
  jwt.verify(
    token,
    secret_key,
    (err, decoded) => {
      if (err) {
        // Provide specific error messages
        if (err.name === "TokenExpiredError") {
          return res.status(403).json({ message: "Token has expired." });
        } else if (err.name === "JsonWebTokenError") {
          return res.status(403).json({ message: "Invalid token." });
        } else {
          return res.status(403).json({ message: "Token verification failed." });
        }
      }

      // Attach the decoded token payload to the request object
      req.user = decoded;

      // Proceed to the next middleware or route handler
      next();
    }
  );} 