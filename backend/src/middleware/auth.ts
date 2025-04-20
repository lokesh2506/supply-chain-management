import { Request, Response, NextFunction } from 'express';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const walletAddress = req.body.walletAddress || req.query.walletAddress;
  if (!walletAddress) {
    return res.status(401).json({ error: 'Wallet address required' });
  }
  next();
}