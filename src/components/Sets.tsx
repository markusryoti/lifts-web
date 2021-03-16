import React from 'react';
import { ISet } from '../pages/WorkoutList';

interface Props {
  sets: ISet[];
}

const Sets: React.FC<Props> = ({ sets }) => {
  return (
    <ul>
      {sets.map((set: ISet, index) => {
        if (sets.length > 0) {
          if (
            index === 0 ||
            set.movement_name !== sets[index - 1].movement_name
          ) {
            return (
              <div key={set.set_id} className={index !== 0 ? 'mt-3' : ''}>
                <h5 className="subtitle is-5 mb-1">{set.movement_name}</h5>
                <li>
                  {set.reps} x {set.weight} kg
                </li>
              </div>
            );
          }
        }

        return (
          <li key={set.set_id}>
            {set.reps} x {set.weight} kg
          </li>
        );
      })}
    </ul>
  );
};

export default Sets;
