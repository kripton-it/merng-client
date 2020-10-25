import { useState } from 'react';

export const useForm = (initialState, callback) => {
  const [values, setValues] = useState(initialState);

  const onChange = (evt) => {
    const { name, value } = evt.target;

    setValues({
      ...values,
      [name]: value
    });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    callback();
  };

  const onReset = () => {
    setValues({ ...initialState });
  }

  return { values, onChange, onSubmit, onReset };
};