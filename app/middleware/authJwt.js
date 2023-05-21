import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";
import { handleClientError } from "../helper";

const verifyToken = (req, res, next) => {
  // Skip authentication for test environment
  if (process.env.NODE_ENV === "test") {
    //check if the blog id is 1 (the test blog to test unauthorized access)
    if (req.params.id != 1) {
      req.userId = null;
      return next();
    }
  }

  const token = req.cookies.access_token;
  if (!token) return handleClientError(res, "Not authenticated", 401);

  jwt.verify(token, config.secret, (err, userInfo) => {
    if (err) return handleClientError(res, "Not a valid token", 403);

    req.userId = userInfo.id;

    next();
  });
};

const authJwt = {
  verifyToken: verifyToken,
};

export default authJwt;
