import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Activity, BarChart } from 'lucide-react';
import { fetchWorkoutStats, fetchRecentActivities } from '@/lib/api';
import type { WorkoutStats, Activity as ActivityType } from '@/types';

'use client';

const DashboardPage: React.FC = () => {
  const [workoutStats, setWorkoutStats] = useState<WorkoutStats | null>(null);
  const [recentActivities, setRecentActivities] = useState<ActivityType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const stats = await fetchWorkoutStats();
        const activities = await fetchRecentActivities();
        setWorkoutStats(stats);
        setRecentActivities(activities);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold flex items-center">
            <BarChart className="mr-2" /> Workout Stats
          </h2>
          {workoutStats ? (
            <div className="mt-4">
              <p>Total Workouts: {workoutStats.totalWorkouts}</p>
              <p>Total Duration: {workoutStats.totalDuration} mins</p>
              <p>Calories Burned: {workoutStats.caloriesBurned} kcal</p>
            </div>
          ) : (
            <div>No stats available</div>
          )}
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Activity className="mr-2" /> Recent Activities
          </h2>
          <ul className="mt-4 space-y-2">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <li key={activity.id} className="border-b pb-2">
                  <p>{activity.name}</p>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </li>
              ))
            ) : (
              <div>No recent activities</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;