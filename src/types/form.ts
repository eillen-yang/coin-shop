export type FieldConfig<T> = {
  key: keyof T;
  label: string;
  type: "text" | "number";
};

export type GenericFormProps<T> = {
  initialData: T;
  fields: FieldConfig<T>[];
  onSubmit: (data: T) => void;
};
