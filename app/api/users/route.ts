import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import Cors from 'cors';

const prisma = new PrismaClient();

// Initialize CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  origin: '*',
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

type User = {
  id: string;
  name: string;
  email: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);

  switch (req.method) {
    case 'GET':
      try {
        const users: User[] = await prisma.user.findMany();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
      }
      break;

    case 'POST':
      try {
        const { name, email } = req.body;
        if (!name || !email) {
          res.status(400).json({ error: 'Name and email are required' });
          return;
        }
        const newUser: User = await prisma.user.create({
          data: { name, email },
        });
        res.status(201).json(newUser);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
      }
      break;

    case 'PUT':
      try {
        const { id, name, email } = req.body;
        if (!id || !name || !email) {
          res.status(400).json({ error: 'ID, name, and email are required' });
          return;
        }
        const updatedUser: User = await prisma.user.update({
          where: { id },
          data: { name, email },
        });
        res.status(200).json(updatedUser);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.body;
        if (!id) {
          res.status(400).json({ error: 'ID is required' });
          return;
        }
        await prisma.user.delete({
          where: { id },
        });
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;