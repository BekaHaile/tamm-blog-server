import db from "./models";
const User = db.user;
const Blog = db.blog;
import bcrypt from "bcryptjs";

export function initial() {
  User.create({
    email: "author@aautimes.com",
    username: "John Doe",
    password: bcrypt.hashSync("12345678", 10),
    img: "https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-11640168385tqosatnrny.png?v=2023050603",
  }).then((user) => {
    Blog.create({
      id: "1",
      title: "Placeholder Post 1",
      content: "This is a placeholder description for post 1",
      img: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      userId: user.id,
    });
  });
}
