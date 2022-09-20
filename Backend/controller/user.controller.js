const userModel = require("../models/user.model");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @author - Ankit Maurya
 * @Date - 19/09/2022
 * @Description - create a new user Api
 */

const addNewUser = async (req, res) => {
  const Schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  let validSchema = Schema.validate(req.body);
  if (validSchema.error) {
    return res.status(400).send({
      message: "Bad request" || validSchema.error.message,
      code: 400,
    });
  } else {
    validSchema = validSchema.value;
  }
  try {
    console.log(req.body);
    const userResponse = await userModel.findOne({ email: validSchema.email });
    if (userResponse) {
      return res.status(409).send({
        message: "User already exists",
        code: 409,
      });
    } else {
      validSchema["password"] = bcrypt.hashSync(validSchema.password, 10);
      const result = await userModel.create(validSchema);
      return res.status(201).send({ messagge: "user created", code: 201 });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Internal Server Error" || err.message, code: 500 });
  }
};

/**
 * @author - Ankit Maurya
 * @Date - 19/09/2022
 * @Description - user login api
 */

const login = async (req, res) => {
  const Schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  let validSchema = Schema.validate(req.body);
  if (validSchema.error) {
    return res.status(400).send({
      message: "Bad request" || validSchema.error.message,
      code: 400,
    });
  } else {
    validSchema = validSchema.value;
  }
  try {
    const userResponse = await userModel.findOne({ email: validSchema.email });
    if (!userResponse) {
      return res.status(404).send({
        message: "Email or password Invalid",
        code: 404,
      });
    } else {
      const ispassword = bcrypt.compareSync(req.body.password,userResponse.password);
      const token = jwt.sign({ userResponse }, process.env.secretKey);
      if (ispassword) {
        return res.status(201).send({
          token: token,
          message: "user login successfully", 
          data: userResponse,
          code: 200,
        });
      } else {
        return res.status(404).send({
          message: "Email or password Invalid",
          code: 404,
        });
      }
    }
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Internal Server Error" || err.message, code: 500 });
  }
};

module.exports ={addNewUser, login}