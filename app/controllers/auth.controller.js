import db from "../models";
import config from "../config/auth.config";
const User = db.user;

const Op = db.Sequelize.Op;

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const signup = (req, res) => {
  if (!req.body.email) {
    return res.status(400).send({ message: "Email is required!" });
  }
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (user) {
        return res.status(401).send({
          message: "User with the same email already exists.",
        });
      }

      // Save User to Database
      User.create({
        email: req.body.email,
        username: req.body.username,
        img: req.body.img,
        password: bcrypt.hashSync(req.body.password, 10),
      })
        .then((user) => {
          res.send({
            message: "User registered successfully!",
          });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const login = (req, res) => {
  if (!req.body.email)
    return res.status(400).send({ message: "Email is required!" });

  if (!req.body.password)
    return res.status(400).send({ message: "Password is required!" });

  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not Found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret);

      let resp = {
        id: user.id,
        email: user.email,
        username: user.username,
        img: user.img,
      };

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .send(resp);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out");
};

export { login, signup, logout };
