import { useState } from "react";

function useForm<T>(initialValues: T) {

  const [formData, setFormData] = useState<T>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
};
    const handleReset = () => {
      setFormData(initialValues);
    };

  return { formData, handleChange,handleReset };
}
export { useForm };