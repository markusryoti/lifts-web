import axios from 'axios';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import NewMovementSection from '../components/NewMovementSection';
import { getCurrentDate } from '../util/time';

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
  createdAt: string | null;
}

interface Props extends RouteComponentProps {}

const NewWorkoutCard: React.FC<Props> = props => {
  const [workoutName, setWorkoutName] = useState<string>('');
  const [movementSections, setMovementSections] = useState<
    Array<IMovementSection>
  >([]);
  const [createdAt, setCreatedAt] = useState<string | null>(null);

  // On load get stuff from local storage if exists
  useEffect(() => {
    const cachedState = localStorage.getItem('newWorkoutCache');
    if (cachedState) {
      const stateAsJson: IWorkoutState = JSON.parse(cachedState);
      if (stateAsJson.name) setWorkoutName(stateAsJson.name);
      if (stateAsJson.movements) setMovementSections(stateAsJson.movements);
      if (stateAsJson.createdAt) setCreatedAt(stateAsJson.createdAt);
    }
  }, []);

  // Whenever something in workout state changes, update it to local storage
  useEffect(() => {
    const workoutState: IWorkoutState = {
      name: workoutName,
      movements: movementSections,
      createdAt: createdAt,
    };

    // Valid only if contains name, then update
    // Otherwise just delete the state in storage
    if (workoutState.name) {
      const stateAsString = JSON.stringify(workoutState);
      localStorage.setItem('newWorkoutCache', stateAsString);
    } else {
      localStorage.removeItem('newWorkoutCache');
    }
    // eslint-disable-next-line
  }, [workoutName, movementSections]);

  const handleDeleteWorkout = () => {
    // Need to set everything manually
    setWorkoutName('');
    setMovementSections([]);
    setCreatedAt(null);
    localStorage.removeItem('newWorkoutCache');
  };

  const handleSaveWorkout = async () => {
    const newWorkout = {
      name: workoutName,
      movements: movementSections,
      createdAt: createdAt,
    };

    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/workouts/new`,
        newWorkout
      );
      if (result.status === 200) {
        handleDeleteWorkout();
        props.history.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMovementSectionDelete = (removeItemIndex: number) => {
    setMovementSections(
      movementSections.filter((item: IMovementSection, index: number) => {
        return removeItemIndex !== index;
      })
    );
  };

  const handleWorkoutNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget?.value;
    setWorkoutName(newValue);

    // If it's now empty, clear the created at value
    if (!newValue) {
      setCreatedAt(null);
      // Else the value is valid, check if initally null and set to current value
    } else if (createdAt === null) {
      setCreatedAt(getCurrentDate());
    }
  };

  const handleAddMovement = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (createdAt === null) {
      setCreatedAt(getCurrentDate());
    }
    const updatedMovements = [...movementSections, { name: null, sets: null }];
    setMovementSections(updatedMovements);
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
    <div className="container mt-5">
      <div className="card mt-5">
        <div className="is-flex is-align-items-center mt-3 mb-3">
          <input
            className="input ml-3 mb-0"
            placeholder="Workout name"
            value={workoutName}
            onChange={handleWorkoutNameChange}
          />
          <button
            className="button is-danger m-1"
            onClick={handleDeleteWorkout}
          >
            Clear
          </button>
        </div>

        {(movementSections.length > 0 || workoutName) && (
          <p className="m-3">
            <i>Draft, Created @ {createdAt}</i>
          </p>
        )}

        {movementSections &&
          movementSections.map((item: IMovementSection, index: number) => {
            return (
              <NewMovementSection
                key={index}
                itemIndex={index}
                movementItem={item}
                handleRemove={handleMovementSectionDelete}
                handleWorkoutMovementNameUpdate={
                  handleWorkoutMovementNameUpdate
                }
                handleWorkoutMovementSetUpdate={handleWorkoutMovementSetUpdate}
              />
            );
          })}

        <div className="mb-3 ml-3 is-flex-direction-column">
          <p className="mb-1">Add Movement</p>
          <button
            className="button is-primary is-small"
            onClick={handleAddMovement}
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
    </div>
  );
};

export default NewWorkoutCard;
