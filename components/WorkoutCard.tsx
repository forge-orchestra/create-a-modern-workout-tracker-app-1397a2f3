import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Workout } from '../types';

interface WorkoutCardProps {
  workout: Workout;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">{workout.name}</h2>
        <p className="text-gray-600">{workout.description}</p>
        <ul className="mt-2">
          {workout.exercises.map((exercise) => (
            <li key={exercise.id} className="flex justify-between items-center py-1">
              <span className="text-gray-700">{exercise.name}</span>
              <span className="text-gray-500">{exercise.reps} reps</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <button
          type="button"
          onClick={() => onEdit(workout.id)}
          className="text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          aria-label={`Edit ${workout.name}`}
        >
          <LucideIcon name="edit" size={20} />
        </button>
        <button
          type="button"
          onClick={() => onDelete(workout.id)}
          className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          aria-label={`Delete ${workout.name}`}
        >
          <LucideIcon name="trash" size={20} />
        </button>
      </div>
    </div>
  );
};

export default WorkoutCard;