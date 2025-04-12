const userService = require('../services/userService');

exports.register = async (req, res) => {
  try {
    const result = await userService.registerUser(req.body);
    res.status(201).json({
      status: 'success',
      token: result.token,
      data: {
        user: result.user
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);
    res.status(200).json({
      status: 'success',
      token: result.token,
      data: {
        user: result.user
      }
    });
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await userService.getCurrentUser(req.user.id);
    res.status(200).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers(req.query);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message
    });
  }
}; 