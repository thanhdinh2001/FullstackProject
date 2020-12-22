const jwt = require("jsonwebtoken");
const user = require("../models/user");
const { User } = require("../models/user");

const SECRET_KEY = "MY_SECRET_KEY";

const generateToken = (username) => {
  return jwt.sign({ username }, SECRET_KEY, {
    expiresIn: 6000,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

const register = (username, password) => {
  const user = new User({
    username: username,
    points : 0,
  });
  user.generatePassword(password);
  return user.save();
};

const login = (username, password) => {
  return User.findOne({ username: username })
    .exec()
    .then((user) => {
      if (!user.isPasswordMatched(password)) {
        throw new Error("Password not matched");
      }
      return {
        user: user._doc,
        jwt: generateToken(username),
      };
    });
};

const changePoints = (username, points) => {
  return User.findOne({ username: username })
  .exec()
  .then((user) => {
    user.points = points;
    user.save();
    return user;
  });
};

const getUsers = () => {
  return User.find({})
      .exec()
      .then((users) => { return users.map((user) => user._doc) });
}

module.exports = { register, login, verifyToken, changePoints, getUsers };
