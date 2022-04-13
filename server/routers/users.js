const express = require("express");
const router = express.Router();
const Controller = require("../controllers/usersController");

router.get(
  "/:id",
  // authz,
  Controller.getByUserId
);
router.patch(
  "/:id",
  // authz,
  Controller.updateByUserId
);

module.exports = router;
