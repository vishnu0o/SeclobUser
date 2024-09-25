import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import registratedUser from "../database/registratedUser.js";
import generateToken from "../utils/generateToken.js";

// @desc    register
// @route   post /api/auth/register
// @access  user

export const registrationController = asyncHandler(async (req, res) => {
  try {
    let { name, email, password } = req.body;
    const isUserExist = await registratedUser.findOne({
      email: email
    });
    if (!isUserExist) {
      password = await bcrypt.hash(password, 10);
      const createUser = await registratedUser.create({
        name: name,
        email: email,
        password: password
      });
      let token = generateToken(createUser._id);
      res.status(200).json({
        message: "Registrated successfully",
        token,
        name: createUser.email,
        UserId: createUser._id
      });
    } else {
      res.status(400).json({
        message: "Email is already exist",
        status: false
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", data: error });
  }
});

// @route   post /api/auth/login
// @access  user

export const loginController = asyncHandler(async (req, res) => {
  try {
    let { email, password } = req.body;
    const isUserExist = await registratedUser.findOne({
      email: email
    });
    if (isUserExist) {
      bcrypt
        .compare(password, isUserExist.password)
        .then((isMatch) => {
          if (isMatch) {
            let token = generateToken(isUserExist._id);
            res.status(201).json({
              token,
              name: isUserExist.email,
              UserId: isUserExist._id,
              message: "Login successfully"
            });
          } else {
            res
              .status(400)
              .json({ message: "Password is incorrect", status: false });
          }
        })
        .catch((err) => {
          res.status(500).send("Error occurred while comparing passwords");
        });
    } else {
      res.status(400).json({
        message: "User not exist",
        status: false
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", data: error });
  }
});
