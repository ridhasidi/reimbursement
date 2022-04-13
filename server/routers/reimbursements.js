const express = require("express");
const router = express.Router();
const Controller = require("../controllers/reimbursementController");

router.get(
  "/",
  // authz,
  Controller.getAll
);
// router.get("/reimbursements", authz, Controller.getAll);
router.post("/", Controller.create);
router.patch("/:id", Controller.updateStatus);

module.exports = router;
