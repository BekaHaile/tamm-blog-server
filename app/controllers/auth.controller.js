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
      console.log(user);
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
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
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

export { login, signup };
