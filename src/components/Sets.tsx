import React from 'react';
import { ISet } from '../pages/WorkoutList';

interface Props {
  sets: Array<ISet>;
}

const Sets: React.FC<Props> = ({ sets }) => {
  return (
    <ul className="pb-3">
      {sets.map((set: ISet, index) => {
        return (
          <li key={set.set_id} className={index !== 0 ? 'mt-1' : ''}>
            {set.reps} x {set.weight} kg
          </li>
        );
      })}
    </ul>
  );
};

export default Sets;
