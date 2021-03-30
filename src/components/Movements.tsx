import React from 'react';
import { ISet } from '../types';
import { individualSetsToMovementSets } from '../util/setsToMovements';
import Sets from './Sets';

interface Props {
  sets: Array<ISet>;
}

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
