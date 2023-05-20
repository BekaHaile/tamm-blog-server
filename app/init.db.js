import db from "./models";
const User = db.user;
import bcrypt from "bcryptjs";

export function initial() {
  User.create({
    email: "author@aautimes.com",
    username: "John Doe",
    password: bcrypt.hashSync("12345678", 8),
  });
}
