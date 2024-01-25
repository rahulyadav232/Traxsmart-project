const User = require("../models/Users");

const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { failureResponse, successResponse } = require ("./utils");
const { default: mongoose } = require("mongoose");
var nodemailer = require("nodemailer");

const saltRounds = 10;

const secret = "Rahul";

const createUser = async (req, res) => {
  try {
    const { fullname, email, dateOfBirth } = req.body;
    console.log({ fullname, email, dateOfBirth });

    // const hashPassword = await bcrypt.hash(password, saltRounds);

    if (!fullname || !email || !dateOfBirth) {
      throw new Error("Fields must not be empty");
    }

    // Check if the user with the provided email exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("User already exists");
    }

    // if (password !== confirmPassword) {

    //   throw new Error("Password and confirm password do not match")
    // }

    // const encryptedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user using the User model
    await User.create({
      fullname,
      email,
      dateOfBirth,
    });

    // // Create a JWT token
    // const token = jwt.sign({ userId: newUser._id }, 'yourSecretKey', { expiresIn: '1h' });

    // // Send the token in the response
    // res.status(201).json({ status: "ok", message: "User created successfully", token });

    res
      .status(201)
      .json({ status: "ok", message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const createAddress = async (req, res) => {
  try {
    const { street, city, state, zipcode } = req.body;
    console.log({ street, city, state, zipcode });

    if (!street || !city || !state || !zipcode) {
      throw new Error("Fields must not be empty");
    }

    const existingUser = await User.findOne({ state });

    if (existingUser) {
      throw new Error("User already exists");
    }

    // Create a new user using the User model
    await User.create({
      street: "",
      city: "",
      state: "",
      zipcode: "",
    });

    res
      .status(201)
      .json({ status: "ok", message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const createAccount = async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;
    console.log({username, password, confirmPassword });

    if (!username || !password || !confirmPassword) {
      throw new Error("Fields must not be empty");
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      throw new Error("User already exists");
    }

    // Create a new user using the User model
    await User.create({
      username: "",
      password: "",
      confirmPassword: "",
    });

    res
      .status(201)
      .json({ status: "ok", message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = {
  createUser,
  createAddress,
  createAccount,
};
