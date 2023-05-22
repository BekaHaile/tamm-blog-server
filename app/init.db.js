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
          Blog.bulkCreate([
            {
              title: "Placeholder Post",
              content: "This is a placeholder description for the post",
              img: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
              userId: createdUser.id,
            },
            {
              title: "Placeholder Post 1",
              content: "This is a placeholder description for post 1",
              img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJsb2d8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
              userId: createdUser.id,
            },
            {
              title: "Placeholder Post 2",
              content: "This is a placeholder content for post 2",
              img: "https://images.unsplash.com/photo-1513001900722-370f803f498d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJsb2d8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
              userId: createdUser.id,
            },
            {
              title: "Placeholder Post 3",
              content: "This is a placeholder content for post 3",
              img: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJsb2d8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
              userId: createdUser.id,
            },
            {
              title: "Placeholder Post 4",
              content: "This is a placeholder content for post 4",
              img: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJsb2d8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
              userId: createdUser.id,
            },
            {
              title: "Placeholder Post 5",
              content: "This is a placeholder content for post 5",
              img: "https://images.unsplash.com/photo-1546074177-ffdda98d214f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
              userId: createdUser.id,
            },
          ])
            .then(() => {
              console.log(
                "Placeholder user and blog posts created successfully."
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
