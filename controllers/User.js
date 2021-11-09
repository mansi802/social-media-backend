const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("./../util/validate");

const register = async (req, res) => {
  try {
    let { name, email, password, confirmPassword } = req.body;

    const { errors, valid } = validateRegisterInput(
      name,
      email,
      password,
      confirmPassword
    );

    (!valid) && res.status(500).json(errors);
    

    const user = await User.findOne({ email });
    
    user && res.status(500).json({message:"User already exist"});

    password = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save();
    return res.status(200).json(newUser);
  } catch ({ message }) {
    return res.status(404).json({ message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const { valid, errors } = validateLoginInput(email, password);

  try {
    if (!valid) return res.status(500).json(errors);

    const user = await User.findOne({ email });

    if (!user) {
      res.status(500).json({message:"User does not exist"});
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) res.status(500).json({message:"Password does not match"});

    return res.status(201).json(user);
  } catch ({ message }) {
    return res.status(404).json({ message });
  }
};


module.exports = { login, register };
