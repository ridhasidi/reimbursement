const { Reimbursement, User } = require("../models");

// check UserId of each Reimbursement
async function authorization(req, res, next) {
  try {
    const UserId = req.currentUser.id;
    const { id } = req.params;
    const user = await User.findByPk(UserId);
    const data = await Reimbursement.findByPk(id);
    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }
    if (!data) {
      throw new Error("DATA_NOT_FOUND");
    }
    if (user.role !== "admin") {
      if (data.UserId !== UserId) {
        throw new Error("NOT_ENOUGH_PERMISSION");
      }
    }
    next();
  } catch (error) {
    next(error);
  }
}

// check id in params vs currentUser
async function userAuthorization(req, res, next) {
  try {
    const UserId = req.currentUser.id;
    const { id } = req.params;
    if (+id !== UserId) {
      throw new Error("NOT_ENOUGH_PERMISSION");
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authorization,
  userAuthorization,
};
