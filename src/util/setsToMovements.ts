import { ISet } from '../types';

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
