import { handleResult, handleError } from "../helper";
import db from "../models";
const Blog = db.blog;
const User = db.user;

const getBlogs = (req, res) => {
  Blog.findAll({
    offset: req.query.offset,
    limit: req.query.limit,
    attributes: ["id", "title", "content", "img", "userId"],
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
        author: user.username,
        userImg: user.img,
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
  })
    .then((blog) => {
      handleResult(res, blog);
    })
    .catch((err) => handleError(res, err));
};

const updateBlog = (req, res) => {
  Blog.update(
    { title: req.body.title, content: req.body.content, img: req.body.img },
    { where: { _id: req.params.id } }
  )
    .then((result) => handleResult(res, result))
    .catch((err) => handleError(res, err));
};

const deleteBlog = (req, res) => {
  Blog.update({ where: { id: req.params.id } })
    .then((result) => handleResult(res, result))
    .catch((err) => handleError(res, err));
};

export { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
