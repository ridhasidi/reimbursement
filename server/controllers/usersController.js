const { User } = require("../models/index");
class Controller {
  static async getByUserId(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findOne({
        where: { id },
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      });
      if (!user) {
        throw new Error("USER_NOT_FOUND");
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async updateByUserId(req, res, next) {
    try {
      const { id } = req.params;
      const { name, bankAccount } = req.body;
      const user = await User.update(
        { name, bankAccount },
        {
          where: {
            id: id,
          },
          returning: true,
        }
      );
      res.status(200).json({
        message: `data of ${user[1][0].name} have been successfully updated`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
