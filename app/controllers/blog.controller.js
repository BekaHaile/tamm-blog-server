import { handleResult, handleError } from "../helper";
import db from "../models";
const Blog = db.blog;

const getBlogs = (req, res) => {
  Blog.findAll({
    offset: req.query.offset,
    limit: req.query.limit,
    attributes: ["id", "title", "content", "img", "date", "userId"],
  })
    .then((blogs) => {
      handleResult(res, blogs, "Blogs fetched successfully!");
    })
    .catch((err) => handleError(res, err));
};

const getBlogById = (req, res) => {
  Blog.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((blog) => {
      handleResult(res, blog, "Blog fetched successfully!");
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
      handleResult(res, blog, "Blog created successfully!");
    })
    .catch((err) => handleError(res, err));
};

const updateBlog = (req, res) => {
  Blog.update(
    { title: req.body.title, content: req.body.content, img: req.body.img },
    { where: { _id: req.params.id } }
  )
    .then((result) => handleResult(res, result, "Blog updated successfully!"))
    .catch((err) => handleError(res, err));
};

const deleteBlog = (req, res) => {
  Blog.update({ where: { id: req.params.id } })
    .then((result) => handleResult(res, result, "Blog Deleted successfully!"))
    .catch((err) => handleError(res, err));
};

export { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
