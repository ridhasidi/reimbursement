"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reimbursement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reimbursement.init(
    {
      dateOfPurchase: {
        allowNull: false,
        type: DataTypes.DATE,
        validate: {
          notNull: {
            msg: "Date is required",
          },
          notEmpty: {
            msg: "Date is required",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description is required",
          },
          notEmpty: {
            msg: "Description is required",
          },
        },
      },
      amount: DataTypes.INTEGER,
      receipt: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Receipt is required",
          },
          notEmpty: {
            msg: "Receipt is required",
          },
        },
      },
      UserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
      },
      StatusId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: Status,
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Reimbursement",
    }
  );
  return Reimbursement;
};
