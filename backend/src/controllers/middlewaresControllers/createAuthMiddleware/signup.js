const Joi = require('joi');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const signup = async (req, res, { userModel }) => {
  const UserPasswordModel = mongoose.model(userModel + 'Password');
  const UserModel = mongoose.model(userModel);

  const { email, password, reEnterPassword, name } = req.body;

  // 1. Validate inputs
  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().min(6).required(),
    reEnterPassword: Joi.string().valid(Joi.ref('password')).required().messages({
      'any.only': 'Passwords do not match.',
    }),
  });
  const { error } = schema.validate({ email, name, password, reEnterPassword });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  // 2. Check if email is already registered
  const existingUser = await UserModel.findOne({ email, removed: false });
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: 'Email is already registered.',
    });
  }

  // 3. Create and save user
  const newUser = new UserModel({
    email,
    name,
    enabled: true
  });
  // Add any default values if needed
  await newUser.save();

  const salt = uuidv4();

  const hashedPassword = await bcrypt.hash(salt + password, 10);
  
  
  const newPasswordEntry = new UserPasswordModel({
    user: newUser._id,
    password: hashedPassword,
    salt: salt, // <- ADD this
  });
  await newPasswordEntry.save();
  

  return res.status(201).json({
    success: true,
    message: 'User registered successfully.',
  });
 
};

module.exports = signup;
