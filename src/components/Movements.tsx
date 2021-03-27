import React from 'react';
import { ISet } from '../pages/WorkoutList';
import Sets from './Sets';

interface Props {
  sets: Array<ISet>;
}

export const individualSetsToMovementSets = (sets: Array<ISet>) => {
  const setsByMovement: any = {};
  for (const set of sets) {
    if (set.movement_name in setsByMovement) {
      setsByMovement[set.movement_name].push(set);
    } else {
      setsByMovement[set.movement_name] = [set];
    }
  }
  return setsByMovement;
};

const Movements = ({ sets }: Props) => {
  const movementSets = individualSetsToMovementSets(sets);

  return (
    <>
      {Object.keys(movementSets).map((movement: string, index: number) => {
        return (
          <div key={`${movement}-${index}`}>
            <h5 className="title is-5 mb-2 mt-2">{movement}</h5>
            <Sets sets={movementSets[movement]} />
          </div>
        );
      })}
    </>
  );
};

export default Movements;
