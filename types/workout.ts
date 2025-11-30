import { LucideIcon } from 'lucide-react';

export type Exercise = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  duration: number; // in minutes
  repetitions: number;
  sets: number;
};

export type WorkoutPlan = {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
  createdAt: Date;
  updatedAt: Date;
};

export type Progress = {
  date: Date;
  workoutPlanId: string;
  completedExercises: {
    exerciseId: string;
    completedRepetitions: number;
    completedSets: number;
  }[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  workoutPlans: WorkoutPlan[];
  progress: Progress[];
  wearableDeviceId?: string;
};