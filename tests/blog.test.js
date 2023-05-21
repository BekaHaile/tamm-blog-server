const request = require("supertest");
import db from "../app/models";

const Blog = db.blog;

let server;

//Tests for the blog API
describe("/api/blogs", () => {
  beforeEach(async () => {
    server = require("../app/server");

    // Wait for the Sequelize initialization to complete
    await db.sequelize.sync();
  });
  afterEach(async () => {
    server.close();
  });

  //Test for getting all blogs
  describe("GET /", () => {
    it("should return all blogs", async () => {
      // Save a blog to the test database
      await Blog.create({
        title: "Test Blog",
        content: "Test Content",
        img: "Test Image",
      });

      const res = await request(server).get("/api/blogs/");
      expect(res.status).toBe(200);

      //check the length of the response array to make sure it's greater than 0
      expect(res.body.length).toBeGreaterThan(0);

      // Clean up
      await Blog.destroy({
        where: {
          title: "Test Blog",
        },
      });
    });
  });

  //Test for getting a blog by id
  describe("GET /:id", () => {
    it("should return a blog if valid id is passed", async () => {
      // Save a blog to the database
      const blog = await Blog.create({
        title: "Test Blog",
        content: "Test Content",
        img: "Test Image",
      });

      // Pass the blog's id to the GET /api/blogs/:id route
      const res = await request(server).get("/api/blogs/" + blog.id);

      expect(res.status).toBe(200);

      // Check if the blog's details are returned
      expect(res.body).toHaveProperty("id", blog.id);

      // Clean up
      await Blog.destroy({
        where: {
          id: blog.id,
        },
      });
    });
  });

  //Test for the create method
  describe("POST /", () => {
    it("should create a new blog", async () => {
      // Pass a blog object to the POST /api/blogs route
      const res = await request(server).post("/api/blogs/").send({
        title: "Test Blog",
        content: "Test Content",
        img: "Test Image",
      });

      expect(res.status).toBe(200);

      // Check if the blog has been saved to the database
      expect(res.body).toHaveProperty("id");

      // Clean up
      await Blog.destroy({
        where: {
          id: res.body.id, // Access the created blog's id from the response body
        },
      });
    });
  });

  //Test for the update method
  describe("PUT /:id", () => {
    it("should return 401 if client is not logged in", async () => {
      // Pass an updated blog object to the PUT /api/blogs/:id route
      const res = await request(server).put("/api/blogs/1").send({
        title: "Updated Test Blog",
        content: "Updated Test Content",
        img: "Updated Test Image",
      });

      expect(res.status).toBe(401);
    });

    it("should update an existing blog", async () => {
      // Set a pass_token header to skip authentication
      const blog = await request(server)
        .post("/api/blogs/")
        .set("pass_token", "testsss")
        .send({
          title: "Test Blog",
          content: "Test Content",
          img: "Test Image",
        });

      // Pass an updated blog object to the PUT /api/blogs/:id route
      const res = await request(server)
        .put("/api/blogs/" + blog.body.id)
        .send({
          title: "Updated Test Blog",
          content: "Updated Test Content",
          img: "Updated Test Image",
        });

      expect(res.status).toBe(200);

      // Check if the blog has been updated in the database
      expect(res.body).toHaveProperty("title", "Updated Test Blog");

      // Clean up
      await Blog.destroy({
        where: {
          id: res.body.id,
        },
      });
    });

    // it("should return 404 if invalid id is passed", async () => {
    //   // Pass an invalid blog id to the PUT /api/blogs/:id route
    //   const res = await request(server).put("/api/blogs/999999").send({
    //     title: "Updated Test Blog",
    //     content: "Updated Test Content",
    //     img: "Updated Test Image",
    //   });

    //   expect(res.status).toBe(404);
    // });
  });

  //Test for the delete method
  describe("DELETE /:id", () => {
    it("should return 401 if client is not logged in", async () => {
      // Pass an invalid blog id to the DELETE /api/blogs/:id route
      const res = await request(server).delete("/api/blogs/1");

      expect(res.status).toBe(401);
    });

    it("should delete an existing blog", async () => {
      // Create a blog object which we will use to delete and check if it's deleted
      const blog = await request(server).post("/api/blogs/").send({
        title: "Test Blog",
        content: "Test Content",
        img: "Test Image",
      });

      // Pass the blog's id to the DELETE /api/blogs/:id route
      const res = await request(server).delete("/api/blogs/" + blog.body.id);

      expect(res.status).toBe(200);
    });
  });

  //Close the sequelize connection after all tests
  afterAll(async () => {
    await db.sequelize.close();
  });
});
