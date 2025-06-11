import { useState } from "react";
import type { GenericFormProps } from "../../types/form";

export default function GenericForm<T>({
  initialData,
  fields,
  onSubmit,
}: GenericFormProps<T>) {
  const [formData, setFormData] = useState<T>(initialData);

  const handleChange = (key: keyof T, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value as T[keyof T],
    }));
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      className="space-y-2"
    >
      {fields.map((field) => (
        <div key={field.key as string}>
          <label htmlFor="">{field.label}</label>
          <input
            type={field.type}
            value={String(formData[field.key])}
            onChange={(e) =>
              handleChange(
                field.key,
                field.type === "number"
                  ? Number(e.target.value)
                  : e.target.value
              )
            }
            className="border px-2 py-1 ml-2"
          />
        </div>
      ))}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-1 rounded"
      >
        제출
      </button>
    </form>
  );
}
