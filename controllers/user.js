const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.render("signup", {
        error: "All fields are required",
      });
    }

    await User.create({
      name,
      email,
      password,
    });

    return res.redirect("/login");
  } catch (err) {
    console.error(err);
    return res.render("signup", {
      error: "Something went wrong",
    });
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.render("login", {
        error: "Invalid Email or Password",
      });
    }

    const sessionId = uuidv4();
    setUser(sessionId, user);

    res.cookie("uid", sessionId);
    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.render("login", {
      error: "Something went wrong",
    });
  }
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};