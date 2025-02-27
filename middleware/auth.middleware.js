const { getUser } = require("../service/auth.service.js");

const checkloggedInUser = async (req, res, next) => {
    console.log(req.cookies, "Cookies in request")
  const userUid = req.cookies.uid;

  if (!userUid) return res.redirect("/login");

  const user = await getUser(userUid);

  if (!user) return res.redirect("/login");

  req.user = user;

  next();
};

const checkAuth = async (req, res, next) => {
  const userUid = req.cookies.uid;

  const user = await getUser(userUid);

  console.log(userUid, "User UID from cookie");
console.log(user, "User object fetched from getUser");


  req.user = user;

  next();
};

module.exports = { checkloggedInUser, checkAuth };
