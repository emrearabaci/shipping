/* React API */
import { useState } from 'react';

export const useForm = (params) => {
  const [formData, setFormData] = useState(params);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return [formData, handleChange];
};
