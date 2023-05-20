import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";
import { handleClientError } from "../helper";

const verifyToken = (req, res, next) => {
  let token = req.header("authorization");
  if (!token) {
    return handleClientError(res, "No token provided!", 403);
  }
  token = token.split(" ");
  if (token.length <= 1) {
    return handleClientError(res, "Invalid Token!", 403);
  }
  token = token[1];

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return handleClientError(res, "Unauthorized!", 401);
    }
    req.userId = decoded.id;
    req.userGrade = decoded.grade;
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken,
};
export default authJwt;
