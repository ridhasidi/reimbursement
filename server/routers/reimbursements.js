const express = require("express");
const router = express.Router();
const Controller = require("../controllers/reimbursementController");
const { authorization } = require("../middlewares/authz");
const upload = require("../middlewares/upload");

router.get("/", Controller.getAll);
router.post("/", upload.single("receipt"), Controller.create);
router.patch("/:id", authorization, Controller.updateStatus);
router.delete("/:id", authorization, Controller.delete);

module.exports = router;
