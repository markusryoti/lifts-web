import React, { useState } from 'react';

import { IMovementSection, ISet } from '../pages/NewWorkout';

interface Props {
  movementItem: IMovementSection;
  itemIndex: number;
  handleRemove: (index: number) => void;
}

const NewMovementSection: React.FC<Props> = ({
  movementItem,
  itemIndex,
  handleRemove,
}): JSX.Element => {
  const [sets, setSets] = useState<ISet[]>([]);

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

  return (
    <div className="box mt-3 ml-3 mb-4 is-flex-direction-column">
      <div className="is-flex is-flex-direction-row is-align-items-center is-justify-content-space-between mb-2">
        <h4 className="title is-5 m-0">Movement name</h4>
        <button
          className="button is-danger m-1 is-small"
          onClick={handleMovementRemove}
        >
          <i className="fas fa-times-circle"></i>{' '}
        </button>
      </div>

      <hr />

      {sets &&
        sets.map((item: ISet, index: number) => {
          return (
            <div
              key={index}
              id={String(index)}
              className="is-flex is-align-items-center is-justify-content-space-between field"
            >
              <div>
                <input
                  type="number"
                  placeholder="Reps"
                  className="input m-1"
                  style={{ width: '125px' }}
                />
                <input
                  type="number"
                  placeholder="Weight"
                  className="input m-1"
                  style={{ width: '125px' }}
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
          setSets([...sets, Object.create(null)]);
        }}
      >
        <i className="fas fa-2x fa-plus-circle"></i>
      </button>
    </div>
  );
};

export default NewMovementSection;
