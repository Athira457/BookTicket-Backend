// userConroller
const bcrypt = require('bcrypt');
const User = require('../Models/userSchema');

//signup page working
const signUp = async (req, res) => {
  const { uname, email, password, phone, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    user = new User({ uname, email, password, phone, role });
    await user.save();

    return res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

//login page working
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    return res.status(200).json({ success: true, message: 'Login successful', role: user.role });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { signUp, login };
