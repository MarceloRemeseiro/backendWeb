const express = require("express");
const router = express.Router();
const { checkCredentials } = require("../utils/auth");

router.get("/login", (req, res) => {
  res.render("login", { loginFailed: false });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const valid = await checkCredentials(username, password);
  if (valid) {
    req.session.loggedIn = true;
    req.session.username = username;
    res.redirect("/");
  } else {
    res.render("login", { loginFailed: true });
  }
});

module.exports = router;
