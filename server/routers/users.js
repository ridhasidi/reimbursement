const express = require("express");
const router = express.Router();
const Controller = require("../controllers/usersController");
const { userAuthorization } = require("../middlewares/authz");

router.get("/:id", userAuthorization, Controller.getByUserId);
router.patch("/:id", userAuthorization, Controller.updateByUserId);

module.exports = router;
