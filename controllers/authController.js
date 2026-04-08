const User = require('../models/User')

const bcrypt = require('bcryptjs')

/**
 * @dec Register a new user
 * @route POST /api/auth/register
 * @access Public
 */

const registerUser = async (req,res)=>{
   try{
     // 1. Get user data from request body
    const { name, email, password } = req.body;

    // 2. Basic Validation: Check if all fields are present
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide name, email, and password' });
    }

    // 3. Check if user already exists
    // We search for a user with the same email address.
    const existingUser = await User.findOne({ email });

     // If a user with this email is found, we return an error.
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'A user with this email already exists' });
    }

        // 4. Hash the password
    // Generate a 'salt' - a random string to add to the password before hashing.
    // This ensures that two identical passwords will have different hashes.
    // The number 10 represents the 'salt rounds' - how much processing power is used.
    // Higher is more secure but slower. 10 is a good standard.
    const salt = await bcrypt.genSalt(10);
    
    // Now, hash the user's password using the generated salt.
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Create and save the new user to the database
    // We create a new user instance, but crucially, we store the 'hashedPassword',
    // not the original plain-text password.
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    
    // 6. Send a success response
    // We send a 201 'Created' status code.
    // It's a best practice to not send the password back, even the hashed one.
    res.status(201).json({
      success: true,
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });


   }
   catch(err){
     // Handle any other server-side errors
    console.error('Registration Error:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
   }
} 

/**
 * @desc    Authenticate a user and get a token
 * @route   POST /api/auth/login
 * @access  Public
 */

const loginUser = async(req,res)=>{
   res.status(200).json({ success: true, message: 'Login Controller is connected!' });
}

module.exports = {
  registerUser,
  loginUser,
};