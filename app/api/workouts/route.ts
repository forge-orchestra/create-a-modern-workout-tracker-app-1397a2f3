import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import Cors from 'cors';
import { z } from 'zod';

const prisma = new PrismaClient();
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
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

const workoutSchema = z.object({
  name: z.string().min(1),
  duration: z.number().positive(),
  caloriesBurned: z.number().positive(),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);

  switch (req.method) {
    case 'GET':
      try {
        const workouts = await prisma.workout.findMany();
        res.status(200).json(workouts);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts' });
      }
      break;
    case 'POST':
      try {
        const validatedData = workoutSchema.parse(req.body);
        const workout = await prisma.workout.create({
          data: validatedData,
        });
        res.status(201).json(workout);
      } catch (error) {
        res.status(400).json({ error: 'Invalid input data' });
      }
      break;
    case 'PUT':
      try {
        const { id, ...data } = req.body;
        const validatedData = workoutSchema.parse(data);
        const workout = await prisma.workout.update({
          where: { id },
          data: validatedData,
        });
        res.status(200).json(workout);
      } catch (error) {
        res.status(400).json({ error: 'Invalid input data or workout not found' });
      }
      break;
    case 'DELETE':
      try {
        const { id } = req.body;
        await prisma.workout.delete({
          where: { id },
        });
        res.status(204).end();
      } catch (error) {
        res.status(400).json({ error: 'Workout not found' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;