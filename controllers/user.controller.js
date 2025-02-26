const { v4: uuidv4 } = require("uuid");
const User = require("../model/users.model.js");
const { setUser } = require("../service/auth.service.js");

const handleUserSignup = async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((fields) => fields.trim() === "")) {
    return res.status(200).json({ message: "enter all the field" });
  }

  await User.create({
    name,
    email,
    password,
  });

  return res.redirect("/");
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const userInfo = await User.findOne({ email });
  console.log(userInfo)
  if (!userInfo)
    return res.render("login", { error: "User is not registered" });

  const sessionId = uuidv4();
  setUser(sessionId, userInfo);
  res.cookie("uid", sessionId);
  return res.redirect("/");
};

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
