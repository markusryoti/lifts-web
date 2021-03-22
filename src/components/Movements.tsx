import React from 'react';
import { IWorkoutMovements } from '../pages/WorkoutList';
import Sets from './Sets';

interface Props {
  movements: IWorkoutMovements;
}

const Movements = ({ movements }: Props) => {
  const movementNames: Array<string> = Object.keys(movements);

  return (
    <>
      {movementNames.map((movement: string, index: number) => {
        return (
          <div key={`${movement}-${index}`}>
            <h5 className="title is-5 mb-2 mt-2">{movement}</h5>
            <Sets sets={movements[movement]} />
          </div>
        );
      })}
    </>
  );
};

export default Movements;
