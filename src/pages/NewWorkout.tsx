import React, { useState } from 'react';

const NewWorkout = () => {
  const [formState, setFormState] = useState<any>();

  return (
    <div>
      <div className="field">
        <label className="label">Workout Name</label>
        <div className="control">
          <input className="input" type="text" />
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-success">Add</button>
        </div>
      </div>
    </div>
  );
};

export default NewWorkout;
