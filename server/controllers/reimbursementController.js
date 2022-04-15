const fs = require("fs"); // gain access to file system
const util = require("util");
const deleteFile = util.promisify(fs.unlink); // unlink will delete the file
const { cloudinary } = require("../config/cloudinary");
const { User, Reimbursement, Status } = require("../models/index");
class Controller {
  static async getAll(req, res, next) {
    try {
      const { id, role } = req.currentUser;
      let params = {
        order: [["dateOfPurchase", "ASC"]],
        attributes: {
          exclude: ["createdAt", "updatedAt", "UserId"],
        },
        include: [
          { model: User, attributes: ["name", "email"] },
          { model: Status, attributes: ["name"] },
        ],
      };
      if (role === "employee") {
        params.where = { UserId: id };
      }
      const data = await Reimbursement.findAll(params);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { path } = req.file;
      const resp = await cloudinary.uploader.upload(path);
      const { id } = req.currentUser;
      const fileUrl = resp.url;
      await deleteFile(path);
      const { dateOfPurchase, description, amount } = req.body;
      const newData = await Reimbursement.create({
        dateOfPurchase,
        description,
        amount,
        receipt: fileUrl,
        UserId: id,
        StatusId: 1,
      });
      res.status(201).json(newData);
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { StatusId } = req.body;
      const data = await Reimbursement.update(
        {
          StatusId: StatusId,
        },
        {
          where: {
            id,
          },
          returning: true,
        }
      );
      res.status(200).json({
        message: `Status of reimbursement with id ${data[1][0].id} has been updated`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      await Reimbursement.delete({
        where: id,
      });
      res.status(200).json({
        message: "data has been deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
