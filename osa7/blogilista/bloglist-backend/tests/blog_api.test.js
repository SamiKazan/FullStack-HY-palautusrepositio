const { test, after, beforeEach, describe } = require("node:test");
const assert = require("assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");

const helper = require("./test_helper");

const User = require("../models/users");

const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "aaaa",
    author: "harri",
    url: "/123",
    likes: 1,
  },
  {
    title: "bbbb",
    author: "sanni",
    url: "/124",
    likes: 2,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("Correct amount of blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, initialBlogs.length);
});

test("Blog has valid id field", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body[0]._id, undefined);
});

test("Blog can be added", async () => {
  const newBlog = {
    title: "cccc",
    author: "kissa",
    url: "/0101",
    likes: 1,
  };

  const response = await api.get("/api/blogs");
  const blogCount = response.body.length;

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response2 = await api.get("/api/blogs");

  assert.strictEqual(response2.body.length, blogCount + 1);
});

test("Blog without likes field defaults to 0", async () => {
  const newBlog = {
    title: "ddd",
    author: "koira",
    url: "/1111",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, 0);
});

test("Blog without title and url is not added", async () => {
  const newBlog = {
    author: "kissa",
    likes: 1,
  };

  const response = await api.post("/api/blogs").send(newBlog).expect(400);
});

test("Blog can be deleted", async () => {
  const response = await api.get("/api/blogs");
  const blogToDelete = response.body[0];

  console.log(blogToDelete.id, "asdasdad");

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const response2 = await api.get("/api/blogs");
  assert.strictEqual(response2.body.length, response.body.length - 1);
});

test("Blog can be updated", async () => {
  const response = await api.get("/api/blogs");
  const blogToUpdate = response.body[0];

  const updatedBlog = {
    ...blogToUpdate,
    likes: blogToUpdate.likes + 1,
  };

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(200);

  const response2 = await api.get("/api/blogs");
  assert.strictEqual(blogToUpdate.likes + 1, response2.body[0].likes);
});

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });
});
test.only("creation succeeds with a fresh username", async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: "koira",
    name: "aaaaa",
    password: "salasana",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await helper.usersInDb();
  assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

  const usernames = usersAtEnd.map((u) => u.username);
  assert(usernames.includes(newUser.username));
});

test.only("creation fails with proper statuscode and message if username already taken", async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: "koira",
    name: "asdasd",
    password: "salasana",
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await helper.usersInDb();
  assert(result.body.error.includes("expected `username` to be unique"));

  assert.strictEqual(usersAtEnd.length, usersAtStart.length);
});

after(async () => {
  await mongoose.connection.close();
});
