const sha1 = require('sha1');

// POST /users should create a new user in DB
const postNew = async (req, res) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  // Check if email is missing
  if (!email) {
    return res.status(400).json({ error: 'Missing email' });
  }

  // Check if password is missing
  if (!password) {
    return res.status(400).json({ error: 'Missing password' });
  }

  // Check if email already exists in DB
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'Already exists' });
  }

  // Hash the password using SHA1
  const hashedPassword = sha1(password);

  // Create a new user object
  const newUser = new User({
    email,
    password: hashedPassword,
  });

  // Save the new user in the collection 'users'
  await newUser.save();

  // Return the new user with only the email and id
  return res.status(201).json({ email: newUser.email, id: newUser._id });
};

module.exports = {
  postNew,
};
