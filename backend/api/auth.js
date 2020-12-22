const router = require("express").Router();
const { User } = require("../models/user");
const { register, login, verifyToken, changePoints,getUsers } = require("../services/auth");

router.post("/register", (req, res) => {
  register(req.body.username, req.body.password)
    .then((createdUser) => {
      res.json(createdUser);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  login(username, password)
    .then((user) => res.json(user))
    .catch((err) => {
      console.log(err);
      res.status(401).json({ error: err.message });
    });
});

router.get("/me", (req, res) => {
  if (!req.headers.authorization) {
    res.status(401).send("Token not found");
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedObj = verifyToken(token);
    const username = decodedObj.username;
    User.findOne({ username: username })
      .exec()
      .then((user) => {
        res.json(user._doc);
      })
      .catch(() => {
        res.status(404).send("User not found");
      });
  } catch {
    res.status(401).send("Invalid token");
  }
});

router.put("/points", (req, res) => {
  const { username, points } = req.body;
  changePoints(username, points).then((user) => res.json(user))
});

router.get("/getUsers", (req,res) => {
  getUsers().then((users) => res.json(users));
})

module.exports = router;
