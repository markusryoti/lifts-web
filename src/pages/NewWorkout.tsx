import axios from 'axios';
import React, { useState } from 'react';

import NewMovementSection from '../components/NewMovementSection';
import NewWorkoutCard from '../components/NewWorkoutCard';

import dotenv from 'dotenv';
import { parseDate } from '../util/time';
dotenv.config();

interface IApiWorkout {
  created_at: string;
  id: number;
  name: string;
  updated_at: string;
  user_id: number;
}

export interface ISet {
  reps: number;
  weight: number;
}

export interface IMovementSection {
  name: string;
  sets: ISet[];
}

const NewWorkout = () => {
  const [
    newWorkoutFromApi,
    setNewWorkoutFromApi,
  ] = useState<IApiWorkout | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [movementSections, setMovementSections] = useState<
    Array<IMovementSection>
  >([]);

  const debug = true;

  // Implement user stuff later
  const userId = 1;

  const addNewWorkout = () => {
    // axios
    //   .post(
    //     `${process.env.REACT_APP_API_BASE_URL}/workouts/new`,
    //     {
    //       name: inputValue,
    //     },
    //     { headers: { userId } }
    //   )
    //   .then(res => {
    //     setNewWorkoutFromApi(res.data);
    //     setInputValue('');
    //   })
    //   .catch(err => console.log(err));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleMovementSectionDelete = (removeItemIndex: number) => {
    setMovementSections(
      movementSections.filter((item: IMovementSection, index: number) => {
        return removeItemIndex !== index;
      })
    );
  };

  return (
    <div className="p-2">
      <div>
        <div className="field">
          <label className="label">Workout Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              onChange={handleInputChange}
              value={inputValue}
            />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-success" onClick={addNewWorkout}>
              Add
            </button>
          </div>
        </div>
      </div>

      {debug && (
        <NewWorkoutCard
          movementSections={movementSections}
          handleMovementSectionDelete={handleMovementSectionDelete}
          setMovementSections={setMovementSections}
        />
      )}
      {/* {newWorkoutFromApi && (
        <div className="card mt-5">
          <h4 className="title is-4">
            {newWorkoutFromApi?.name} {parseDate(newWorkoutFromApi?.created_at)}
          </h4>
        </div>
      )} */}
    </div>
  );
};

export default NewWorkout;
