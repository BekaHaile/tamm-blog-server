import { handleResult, handleError, handleClientError } from "../helper";
import db from "../models";

const Blog = db.blog;
const User = db.user;

const getBlogs = (req, res) => {
  Blog.findAll({
    offset: req.query.offset,
    limit: req.query.limit,
    attributes: ["id", "title", "content", "img", "userId"],
    order: [["createdAt", "DESC"]],
  })
    .then((blogs) => {
      handleResult(res, blogs);
    })
    .catch((err) => handleError(res, err));
};

const getBlogById = (req, res) => {
  Blog.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then(async (blog) => {
      const user = await User.findOne({
        where: {
          id: blog.userId,
        },
      });

      const result = {
        id: blog.id,
        title: blog.title,
        content: blog.content,
        img: blog.img,
        date: blog.createdAt,
        author: user ? user.username : "Anonymous",
        userImg: user ? user.img : null,
      };
      handleResult(res, result);
    })
    .catch((err) => handleError(res, err));
};

const createBlog = (req, res) => {
  Blog.create({
    title: req.body.title,
    content: req.body.content,
    img: req.body.img,
    userId: req.userId,
  })
    .then((blog) => {
      const result = {
        id: blog.id,
        title: blog.title,
        content: blog.content,
        img: blog.img,
        date: blog.createdAt,
      };
      handleResult(res, result);
    })
    .catch((err) => handleError(res, err));
};

const updateBlog = (req, res) => {
  Blog.update(
    { title: req.body.title, content: req.body.content, img: req.body.img },
    { where: { id: req.params.id } }
  )
    .then((result) => {
      Blog.findOne({
        where: {
          id: req.params.id,
        },
      })
        .then(async (blog) => {
          const result = {
            id: blog.id,
            title: blog.title,
            content: blog.content,
            img: blog.img,
            date: blog.createdAt,
          };
          handleResult(res, result);
        })
        .catch((err) => handleError(res, err));
    })
    .catch((err) => handleClientError(res, "Invalid ID", 404));
};

const deleteBlog = (req, res) => {
  Blog.destroy({ where: { id: req.params.id, userId: req.userId } })
    .then((result) => handleResult(res, result.toString()))
    .catch((err) => handleError(res, err));
};

const upload = (req, res) => {
  res.status(200).send(req.file.filename);
};

export { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog, upload };
