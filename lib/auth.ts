import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthTokenPayload {
  userId: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

/**
 * Generates a JWT token for a user.
 * @param {User} user - The user object.
 * @returns {string} The generated JWT token.
 * @throws {Error} If token generation fails.
 */
export function generateToken(user: User): string {
  try {
    const payload: AuthTokenPayload = { userId: user.id };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  } catch (error) {
    throw new Error('Failed to generate token');
  }
}

/**
 * Verifies a JWT token and returns the decoded payload.
 * @param {string} token - The JWT token to verify.
 * @returns {AuthTokenPayload} The decoded token payload.
 * @throws {Error} If token verification fails.
 */
export function verifyToken(token: string): AuthTokenPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

/**
 * Middleware to protect API routes.
 * @param {NextApiRequest} req - The API request object.
 * @param {NextApiResponse} res - The API response object.
 * @param {Function} next - The next middleware function.
 */
export function authMiddleware(req: NextApiRequest, res: NextApiResponse, next: Function): void {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'Authorization header missing' });
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Token missing' });
    return;
  }

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}