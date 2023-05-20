import db from "./models";
const User = db.user;
const Blog = db.blog;
import bcrypt from "bcryptjs";

export function initial() {
  //check if a user exists or not and if it doesn't, create a placeholder data
  User.findOne().then((user) => {
    if (!user) {
      User.create({
        email: "author@aautimes.com",
        username: "John Doe",
        password: bcrypt.hashSync("12345678", 10),
        img: "https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-11640168385tqosatnrny.png?v=2023050603",
      })
        .then((createdUser) => {
          Blog.create({
            title: "Placeholder Post",
            content: "This is a placeholder description for the post",
            img: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
            userId: createdUser.id,
          })
            .then(() => {
              console.log(
                "Placeholder user and blog post created successfully."
              );
            })
            .catch((error) => {
              console.error("Error creating placeholder blog post:", error);
            });
        })
        .catch((error) => {
          console.error("Error creating placeholder user:", error);
        });
    }
  });
}
