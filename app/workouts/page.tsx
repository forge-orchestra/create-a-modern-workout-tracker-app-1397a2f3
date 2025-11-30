"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LucideIcon } from 'lucide-react';
import { WorkoutPlan } from '@/types';
import { fetchWorkoutPlans } from '@/services/workoutService';

const WorkoutsPage: React.FC = () => {
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadWorkoutPlans = async () => {
      try {
        const plans = await fetchWorkoutPlans();
        setWorkoutPlans(plans);
      } catch (err) {
        setError('Failed to load workout plans.');
      } finally {
        setLoading(false);
      }
    };
    loadWorkoutPlans();
  }, []);

  const handlePlanClick = (id: string) => {
    router.push(`/workouts/${id}`);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Workout Plans</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {workoutPlans.map(plan => (
          <div
            key={plan.id}
            className="border rounded-lg p-4 hover:shadow-lg cursor-pointer"
            onClick={() => handlePlanClick(plan.id)}
          >
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="text-gray-600">{plan.description}</p>
            <div className="flex items-center mt-2">
              <LucideIcon name="clock" className="w-4 h-4 mr-1" />
              <span>{plan.duration} mins</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutsPage;