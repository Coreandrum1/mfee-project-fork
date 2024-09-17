import { Request, Response, NextFunction } from 'express';

// Error handler wrapper for async functions
const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next); // Catch errors and pass them to next()
  };

export default asyncHandler;
