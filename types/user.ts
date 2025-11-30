import { LucideIcon } from 'lucide-react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  workoutPlans: WorkoutPlan[];
  progress: Progress;
  wearableDevices: WearableDevice[];
}

export interface WorkoutPlan {
  id: string;
  name: string;
  exercises: Exercise[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  icon: LucideIcon;
}

export interface Progress {
  weight: number;
  bodyFatPercentage: number;
  muscleMass: number;
  lastUpdated: Date;
}

export interface WearableDevice {
  id: string;
  name: string;
  type: string;
  connected: boolean;
}