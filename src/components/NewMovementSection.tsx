import React, { useEffect, useState } from 'react';
import { IMovementSection, INewSet } from '../pages/NewWorkout';

interface Props {
  movementItem: IMovementSection;
  itemIndex: number;
  handleRemove: (index: number) => void;
  handleWorkoutMovementNameUpdate: (index: number, name: string) => void;
  handleWorkoutMovementSetUpdate: (index: number, sets: INewSet[]) => void;
}

const NewMovementSection: React.FC<Props> = ({
  movementItem,
  itemIndex,
  handleRemove,
  handleWorkoutMovementNameUpdate,
  handleWorkoutMovementSetUpdate,
}): JSX.Element => {
  const [name, setName] = useState<string>('');
  const [sets, setSets] = useState<INewSet[]>([]);

  useEffect(() => {
    if (movementItem.name) setName(movementItem.name);
    if (movementItem.sets) setSets(movementItem.sets);
    // eslint-disable-next-line
  }, []);

  // When sets are changed, change also the global state
  useEffect(() => {
    handleWorkoutMovementNameUpdate(itemIndex, name);
    // eslint-disable-next-line
  }, [name]);

  useEffect(() => {
    handleWorkoutMovementSetUpdate(itemIndex, sets);
    // eslint-disable-next-line
  }, [sets]);

  const handleMovementRemove = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    handleRemove(itemIndex);
  };

  const handleItemClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setSets(
      sets.filter((item, index) => {
        const itemIndex = String(
          e.currentTarget.parentElement?.getAttribute('id')
        );
        return index !== parseInt(itemIndex);
      })
    );
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;

    // Name can essentially be whatever
    if (name === 'movementName') {
      setName(value);
    }

    let inputType, index;
    const valueArr = name.split('-');

    inputType = valueArr[0];
    index = parseInt(valueArr[1]);
    const formattedValue = parseInt(value);

    let newState;
    switch (inputType) {
      case 'reps':
        newState = [...sets];
        newState[index].reps = formattedValue;
        setSets(newState);
        break;
      case 'weight':
        newState = [...sets];
        newState[index].weight = formattedValue;
        setSets(newState);
        break;
      default:
        break;
    }
  };

  return (
    <div className="box mt-3 ml-3 mb-4 is-flex-direction-column">
      <div className="is-flex is-flex-direction-row is-align-items-center mb-1">
        <input
          type="text"
          name="movementName"
          value={name}
          placeholder="Movement"
          className="input"
          style={{ width: '250px' }}
          onChange={handleInputChange}
        />
        <button
          className="button is-danger m-1 is-small"
          onClick={handleMovementRemove}
        >
          <i className="fas fa-times-circle"></i>{' '}
        </button>
      </div>

      <hr />

      {sets &&
        sets.map((item: INewSet, index: number) => {
          return (
            <div
              key={index}
              id={String(index)}
              className="is-flex is-align-items-center field mb-1"
            >
              <div>
                <input
                  type="number"
                  name={`reps-${index}`}
                  value={String(sets[index].reps)}
                  placeholder="Reps"
                  min="0"
                  className="input m-1"
                  style={{ width: '75px' }}
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name={`weight-${index}`}
                  value={String(sets[index].weight)}
                  placeholder="Weight"
                  min="0"
                  className="input m-1"
                  style={{ width: '80px' }}
                  onChange={handleInputChange}
                />
              </div>
              <button
                className="button is-danger m-1 is-small"
                onClick={handleItemClick}
              >
                <i className="fas fa-times-circle"></i>{' '}
              </button>
            </div>
          );
        })}
      <p className="mb-1">Add Set</p>
      <button
        className="button is-warning is-small"
        onClick={() => {
          setSets([...sets, { reps: null, weight: null }]);
        }}
      >
        <i className="fas fa-2x fa-plus-circle"></i>
      </button>
    </div>
  );
};

export default NewMovementSection;
