const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/users");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  const rounds = 10;
  const passwordHash = await bcrypt.hash(password, rounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  if (!username || !password) {
    return response.status(400).json({ error: "username or password missing" });
  }
  if (username.length < 3 || password.length < 3) {
    return response
      .status(400)
      .json({ error: "username or password must be atleast 3 characters" });
  }
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({ error: "username must be unique" });
  }

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");

  response.json(users);
});

module.exports = usersRouter;
