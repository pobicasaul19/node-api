const bcrypt = require('bcrypt');
const { server } = require('../app');
const User = require('../models/users');
const ErrorHandler = require('../utils/validation.handler')

const USER_ROUTE = '/api/users';

server.get(USER_ROUTE, async function (req, res) {
  try {
    const users = await User.find().select('-password').lean();
    res.send(200, {
      data: users,
      message: 'Users data'
    })
  } catch (error) {
    console.error(error)
    res.send(500, { message: 'Failed to fetch users' })
  }
});


// Create a new user
server.post(`${USER_ROUTE}`, async function create(req, res) {
  try {
    const { name, username, password, role } = req.body;

    const foundUser = await User.findOne({ username });
    if (foundUser) {
      return res.send(409, { message: 'User already exists.' })
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      role,
      username,
      password: hashedPassword,
    });
    await newUser.save();
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    res.send(201, {
      message: 'User created successfully',
      data: userWithoutPassword
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Handle validation errors
      ErrorHandler(error, res);
    }
    // Fallback for other errors
    res.send(500, { error: error.message });
  }
});

// Update an existing user
server.put(`${USER_ROUTE}/:userId`, async function update(req, res) {
  try {
    const { userId } = req.params;
    const { name, username, password, role } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.send(404, { error: 'User not found' });
    }

    // Update user fields
    user.name = name;
    user.username = username;
    user.role = role;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    const updatedUser = user.toObject();

    return res.send(200, {
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Handle validation errors
      ErrorHandler(error, res);
    }
    // Fallback for other errors
    return res.send(500, { error: 'Failed to update user' });
  }
});