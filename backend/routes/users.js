const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

const {
  createUser,
  createAddress,
  createAccount,
} = require("../controllers/userController");
// const authenticate = require("../middleware/auth");

// login

router.post("/register", createUser);
router.post("/address", createAddress);
router.post("/account", createAccount);



// verify user
router.get("/verify",  (req, res) => {
  res.status(200).json({ success: true, message: "verified", user: req.user });
});

module.exports = router;
