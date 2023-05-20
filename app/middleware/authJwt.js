import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";
import { handleClientError } from "../helper";

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token);
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
