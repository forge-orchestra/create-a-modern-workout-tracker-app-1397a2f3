import { LucideIcon } from 'lucide-react';

/**
 * Type representing a workout plan.
 */
export type WorkoutPlan = {
  id: string;
  name: string;
  exercises: Exercise[];
};

/**
 * Type representing an exercise.
 */
export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: number;
  icon: LucideIcon;
};

/**
 * Type representing a user's progress.
 */
export type Progress = {
  date: string;
  completedExercises: CompletedExercise[];
};

/**
 * Type representing a completed exercise.
 */
export type CompletedExercise = {
  exerciseId: string;
  setsCompleted: number;
  repsCompleted: number;
};

/**
 * Function to calculate total sets and reps from a workout plan.
 * @param {WorkoutPlan} plan - The workout plan to calculate totals for.
 * @returns {{ totalSets: number, totalReps: number }} - The total sets and reps.
 */
export function calculateTotalSetsAndReps(plan: WorkoutPlan): { totalSets: number; totalReps: number } {
  try {
    const totalSets = plan.exercises.reduce((acc, exercise) => acc + exercise.sets, 0);
    const totalReps = plan.exercises.reduce((acc, exercise) => acc + exercise.reps, 0);
    return { totalSets, totalReps };
  } catch (error) {
    console.error('Error calculating total sets and reps:', error);
    return { totalSets: 0, totalReps: 0 };
  }
}

/**
 * Function to track progress for a given date.
 * @param {Progress[]} progressLog - The log of user progress.
 * @param {string} date - The date to track progress for.
 * @returns {Progress | null} - The progress for the specified date or null if not found.
 */
export function trackProgress(progressLog: Progress[], date: string): Progress | null {
  try {
    return progressLog.find(progress => progress.date === date) || null;
  } catch (error) {
    console.error('Error tracking progress:', error);
    return null;
  }
}

/**
 * Function to add a new workout plan.
 * @param {WorkoutPlan[]} plans - The current list of workout plans.
 * @param {WorkoutPlan} newPlan - The new workout plan to add.
 * @returns {WorkoutPlan[]} - The updated list of workout plans.
 */
export function addWorkoutPlan(plans: WorkoutPlan[], newPlan: WorkoutPlan): WorkoutPlan[] {
  try {
    return [...plans, newPlan];
  } catch (error) {
    console.error('Error adding workout plan:', error);
    return plans;
  }
}

/**
 * Function to remove a workout plan by ID.
 * @param {WorkoutPlan[]} plans - The current list of workout plans.
 * @param {string} planId - The ID of the workout plan to remove.
 * @returns {WorkoutPlan[]} - The updated list of workout plans.
 */
export function removeWorkoutPlan(plans: WorkoutPlan[], planId: string): WorkoutPlan[] {
  try {
    return plans.filter(plan => plan.id !== planId);
  } catch (error) {
    console.error('Error removing workout plan:', error);
    return plans;
  }
}

export { LucideIcon };