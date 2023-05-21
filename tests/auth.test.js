const request = require("supertest");
import db from "../app/models";

const User = db.user;

let server;

//Tests for the auth API
describe("/api/auth", () => {
  beforeEach(async () => {
    server = require("../app/server");

    // Wait for the Sequelize initialization to complete
    await db.sequelize.sync();
  });
  afterEach(async () => {
    server.close();
  });

  //Test for registering a user
  describe("POST /signup", () => {
    it("should register a user if valid data is passed", async () => {
      const res = await request(server).post("/api/auth/signup").send({
        email: "test@gmail.com",
        username: "test",
        img: "test",
        password: "123456",
      });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("User registered successfully!");

      // Clean up
      await User.destroy({
        where: {
          email: "test@gmail.com",
        },
      });
    });

    it("should return 400 if email is not passed", async () => {
      const res = await request(server).post("/api/auth/signup").send({
        username: "test",
        img: "test",
      });

      expect(res.status).toBe(400);

      expect(res.body.message).toBe("Email is required!");
    });

    it("should return 401 if user with the same email already exists", async () => {
      // Save a user to the database
      const user = await User.create({
        email: "test@gmail.com",
        username: "test",
        img: "test",
      });

      const res = await request(server).post("/api/auth/signup").send({
        email: "test@gmail.com",
      });

      expect(res.status).toBe(401);

      expect(res.body.message).toBe("User with the same email already exists.");

      // Clean up
      await User.destroy({
        where: {
          email: "test@gmail.com",
        },
      });
    });
  });

  //Close the sequelize connection after all tests
  afterAll(async () => {
    await db.sequelize.close();
  });
});
