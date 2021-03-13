import { useEffect, useState } from 'react';

import NewMovementSection from '../components/NewMovementSection';

export interface ISet {
  reps: number | null;
  weight: number | null;
}

export interface IMovementSection {
  name: string | null;
  sets: ISet[] | null;
}

interface IWorkoutState {
  name: string | null;
  movements: IMovementSection[];
}

const NewWorkoutCard = () => {
  const [workoutName, setWorkoutName] = useState<string>('');
  const [movementSections, setMovementSections] = useState<
    Array<IMovementSection>
  >([]);

  // On load get stuff from local storage if exists
  useEffect(() => {
    const cachedState = localStorage.getItem('newWorkoutCache');
    if (cachedState) {
      const stateAsJson: IWorkoutState = JSON.parse(cachedState);
      if (stateAsJson.name) setWorkoutName(stateAsJson.name);
      if (stateAsJson.movements) setMovementSections(stateAsJson.movements);
    }
  }, []);

  // When ever something in workout state changes, update it to local storage
  useEffect(() => {
    const workoutState: IWorkoutState = {
      name: workoutName,
      movements: movementSections,
    };

    if (workoutState.name && workoutState.movements) {
      const stateAsString = JSON.stringify(workoutState);
      localStorage.setItem('newWorkoutCache', stateAsString);
    }
  }, [workoutName, movementSections]);

  const handleDeleteWorkout = () => {
    setWorkoutName('');
    setMovementSections([]);
    localStorage.removeItem('newWorkoutCache');
  };

  const handleSaveWorkout = () => {
    console.log('saving workout');
  };

  const handleMovementSectionDelete = (removeItemIndex: number) => {
    setMovementSections(
      movementSections.filter((item: IMovementSection, index: number) => {
        return removeItemIndex !== index;
      })
    );
  };

  const handleWorkoutNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkoutName(e.currentTarget?.value);
  };

  const handleWorkoutMovementNameUpdate = (
    index: number,
    movementName: string
  ) => {
    const newState = [...movementSections];
    newState[index].name = movementName;
    setMovementSections(newState);
  };

  const handleWorkoutMovementSetUpdate = (index: number, sets: ISet[]) => {
    const newState = [...movementSections];
    newState[index].sets = sets;
    setMovementSections(newState);
  };

  return (
    <div className="card mt-5">
      <div className="is-flex is-align-items-center mt-3 mb-3">
        <input
          className="input ml-3 mb-0"
          placeholder="Workout Name"
          value={workoutName}
          onChange={handleWorkoutNameChange}
        />
        <button
          className="button is-danger m-1 is-small"
          onClick={handleDeleteWorkout}
        >
          <i className="fas fa-times-circle"></i>{' '}
        </button>
      </div>

      {movementSections &&
        movementSections.map((item: IMovementSection, index: number) => {
          return (
            <NewMovementSection
              key={index}
              itemIndex={index}
              movementItem={item}
              handleRemove={handleMovementSectionDelete}
              handleWorkoutMovementNameUpdate={handleWorkoutMovementNameUpdate}
              handleWorkoutMovementSetUpdate={handleWorkoutMovementSetUpdate}
            />
          );
        })}
      <div className="mb-3 ml-3 is-flex-direction-column">
        <p className="mb-1">Add Movement</p>
        <button
          className="button is-primary is-small"
          onClick={() => {
            const updatedMovements = [
              ...movementSections,
              { name: null, sets: null },
            ];
            setMovementSections(updatedMovements);
          }}
        >
          <i className="fas fa-2x fa-plus-circle"></i>
        </button>
      </div>

      {movementSections.length !== 0 && (
        <div className="m-3 is-flex is-justify-content-center">
          <button className="button is-success" onClick={handleSaveWorkout}>
            Save Workout
          </button>
        </div>
      )}
    </div>
  );
};

export default NewWorkoutCard;
