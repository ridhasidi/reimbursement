const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { User } = require("../models/index");

class Controller {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw new Error("INVALID_USER_OR_PASSWORD");
      }
      if (!comparePassword(password, user.password)) {
        throw new Error("INVALID_USER_OR_PASSWORD");
      }
      const payload = {
        id: user.id,
        role: user.role,
      };
      const token = generateToken(payload);
      res.status(200).json({
        access_token: token,
        id: user.id,
        role: user.role,
      });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { name, email, password, bankAccount } = req.body;
      const newUser = await User.create({
        name,
        email,
        password,
        role: "employee",
        bankAccount,
      });
      res.status(201).json({
        message: `${newUser.name} has successfully created a new account`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
