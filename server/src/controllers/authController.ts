import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  // Generate a salt and hash the password with bcrypt
  // '10' is the salt rounds, which is a good practice for security
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
  });

  try {
    // Save the new user in the database
    await newUser.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
};

export const login = async (req: Request, res: Response) => {
  console.log('Inside login controller'); // Check if this logs

  const { username, password } = req.body;

  // Find user by username
  const user: IUser | null = await User.findOne({ username });

  if (user) {
    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // Create a JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
      res.json({ token });
    } else {
      // Password does not match
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    // User not found
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
