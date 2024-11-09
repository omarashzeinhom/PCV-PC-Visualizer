import User from '../models/user.model';
import { Request, Response } from 'express';

// Function to get a user's details along with their builds
export const getUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id).populate('builds');
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (error: unknown) {
      // Assert that error is an instance of Error
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        // Handle unexpected errors
        res.status(400).json({ message: 'An unexpected error occurred' });
      }
    }
};
