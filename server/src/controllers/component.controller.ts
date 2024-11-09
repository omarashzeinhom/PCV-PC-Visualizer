import { Request, Response } from 'express';
import { Build } from '../models/build.model'; 

// Define a custom interface for the request body
interface AddComponentRequestBody {
    buildId: string;
    component: any; // Adjust the type of 'component' as per your requirements
  }
  
  // Then, use it in your controller function
  export const addComponentToBuild = async (req: Request<{}, {}, AddComponentRequestBody>, res: Response) => {
    try {
      const { buildId, component } = req.body;
      const build = await Build.findById(buildId);
      if (!build) return res.status(404).json({ message: 'Build not found' });
  
      build.components.push(component);
      await build.save();
      res.status(200).json(build);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  };
  