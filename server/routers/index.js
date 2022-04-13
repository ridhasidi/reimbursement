const express = require("express");
const authRouters = require("./auth");
const reimbursementsRouters = require("./reimbursements");
const usersRouters = require("./users");
// const { authentification } = require("../middlewares/authn");
const router = express.Router();

router.use("/", authRouters);
// router.use(authentification);
router.use("/users", usersRouters);
router.use("/reimbursements", reimbursementsRouters);

module.exports = router;
