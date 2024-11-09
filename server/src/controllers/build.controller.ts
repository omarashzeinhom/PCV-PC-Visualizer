import { Build } from '../models/build.model';
import {User} from '../models/user.model';
import { Request, Response } from 'express';
import { Types } from 'mongoose'; // Importing Mongoose Types


// Function to add a build to a user
export const createBuild = async (req: Request, res: Response) => {
    try {
      const { components, buildName, userId } = req.body;
  
      // Ensure userId is a valid ObjectId
      if (!Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid userId format' });
      }
  
      const build = new Build({ components, buildName, userId });
      await build.save();
  
      // Add build to user's builds array
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      //user.builds.push(build._id);
      await user.save();
  
      res.status(201).json(build);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'An unknown error occurred' });
      }
    }
  };

// Function to get all builds of a user
export const getUserBuilds = async (req: Request, res: Response) => {
    try {
      // Validate userId from URL params
      const userId = req.params.userId;
  
      // Ensure userId is a valid ObjectId
      if (!Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid userId format' });
      }
  
      const user = await User.findById(userId).populate('builds');
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.status(200).json(user.builds);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'An unknown error occurred' });
      }
    }
  };